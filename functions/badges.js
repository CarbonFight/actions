const functions = require('firebase-functions');
const { FieldValue } = require('firebase-admin/firestore');

const {
  db,
} = require('./admin');


exports.update = functions.region('europe-west6').firestore.document('/challenges/{documentId}')
    .onUpdate(async (event) => {
        const newChallenges =  event.after.data();
        // If all onboarding challenges are true, set onboardingAllChallenges to true
        if (newChallenges.onboardingTransport && 
            newChallenges.onboardingServices && 
            newChallenges.onboardingObjects && 
            newChallenges.onboardingLodging && 
            newChallenges.onboardingFurniture && 
            newChallenges.onboardingFood && 
            newChallenges.onboardingDigital && 
            newChallenges.onboardingClothes && 
            newChallenges.onboardingAppliance) {
            await db.collection('badges').where('uid', '==', newChallenges.uid).limit(1).get()
            .then((query) => {
                const userBadges = query.docs[0];
                userBadges.ref.update({onboardingAllChallenges: true})});
        }
    });

exports.init = functions.region('europe-west6').firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {

    const user = snap.data();
    const { uid } = user;

    // If user is not a fake account from stores
    if (typeof uid !== 'undefined' && uid) {
        // Create default values for stats table
        try {
        await db.collection('badges').add({
            uid: uid,
            onboardingHowtoFinished: false,
            onboardingAllChallenges: false
        });
        } catch (error) {
        throw new Error(`Init user badges failed, ${error}`);
        }
    }
});

exports.flush = functions.region('europe-west6').firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
    
    const user = snap.data();
    const { uid } = user;

    try {
        // Deletes all Stats for User
        const killStats = db.collection('badges').where('uid', '==', uid);
        killStats.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            doc.ref.delete();
            });
        });
    } catch (error) {
        throw new Error(`Init flush badges failed, ${error}`);
    }
 });