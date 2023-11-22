const { fieldValue } = require('../../../db-setup');

module.exports.updateSponsorCount = async function (db, sponsorshipCode) {
    const sponsorSnap = await db
        .collection('users')
        .where('sponsorship_code', '==', sponsorshipCode)
        .limit(1)
        .get();
    if (sponsorSnap.empty) {
        throw new Error(`Invalid sponsorship code`);
    }

    const sponsorUserUid = sponsorSnap.docs[0].data().uid;
    const statsSnap = await db
        .collection('stats')
        .where('uid', '==', sponsorUserUid)
        .limit(1)
        .get();
    if (!statsSnap.empty) {
        await statsSnap.docs[0].ref.update({
            sponsorshipCount: fieldValue.increment(1),
        });
    }
};
