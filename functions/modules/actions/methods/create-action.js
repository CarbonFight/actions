const Logger = require('../../../logger-setup');

module.exports.createAction = async function (db, actionData) {
    await db.collection('actions').add({
        ...actionData,
        isPeriodic: false,
        periodicity: null,
        created_time: new Date(),
    });

    Logger.info({
        ...actionData,
        isPeriodic: false,
        periodicity: null,
        created_time: new Date(),
    });
};
