module.exports.createAction = async function (db, actionData) {
    await db.collection('actions').add({
        ...actionData,
        isPeriodic: false,
        periodicity: [],
        created_time: new Date(),
    });
};
