module.exports.getPeriodicActions = async function (db) {
    return await db.collection('actions').where('isPeriodic', '==', true).get();
};
