const functions = require('firebase-functions');
const { FieldValue } = require('firebase-admin/firestore');

const {
  db,
} = require('./admin');


 exports.update = functions.region('europe-west6').firestore.document('/stats/{documentId}')
    .onWrite(async (event) => {

        // Onboarding challenges
        // If action count > 0, set challenge to true
        // Onboarding challenges never reset, even if count goes to 0.
        const newStats =  event.after.data();
        if(newStats.actionsCountTransport > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingTransport: true})});
        }
        if (newStats.actionsCountServices > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingServices: true})});
        }
        if (newStats.actionsCountObjects > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingObjects: true})});
        } 
        if (newStats.actionsCountLodging > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingLodging: true})});
        }
        if (newStats.actionsCountFurniture > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingFurniture: true})});
        } 
        if (newStats.actionsCountFood > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingFood: true})});
        }
        if (newStats.actionsCountDigital > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingDigital: true})});
        }
        if (newStats.actionsCountClothes > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingClothes: true})});
        }
        if (newStats.actionsCountAppliance > 0) {
            await db.collection('challenges').where('uid', '==', newStats.uid).limit(1).get()
            .then((query) => {
                const userChallenges = query.docs[0];
                userChallenges.ref.update({onboardingAppliance: true})});
        }
        // End of onboarding challenges
    });

    exports.init = functions.region('europe-west6').firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {

    const user = snap.data();
    const { uid } = user;

    // If user is not a fake account from stores
    if (typeof uid !== 'undefined' && uid) {
        // Create default values for stats table
        try {
        await db.collection('challenges').add({
            uid: uid,
            onboardingTransport: false,
            onboardingServices: false,
            onboardingObjects: false,
            onboardingLodging: false,
            onboardingFurniture: false,
            onboardingFood: false,
            onboardingDigital: false,
            onboardingClothes: false,
            onboardingAppliance: false

        });
        } catch (error) {
        throw new Error(`Init user challenges failed, ${error}`);
        }
    }
});

exports.flush = functions.region('europe-west6').firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
    
    const user = snap.data();
    const { uid } = user;

    try {
        // Deletes all Stats for User
        const killStats = db.collection('challenges').where('uid', '==', uid);
        killStats.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            doc.ref.delete();
            });
        });
    } catch (error) {
        throw new Error(`Init flush challenges failed, ${error}`);
    }
 });