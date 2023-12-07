module.exports.resetDailyStats = async function (db, uid) {
    const statsSnapshot = await db
        .collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    if (!statsSnapshot.empty) {
        await statsSnapshot.docs[0].ref.update({
            dayTotal: 0,
            dayTransport: 0,
            dayServices: 0,
            dayObjects: 0,
            dayLodging: 0,
            dayFurniture: 0,
            dayFood: 0,
            dayDigital: 0,
            dayClothes: 0,
            dayAppliance: 0,
        });
    }
};
