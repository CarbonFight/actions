const { dbInstance, fieldValue } = require("../../../db-setup");
const {
    formatDateForDB,
    isCurrentDay,
    isCurrentWeek,
    isCurrentMonth,
    isCurrentYear
} = require("../../../utils/dates")
const dayjs = require("dayjs");

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.updateStats = async function(method, newValues = null, oldValues = null){
    const db = await dbInstance()
    const category = capitalizeFirstLetter(newValues ? newValues.category : oldValues.category);
    const newActionDate = newValues ? newValues.created_time.toDate() : oldValues.created_time.toDate();
    const isPeriodic = newValues ? newValues.isPeriodic :oldValues.isPeriodic;
    const uid = newValues ? newValues.uid : oldValues.uid;
    const newActionDateDBFormat = formatDateForDB(newValues?.created_time.toDate());
    const oldActionDateDBFormat = formatDateForDB(oldValues?.created_time.toDate());
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
        statsToUpdate['actionsCount' + category] = fieldValue.increment(addOrRemove);
        statsToUpdate.actionsCountTotal = fieldValue.increment(addOrRemove);

        if (isPeriodic) {
            statsToUpdate.actionsPeriodicCountTotal = fieldValue.increment(addOrRemove);
        }
    }

    if (method === 'update' && dayjs(newActionDate).diff(dayjs(oldValues?.created_time.toDate())) !== 0) {
        const oldActionDate = oldValues.created_time.toDate();

        statsToUpdate['days.' + newActionDateDBFormat] = fieldValue.increment(newValues.co2e);
        statsToUpdate['days.' + oldActionDateDBFormat] = fieldValue.increment(-oldValues.co2e);

        if (isCurrentDay(oldActionDate)) {
            setPeriodicStats(statsToUpdate, 'day', category, -oldValues.co2e)
        } else if (isCurrentDay(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'day', category, newValues.co2e)
        }

        statsToUpdate = updateOrNot('week', category, isCurrentWeek, statsToUpdate, oldActionDate, newActionDate, oldValues, newValues)
        statsToUpdate = updateOrNot('month', category, isCurrentMonth, statsToUpdate, oldActionDate, newActionDate, oldValues, newValues)
        statsToUpdate = updateOrNot('year', category, isCurrentYear, statsToUpdate, oldActionDate, newActionDate, oldValues, newValues)

    } else {
        let co2e = newValues?.co2e;
        if (method === 'update') {
            co2e = newValues.co2e - oldValues.co2e;
        } else if (method === 'delete') {
            co2e = -oldValues.co2e
        }

        statsToUpdate['days.' + newActionDateDBFormat] = fieldValue.increment(co2e);

        if (isCurrentDay(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'day', category, co2e)
        }
        if (isCurrentWeek(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'week', category, co2e)
        }
        if (isCurrentMonth(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'month', category, co2e)
        }
        if (isCurrentYear(newActionDate)) {
            setPeriodicStats(statsToUpdate, 'year', category, co2e)
        }
    }

    const statToUpdate = await db.collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    await statToUpdate.docs[0].ref.update(statsToUpdate)
}

const updateOrNot = (period, category, isCurrentPeriod, statsToUpdate, oldActionDate, newActionDate, oldValues, newValues) => {
    const co2eDifference = newValues.co2e - oldValues.co2e;

    if (isCurrentPeriod(oldActionDate) && isCurrentPeriod(newActionDate)) {
        if (co2eDifference !== 0) {
            setPeriodicStats(statsToUpdate, period, category, co2eDifference)
        }
    } else if ((isCurrentPeriod(oldActionDate) && !isCurrentPeriod(newActionDate)) || (!isCurrentPeriod(oldActionDate) && isCurrentPeriod(newActionDate))) {
        const incrementValue = isCurrentPeriod(newActionDate) ? newValues.co2e : -oldValues.co2e;

        setPeriodicStats(statsToUpdate, period, category, incrementValue)
    }

    return statsToUpdate;
}

const setPeriodicStats = (statsToUpdate, period, category, co2e) => {
    statsToUpdate[period + 'Total'] = fieldValue.increment(co2e);
    statsToUpdate[period + category] = fieldValue.increment(co2e);
    return statsToUpdate;
}
