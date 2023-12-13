module.exports.getBadgesByUid = async function (db, uid) {
    const userBadges = await db
        .collection('badges')
        .where('uid', '==', uid)
        .limit(1)
        .get();
    return userBadges?.docs?.[0] || null;
};
