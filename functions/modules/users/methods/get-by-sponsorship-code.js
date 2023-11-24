module.exports.getUserBySponsorshipCode = async function (db, sponsorshipCode) {
    return await db
        .collection('users')
        .where('sponsorship_code', '==', sponsorshipCode)
        .limit(1)
        .get();
};
