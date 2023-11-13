const functions = require('firebase-functions')
const { FieldValue } = require('firebase-admin/firestore')

const { createStatsModel } = require('./model')

const { db } = require('../../admin-setup')

// Add co2e to stats

// Todo, update stats in the correct day/week/month/year from creation_time
async function addCO2eToStats(uid, category, co2e, actionCount, creation_time) {
    // Update stats
    await db
        .collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get()
        .then((query) => {
            const userStats = query.docs[0]

            // increment add/delete/update action count
            if (actionCount == 1) {
                userStats.ref.update({
                    eventActionAddCount: FieldValue.increment(1),
                })
            } else if (actionCount == -1) {
                userStats.ref.update({
                    eventActionDeleteCount: FieldValue.increment(1),
                })
            } else if (actionCount == 0) {
                userStats.ref.update({
                    eventActionAddCount: FieldValue.increment(1),
                })
            }

            // update stats
            userStats.ref.update({
                actionsCountTotal: FieldValue.increment(actionCount),
                weekTotal: FieldValue.increment(co2e),
                monthTotal: FieldValue.increment(co2e),
                yearTotal: FieldValue.increment(co2e),
            })

            if (category == 'transport') {
                userStats.ref.update({
                    actionsCountTransport: FieldValue.increment(actionCount),
                    weekTransport: FieldValue.increment(co2e),
                    monthTransport: FieldValue.increment(co2e),
                    yearTransport: FieldValue.increment(co2e),
                })
            } else if (category == 'services') {
                userStats.ref.update({
                    actionsCountServices: FieldValue.increment(actionCount),
                    weekServices: FieldValue.increment(co2e),
                    monthServices: FieldValue.increment(co2e),
                    yearServices: FieldValue.increment(co2e),
                })
            } else if (category == 'objects') {
                userStats.ref.update({
                    actionsCountObjects: FieldValue.increment(actionCount),
                    weekObjects: FieldValue.increment(co2e),
                    monthObjects: FieldValue.increment(co2e),
                    yearObjects: FieldValue.increment(co2e),
                })
            } else if (category == 'lodging') {
                userStats.ref.update({
                    actionsCountLodging: FieldValue.increment(actionCount),
                    weekLodging: FieldValue.increment(co2e),
                    monthLodging: FieldValue.increment(co2e),
                    yearLodging: FieldValue.increment(co2e),
                })
            } else if (category == 'furniture') {
                userStats.ref.update({
                    actionsCountFurniture: FieldValue.increment(actionCount),
                    weekFurniture: FieldValue.increment(co2e),
                    monthFurniture: FieldValue.increment(co2e),
                    yearFurniture: FieldValue.increment(co2e),
                })
            } else if (category == 'food') {
                userStats.ref.update({
                    actionsCountFood: FieldValue.increment(actionCount),
                    weekFood: FieldValue.increment(co2e),
                    monthFood: FieldValue.increment(co2e),
                    yearFood: FieldValue.increment(co2e),
                })
            } else if (category == 'digital') {
                userStats.ref.update({
                    actionsCountDigital: FieldValue.increment(actionCount),
                    weekDigital: FieldValue.increment(co2e),
                    monthDigital: FieldValue.increment(co2e),
                    yearDigital: FieldValue.increment(co2e),
                })
            } else if (category == 'clothes') {
                userStats.ref.update({
                    actionsCountClothes: FieldValue.increment(actionCount),
                    weekClothes: FieldValue.increment(co2e),
                    monthClothes: FieldValue.increment(co2e),
                    yearClothes: FieldValue.increment(co2e),
                })
            } else if (category == 'appliance') {
                userStats.ref.update({
                    actionsCountAppliance: FieldValue.increment(actionCount),
                    weekAppliance: FieldValue.increment(co2e),
                    monthAppliance: FieldValue.increment(co2e),
                    yearAppliance: FieldValue.increment(co2e),
                })
            }
        })
}

exports.actionUpdate = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/actions/{documentId}')
    .onWrite(async (event) => {
        const previousValues = event.before.data()
        const newValues = event.after.data()

        // Action is DELETED
        // If action is deleted, we substract the co2e from the stats
        if (!newValues) {
            const co2e = -previousValues.co2e
            const actionCount = -1
            addCO2eToStats(
                previousValues.uid,
                previousValues.category,
                co2e,
                actionCount,
                previousValues.creation_time,
            )

            // Action is CREATED
            // If action is created, we add the co2e to the stats
        } else if (!previousValues) {
            const co2e = newValues.co2e
            const actionCount = 1
            addCO2eToStats(
                newValues.uid,
                newValues.category,
                co2e,
                actionCount,
                newValues.creation_time,
            )
        }

        // Action is UPDATED
        // If action is updated, we substract the previous co2e and add the new co2e to the stats
        else {
            const co2e = newValues.co2e - previousValues.co2e
            const actionCount = 0
            addCO2eToStats(
                newValues.uid,
                newValues.category,
                co2e,
                actionCount,
                newValues.creation_time,
            )
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

exports.flush = functions
    .region('europe-west6')
    .firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
        const user = snap.data()
        const { uid } = user

        try {
            // Deletes all Stats for User
            const killStats = db.collection('stats').where('uid', '==', uid)
            killStats.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
        } catch (error) {
            throw new Error(`Init flush stats failed, ${error}`)
        }
    })
