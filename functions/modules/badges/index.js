const functions = require('firebase-functions');

const { createBadgeModel } = require('./model');
const { validateUser } = require('../users/validation');
const { updateBadges } = require('./methods/update-badges');
const { getBadgesByUid } = require('./methods/get-badges-by-uuid');

const { dbInstance } = require('../../db-setup');

exports.update = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/challenges/{documentId}')
    .onUpdate(async (event) => {
        const db = await dbInstance();
        const newChallenges = event.after.data();
        const uid = newChallenges.uid;

        await updateBadges(db, uid, newChallenges);
    });

exports.init = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {
        const db = await dbInstance();
        const user = snap.data();

        // If user is not a fake account from stores
        if (validateUser(user)) {
            // Create default values for stats table
            try {
                await db.collection('badges').add(createBadgeModel(user.uid));
            } catch (error) {
                throw new Error(`Init user badges failed, ${error}`);
            }
        }
    });

exports.userUpdate = functions
    .region('europe-west6')
    .firestore.document('/users/{documentId}')
    .onUpdate(async (event) => {
        const db = await dbInstance();

        const previousValues = event.before.data();
        const newValues = event.after.data();

        const updates = {};

        if (
            newValues.skipHowto &&
            previousValues.skipHowto !== newValues.skipHowto
        ) {
            updates.onboardingHowtoFinished = true;
        }

        if (Object.keys(updates).length > 0) {
            const badgesRef = await getBadgesByUid(db, newValues.uid);
            if (badgesRef && previousValues !== newValues) {
                await badgesRef.ref.update(updates);
            }
        }
    });
