const functions = require('firebase-functions');

const { dbInstance } = require('../../db-setup');

const { createChallengeModel } = require('./model');
const { updateChallenges } = require('./methods/update-challenges');

exports.update = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/stats/{documentId}')
    .onUpdate(async (event) => {
        const db = await dbInstance();
        const newStats = event.after.data();
        const uid = newStats.uid;

        await updateChallenges(db, uid, newStats);
    });

exports.init = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {
        const db = await dbInstance();
        const user = snap.data();
        const { uid } = user;

        // If user is not a fake account from stores
        if (typeof uid !== 'undefined' && uid) {
            // Create default values for stats table
            try {
                await db
                    .collection('challenges')
                    .add(createChallengeModel(uid));
            } catch (error) {
                throw new Error(`Init user challenges failed, ${error}`);
            }
        }
    });
