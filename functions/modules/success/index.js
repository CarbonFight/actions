const functions = require('firebase-functions');

const { dbInstance } = require('../../db-setup');

const { createSuccessModel } = require('./model');

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
                    .collection('success')
                    .add(createSuccessModel(uid));
            } catch (error) {
                throw new Error(`Init user success failed, ${error}`);
            }
        }
    });

exports.flush = functions
    .region('europe-west6')
    .firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
        const db = await dbInstance();
        const user = snap.data();
        const { uid } = user;

        try {
            // Deletes all Stats for User
            const killStats = db
                .collection('success')
                .where('uid', '==', uid);
            killStats.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
        } catch (error) {
            throw new Error(`Init flush success failed, ${error}`);
        }
    });
