const { dbInstance, fieldValue } = require('../../../db-setup');
const {
    formatDateForDB,
    isCurrentDay,
    isCurrentWeek,
    isCurrentMonth,
    isCurrentYear,
    parseDateFromDbFormat,
} = require('../../../utils/dates');
const dayjs = require('dayjs');

function parseCategory(category) {
    switch (category) {
        case 'Trajets':
            return 'Transport';
        case 'Logement':
            return 'Lodging';
        case 'Repas':
            return 'Food';
        case 'Habits':
            return 'Clothes';
        case 'Mobilier':
            return 'Furniture';
        case 'Numérique':
            return 'Digital';
        case 'Electroménager':
            return 'Appliance';
        case 'Objets':
            return 'Objects';
        case 'Services':
            return 'Services';
        default:
            return `Unsupported category: ${category}`;
    }
}

module.exports.updateStats = async function (
    method,
    newValues = null,
    oldValues = null
) {
    const db = await dbInstance();
    const category = parseCategory(
        newValues ? newValues.category : oldValues.category
    );
    const newActionDate = newValues
        ? newValues.created_time.toDate()
        : oldValues.created_time.toDate();
    const isPeriodic = newValues ? newValues.isPeriodic : oldValues.isPeriodic;
    const uid = newValues ? newValues.uid : oldValues.uid;
    const newActionDateDBFormat = formatDateForDB(
        newValues?.created_time.toDate()
    );
    const oldActionDateDBFormat = formatDateForDB(
        oldValues?.created_time.toDate()
    );
    let statsToUpdate = {};

    if (method === 'create') {
        statsToUpdate.eventActionAddCount = fieldValue.increment(1);
    } else if (method === 'update') {
        statsToUpdate.eventActionUpdateCount = fieldValue.increment(1);
    } else if (method === 'delete') {
        statsToUpdate.eventActionDeleteCount = fieldValue.increment(1);
    }

    if (method === 'create' || method === 'delete') {
        const addOrRemove = method === 'create' ? 1 : -1;
        statsToUpdate['actionsCount' + category] =
            fieldValue.increment(addOrRemove);
        statsToUpdate.actionsCountTotal = fieldValue.increment(addOrRemove);

        if (isPeriodic) {
            statsToUpdate.actionsPeriodicCountTotal =
                fieldValue.increment(addOrRemove);
        }
    }

    if (
        method === 'update' &&
        dayjs(newActionDate).diff(dayjs(oldValues?.created_time.toDate())) !== 0
    ) {
        const oldActionDate = oldValues.created_time.toDate();

        statsToUpdate['days.' + newActionDateDBFormat] = fieldValue.increment(
            newValues.co2e
        );
        statsToUpdate['days.' + oldActionDateDBFormat] = fieldValue.increment(
            -oldValues.co2e
        );

        if (isCurrentDay(oldActionDate)) {
            setPeriodicStats(statsToUpdate, 'day', category, -oldValues.co2e);
        } else if (isCurrentDay(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'day', category, newValues.co2e);
        }

        statsToUpdate = updateOrNot(
            'week',
            category,
            isCurrentWeek,
            statsToUpdate,
            oldActionDate,
            newActionDate,
            oldValues,
            newValues
        );
        statsToUpdate = updateOrNot(
            'month',
            category,
            isCurrentMonth,
            statsToUpdate,
            oldActionDate,
            newActionDate,
            oldValues,
            newValues
        );
        statsToUpdate = updateOrNot(
            'year',
            category,
            isCurrentYear,
            statsToUpdate,
            oldActionDate,
            newActionDate,
            oldValues,
            newValues
        );
    } else {
        let co2e = newValues?.co2e;
        let actionDbFormat = newActionDateDBFormat;
        if (method === 'update') {
            co2e = newValues.co2e - oldValues.co2e;
        } else if (method === 'delete') {
            co2e = -oldValues.co2e;
            actionDbFormat = oldActionDateDBFormat;
        }

        statsToUpdate['days.' + actionDbFormat] = fieldValue.increment(co2e);

        if (isCurrentDay(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'day', category, co2e);
        }
        if (isCurrentWeek(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'week', category, co2e);
        }
        if (isCurrentMonth(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'month', category, co2e);
        }
        if (isCurrentYear(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'year', category, co2e);
        }
    }

    const statToUpdate = await db
        .collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    await statToUpdate.docs[0].ref.update(statsToUpdate);

    await updateGraphTotalStats(db, uid);
};

const updateOrNot = (
    period,
    category,
    isCurrentPeriod,
    statsToUpdate,
    oldActionDate,
    newActionDate,
    oldValues,
    newValues
) => {
    const co2eDifference = newValues.co2e - oldValues.co2e;

    if (isCurrentPeriod(oldActionDate) && isCurrentPeriod(newActionDate)) {
        if (co2eDifference !== 0) {
            setPeriodicStats(statsToUpdate, period, category, co2eDifference);
        }
    } else if (
        (isCurrentPeriod(oldActionDate) && !isCurrentPeriod(newActionDate)) ||
        (!isCurrentPeriod(oldActionDate) && isCurrentPeriod(newActionDate))
    ) {
        const incrementValue = isCurrentPeriod(newActionDate)
            ? newValues.co2e
            : -oldValues.co2e;

        setPeriodicStats(statsToUpdate, period, category, incrementValue);
    }

    return statsToUpdate;
};

const setPeriodicStats = (statsToUpdate, period, category, co2e) => {
    statsToUpdate[period + 'Total'] = fieldValue.increment(co2e);
    statsToUpdate[period + category] = fieldValue.increment(co2e);
    return statsToUpdate;
};

const updateGraphTotalStats = async (db, uid) => {
    const statsToUpdate = await db
        .collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    const days = statsToUpdate.docs[0].data().days;
    const currentDay = dayjs()
        .set('hour', 0)
        .set('minute', 0)
        .set('second', 0)
        .set('millisecond', 0);

    const newGraphTotal = Object.keys(days)
        .filter((key) => {
            const diff = parseDateFromDbFormat(key).diff(currentDay, 'day');
            return diff <= 0 && diff >= -29;
        })
        .reduce((obj, key, currentIndex) => {
            obj[29 + parseDateFromDbFormat(key).diff(currentDay, 'day')] =
                days[key];
            return obj;
        }, {});

    let newGraph = [];

    for (let i = 0; i < 30; i++) {
        let co2eByDay = 0;
        if (newGraphTotal[i]) {
            co2eByDay = newGraphTotal[i];
        }
        newGraph[i] = co2eByDay;
    }

    await statsToUpdate.docs[0].ref.update({ graphTotal: newGraph });
};
