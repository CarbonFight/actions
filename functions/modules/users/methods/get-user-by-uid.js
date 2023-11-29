module.exports.getUserByUid = async function (db, uid) {
    const user = await db.collection('users').where('uid', '==', uid).limit(1).get();
    return user?.docs?.[0] ? user?.docs?.[0].data() : null
};
