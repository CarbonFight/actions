const { fieldValue } = require('../../../db-setup');

const {
    getUserBySponsorshipCode,
} = require('../../users/methods/get-user-by-sponsorship-code');

module.exports.updateSponsorCount = async function (db, sponsorshipCode) {
    const userSnap = await getUserBySponsorshipCode(db, sponsorshipCode);
    if (userSnap.empty) {
        throw new Error(`Invalid sponsorship code`);
    }

    const sponsorUserUid = userSnap.docs[0].data().uid;
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
