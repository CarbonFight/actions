const functions = require('firebase-functions')
const { createStatsModel } = require('./model')
const { dbInstance } = require('../../db-setup')
const { updateStats } = require("./methods/update-stats");

exports.actionUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/actions/{documentId}')
    .onWrite(async (event) => {
        const previousValues = event.before?.data()
        const newValues = event.after.data()

        // NEW action
        if (!previousValues) {
            await updateStats(newValues, 'create');
        }
        // UPDATE action
        else if (previousValues && newValues) {
            newValues.co2e -= previousValues.co2e;
            await updateStats(newValues, 'update');
        }
        // DELETE action
        else if (!newValues) {
            previousValues.co2e = -previousValues.co2e;
            await updateStats(previousValues, 'delete');
        }
    })

exports.userUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onUpdate(async (event) => {
        const previousValues = event.before.data()
        const newValues = event.after.data()

        // Update stats
        await db
            .collection('stats')
            .where('uid', '==', newValues.uid)
            .limit(1)
            .get()
            .then((query) => {
                const userStats = query.docs[0]

                // If user target is updated, increment eventUpdateTargetCount
                if (previousValues.target != newValues.target) {
                    userStats.ref.update({
                        eventUpdateTargetCount: FieldValue.increment(1),
                    })
                }

                // If user team is updated, increment eventUpdateTargetCount
                if (previousValues.team != newValues.team) {
                    userStats.ref.update({
                        eventUpdateTeamCount: FieldValue.increment(1),
                    })
                }
            })
    })

exports.init = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {
        const db = await dbInstance();
        const user = snap.data()
        const { uid } = user

        // If user is not a fake account from stores
        if (typeof uid !== 'undefined' && uid) {
            // Create default values for stats table
            try {
                await db.collection('stats').add(createStatsModel(uid))
            } catch (error) {
                throw new Error(`Init user stats failed, ${error}`)
            }
        }
    })

exports.userDelete = functions
    .region('europe-west6')
    .firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
        const db = await dbInstance();
        const user = snap.data()

        try {
            // Deletes all Stats for User
            const userStats = db.collection('stats').where('uid', '==', user.uid)
            userStats.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
        } catch (error) {
            throw new Error(`Init flush stats failed, ${error}`)
        }
    })
