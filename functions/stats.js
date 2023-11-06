const functions = require('firebase-functions');
const {
  db,
} = require('./admin');

// Create User Default Data
// When a new user Register or Login for the first time,
// stats are set with default values.
// If not, app shows a blank screen.

exports.init = functions.region('europe-west6').firestore.document('/users/{documentId}')
    .onCreate(async (snap) => {

    const user = snap.data();
    const { uid } = user;

    // If user is not a fake account from stores
    if (typeof uid !== 'undefined' && uid) {
        // Create default values for stats table
        try {
        await db.collection('stats').add({
            uid: uid,

            actionsCountTotal: 0,
            actionsCountTransport: 0,
            actionsCountServices: 0,
            actionsCountObjects: 0,
            actionsCountLodging: 0,
            actionsCountFurniture: 0,
            actionsCountFood: 0,
            actionsCountDigital: 0,
            actionsCountClothes: 0,
            actionsCountAppliance: 0
        });
        } catch (error) {
        throw new Error(`Init user stats failed, ${error}`);
        }
    }
});

exports.flush = functions.region('europe-west6').firestore.document('/users/{documentId}')
    .onDelete(async (snap) => {
    
    const user = snap.data();
    const { uid } = user;

    try {
        // Deletes all Stats for User
        const killStats = db.collection('stats').where('uid', '==', uid);
        killStats.get().then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
            doc.ref.delete();
            });
        });
    } catch (error) {
        throw new Error(`Init flush stats failed, ${error}`);
    }
 });


 exports.update = functions.region('europe-west6').firestore.document('/actions/{documentId}')
    .onWrite(async (event) => {

        const previousValues =  event.data.before.data();
        const newValues =  event.data.after.data();

        const previousCO2e = previousValues.co2e;
        const newCO2e = newValues.co2e;

        // If action is deleted
        if(!newValues) {
            console.log("Action supprimée");
        } else {
            console.log("Action ajoutée ou modifiée");
        }

    });