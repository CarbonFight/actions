const functions = require('firebase-functions');

const { dbInstance, fieldValue } = require('../../db-setup');

const { createStatsModel } = require('./model');

const { updateStats } = require('./methods/update-stats');
const { updateSponsorCount } = require('./methods/update-sponsor-count');
const { getStatsByUid } = require('./methods/get-stats-by-uid');
const { dayInStreak } = require('../users/methods/day-in-streak');

exports.actionUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/actions/{documentId}')
    .onWrite(async (event) => {
        const previousValues = event.before?.data();
        const newValues = event.after.data();

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
    });

exports.userUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onUpdate(async (event) => {
        const db = await dbInstance();

        const previousValues = event.before.data();
        const newValues = event.after.data();

        const updates = {};

        // If user target is updated, increment eventUpdateTargetCount
        if (previousValues.target !== newValues.target) {
            updates.eventUpdateTargetCount = fieldValue.increment(1);
        }

        // If user team is updated, increment eventUpdateTargetCount
        if (previousValues.team !== newValues.team) {
            updates.eventUpdateTeamCount = fieldValue.increment(1);
        }

        // If user connection_history is updated, increment countConsecutiveDays or reset to 1
        if (
            previousValues.connection_history.length <
            newValues.connection_history.length
        ) {
            const isDayInStreak = dayInStreak(newValues.connection_history);

            updates.countConsecutiveDays = isDayInStreak
                ? fieldValue.increment(1)
                : 1;
        }

        // Perform update
        const statsRef = await getStatsByUid(db, newValues.uid);
        if (statsRef && previousValues !== newValues) {
            await statsRef.ref.update(updates);
        }

        // If user sponsor is updated, increment sponsorCount of sponsoring User
        if (!previousValues.sponsor) {
            await updateSponsorCount(db, newValues.sponsor);
        }
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
                await db.collection('stats').add(createStatsModel(uid));
            } catch (error) {
                throw new Error(`Init user stats failed, ${error}`);
            }
        }
    });

exports.userDelete = functions
    .region('europe-west6')
    .firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
        const db = await dbInstance();
        const user = snap.data();

        try {
            // Deletes all Stats for User
            const userStats = db
                .collection('stats')
                .where('uid', '==', user.uid);
            userStats.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete();
                });
            });
        } catch (error) {
            throw new Error(`Init flush stats failed, ${error}`);
        }
    });
