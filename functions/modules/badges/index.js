const functions = require('firebase-functions')

const { createBadgeModel } = require('./model')
const { validateOnboardingChallenge } = require('../challenges/validation')
const { validateUser } = require('../user/validation')

const { dbInstance } = require('../../db-setup')

exports.update = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/challenges/{documentId}')
    .onUpdate(async (event) => {
        const db = await dbInstance()
        const newChallenges = event.after.data()
        // If all onboarding challenges are true, set onboardingAllChallenges to true
        if (validateOnboardingChallenge(newChallenges)) {
            await db
                .collection('badges')
                .where('uid', '==', newChallenges.uid)
                .limit(1)
                .get()
                .then((query) => {
                    const userBadges = query.docs[0]
                    userBadges.ref.update({ onboardingAllChallenges: true })
                })
        }
    })

exports.init = functions
    .region('europe-west6')
    .runWith({ minInstances: 1 })
    .firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {
        const db = await dbInstance()
        const user = snap.data()

        // If user is not a fake account from stores
        if (validateUser(user)) {
            // Create default values for stats table
            try {
                await db.collection('badges').add(createBadgeModel(user.uid))
            } catch (error) {
                throw new Error(`Init user badges failed, ${error}`)
            }
        }
    })

exports.flush = functions
    .region('europe-west6')
    .firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
        const db = await dbInstance()
        const user = snap.data()
        const { uid } = user

        try {
            // Deletes all Stats for User
            const killStats = db.collection('badges').where('uid', '==', uid)
            killStats.get().then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    doc.ref.delete()
                })
            })
        } catch (error) {
            throw new Error(`Init flush badges failed, ${error}`)
        }
    })
