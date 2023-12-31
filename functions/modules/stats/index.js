const functions = require('firebase-functions');
const { dbInstance, fieldValue } = require('../../db-setup');
const { createStatsModel } = require('./model');
const { updateStats } = require('./methods/update-stats');
const { updateSponsorCount } = require('./methods/update-sponsor-count');
const { getStatsByUid } = require('./methods/get-stats-by-uid');
const { daysInStreak } = require('../users/methods/days-in-streak');

exports.actionUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/actions/{documentId}')
    .onWrite(async (event) => {
        const db = await dbInstance();

        const previousValues = event.before?.data();
        const newValues = event.after.data();

        const statsSnap = await db
            .collection('stats')
            .where('uid', '==', newValues ? newValues.uid : previousValues.uid)
            .limit(1)
            .get();

        if (!statsSnap.empty) {
            // NEW action
            if (!previousValues) {
                await updateStats('create', newValues);
            }
            // UPDATE action
            else if (previousValues && newValues) {
                await updateStats('update', newValues, previousValues);
            }
            // DELETE action
            else if (!newValues) {
                await updateStats('delete', null, previousValues);
            }
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
        if (
            previousValues.target &&
            previousValues.target !== newValues.target
        ) {
            updates.eventUpdateTargetCount = fieldValue.increment(1);
        }

        // If user team is updated, increment eventUpdateTargetCount
        if (previousValues.team && previousValues.team !== newValues.team) {
            updates.eventUpdateTeamCount = fieldValue.increment(1);
        }

        // If user display_name is updated, increment eventUpdateDisplayNameCount
        if (
            previousValues.display_name &&
            previousValues.display_name !== newValues.display_name
        ) {
            updates.eventUpdateDisplayNameCount = fieldValue.increment(1);
        }

        // If user connection_history is updated, increment connectionStreak or reset to 1
        if (
            previousValues.connection_history &&
            previousValues.connection_history.length <
                newValues.connection_history.length
        ) {
            const streakCount = daysInStreak(newValues.connection_history);

            updates.connectionStreak = streakCount;
        }

        // Perform update
        if (Object.keys(updates).length > 0) {
            const statsRef = await getStatsByUid(db, newValues.uid);
            if (statsRef && previousValues !== newValues) {
                await statsRef.ref.update(updates);
            }
        }

        // If user sponsor is updated, increment sponsorCount of sponsoring User
        if (!previousValues.sponsor && newValues.sponsor) {
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
