module.exports.getUsers = async function (db) {
    return await db.collection('users').get();
};
