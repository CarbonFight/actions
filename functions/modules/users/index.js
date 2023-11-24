const functions = require('firebase-functions');

const { dbInstance } = require('../../db-setup');

const {
    getUserBySponsorshipCode,
} = require('./methods/get-by-sponsorship-code');
const { updateUserSponsor } = require('./methods/update-sponsor-code');

exports.userUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onUpdate(async (event) => {
        const previousValues = event.before.data();
        const newValues = event.after.data();
        const uid = newValues.uid;
        const db = await dbInstance();

        if (!previousValues.sponsor && newValues.sponsor) {
            // Check if sponsor code exists
            const userSnap = await getUserBySponsorshipCode(
                db,
                newValues.sponsor
            );
            if (userSnap.empty) {
                throw new Error(`Sponsor code ${newValues.sponsor} is invalid`);
            }

            // Set sponsor to user
            await updateUserSponsor(db, uid, newValues.sponsor);
        }
    });
