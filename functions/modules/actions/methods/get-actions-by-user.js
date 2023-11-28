module.exports.getUserActions = async function (db, uid) {
    return await db.collection('actions').where('uid', '==', uid).get();
};
