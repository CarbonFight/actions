module.exports.checkIfSponsorCodeExists = async function (db, sponsorshipCode) {
    const snap = await db
        .collection('users')
        .where('sponsorship_code', '==', sponsorshipCode)
        .limit(1)
        .get();
    return !snap.empty;
};
