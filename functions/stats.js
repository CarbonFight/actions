const functions = require('firebase-functions');
const { FieldValue } = require('firebase-admin/firestore');
const dates = require('./dates');

const {
  db,
} = require('./admin');

// Add co2e to stats

// Todo, update stats in the correct day/week/month/year from creation_time
async function addCO2eToStats(uid, category, co2e, actionCount, creation_time) {

    // Update stats
    await db.collection('stats').where('uid', '==', uid).limit(1).get()
    .then((query) => {
        
        const userStats = query.docs[0];
        userStats.ref.update({
            actionsCountTotal: FieldValue.increment(actionCount),
            weekTotal: FieldValue.increment(co2e),
            monthTotal: FieldValue.increment(co2e),
            yearTotal: FieldValue.increment(co2e)});
    
        if (category == "transport") {
            userStats.ref.update({
                actionsCountTransport: FieldValue.increment(actionCount),
                weekTransport: FieldValue.increment(co2e),
                monthTransport: FieldValue.increment(co2e),
                yearTransport: FieldValue.increment(co2e)});
        } else if (category == "services") {
            userStats.ref.update({
                actionsCountServices: FieldValue.increment(actionCount),
                weekServices: FieldValue.increment(co2e),
                monthServices: FieldValue.increment(co2e),
                yearServices: FieldValue.increment(co2e)});
        } else if (category == "objects") {
            userStats.ref.update({
                actionsCountObjects: FieldValue.increment(actionCount),
                weekObjects: FieldValue.increment(co2e),
                monthObjects: FieldValue.increment(co2e),
                yearObjects: FieldValue.increment(co2e)});
        } else if (category == "lodging") {
            userStats.ref.update({
                actionsCountLodging: FieldValue.increment(actionCount),
                weekLodging: FieldValue.increment(co2e),
                monthLodging: FieldValue.increment(co2e),
                yearLodging: FieldValue.increment(co2e)});
        } else if (category == "furniture") {
            userStats.ref.update({
                actionsCountFurniture: FieldValue.increment(actionCount),
                weekFurniture: FieldValue.increment(co2e),
                monthFurniture: FieldValue.increment(co2e),
                yearFurniture: FieldValue.increment(co2e)});
        } else if (category == "food") {
            userStats.ref.update({
                actionsCountFood: FieldValue.increment(actionCount),
                weekFood: FieldValue.increment(co2e),
                monthFood: FieldValue.increment(co2e),
                yearFood: FieldValue.increment(co2e)});
        } else if (category == "digital") {
            userStats.ref.update({
                actionsCountDigital: FieldValue.increment(actionCount),
                weekDigital: FieldValue.increment(co2e),
                monthDigital: FieldValue.increment(co2e),
                yearDigital: FieldValue.increment(co2e)});
        } else if (category == "clothes") {
            userStats.ref.update({
                actionsCountClothes: FieldValue.increment(actionCount),
                weekClothes: FieldValue.increment(co2e),
                monthClothes: FieldValue.increment(co2e),
                yearClothes: FieldValue.increment(co2e)});
        } else if (category == "appliance") {
            userStats.ref.update({
                actionsCountAppliance: FieldValue.increment(actionCount),
                weekAppliance: FieldValue.increment(co2e),
                monthAppliance: FieldValue.increment(co2e),
                yearAppliance: FieldValue.increment(co2e)});
        }
    });
}

 exports.update = functions.region('europe-west6').firestore.document('/actions/{documentId}')
    .onWrite(async (event) => {

        const previousValues =  event.before.data();
        const newValues =  event.after.data();

        // Action is DELETED
        // If action is deleted, we substract the co2e from the stats
        if(!newValues) {
            const co2e = -(previousValues.co2e);
            const actionCount = -1;
            addCO2eToStats(previousValues.uid, previousValues.category, co2e, actionCount, previousValues.creation_time)

        // Action is CREATED
        // If action is created, we add the co2e to the stats
        } else if(!previousValues) {
            const co2e = newValues.co2e;
            const actionCount = 1;
            addCO2eToStats(newValues.uid, newValues.category, co2e, actionCount, newValues.creation_time)
        }

        // Action is UPDATED
        // If action is updated, we substract the previous co2e and add the new co2e to the stats
        else {
            const co2e = newValues.co2e-previousValues.co2e;
            const actionCount = 0;
            addCO2eToStats(newValues.uid, newValues.category, co2e, actionCount, newValues.creation_time)
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
            actionsCountAppliance: 0,

            weekTotalPerDay: [0, 0, 0, 0, 0, 0, 0],
            weekTotal: 0,
            weekTransport: 0,
            weekServices: 0,
            weekObjects: 0,
            weekLodging: 0,
            weekFurniture: 0,
            weekFood: 0,
            weekDigital: 0,
            weekClothes: 0,
            weekAppliance: 0,

            monthTotalPerDay: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            monthTotal: 0,
            monthTransport: 0,
            monthServices: 0,
            monthObjects: 0,
            monthLodging: 0,
            monthFurniture: 0,
            monthFood: 0,
            monthDigital: 0,
            monthClothes: 0,
            monthAppliance: 0,

            yearTotalPerDay: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            yearTotal: 0,
            yearTransport: 0,
            yearServices: 0,
            yearObjects: 0,
            yearLodging: 0,
            yearFurniture: 0,
            yearFood: 0,
            yearDigital: 0,
            yearClothes: 0,
            yearAppliance: 0
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