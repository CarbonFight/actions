module.exports.updateUserSponsor = async function (db, uid, sponsor) {
    const userRef = await db
        .collection('users')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    if (userRef.empty) {
        throw new Error(`User with uid ${uid} not found`);
    }

    const userData = userRef.docs[0].data();

    if (userData.sponsorship_code === sponsor) {
        throw new Error(`Users cannot sponsor themselves`);
    }

    await userRef.docs[0].ref.set(
        {
            sponsor,
        },
        { merge: true }
    );
};
