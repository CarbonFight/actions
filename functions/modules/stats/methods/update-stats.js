const Logger = require('../../../logger-setup');
const { dbInstance, fieldValue } = require("../../../db-setup");
const {
    formatDateForDB,
    isCurrentWeek,
    isCurrentMonth,
    isCurrentYear
} = require("../../../utils/dates")

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports.updateStats = async function(action, method){
    const db = await dbInstance()
    const category = capitalizeFirstLetter(action.category);
    const actionDate = action.created_time.toDate();
    const actionDateDBFormat = formatDateForDB(actionDate);
    let statsToUpdate = {};

    if (method === 'create') {
        statsToUpdate.eventActionAddCount = fieldValue.increment(1);
    }

    if (method === 'create' || method === 'delete') {
        const addOrRemove = method === 'create' ? 1 : -1;
        statsToUpdate['actionsCount' + category] = fieldValue.increment(addOrRemove);

        if (action.isPeriodic) {
            statsToUpdate.actionsPeriodicCountTotal = fieldValue.increment(addOrRemove);
        }
    }

    statsToUpdate['days.' + actionDateDBFormat] = fieldValue.increment(action.co2e);

    if (isCurrentWeek(actionDate)) {
        statsToUpdate.weekTotal = fieldValue.increment(action.co2e);
        statsToUpdate['week' + category] = fieldValue.increment(action.co2e);
    }
    if (isCurrentMonth(actionDate)) {
        statsToUpdate.monthTotal = fieldValue.increment(action.co2e);
        statsToUpdate['month' + category] = fieldValue.increment(action.co2e);
    }
    if (isCurrentYear(actionDate)) {
        statsToUpdate.yearTotal = fieldValue.increment(action.co2e);
        statsToUpdate['year' + category] = fieldValue.increment(action.co2e);
    }

    const statToUpdate = await db.collection('stats')
        .where('uid', '==', action.uid)
        .limit(1)
        .get();

    await statToUpdate.docs[0].ref.update(statsToUpdate)
}
