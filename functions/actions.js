const functions = require('firebase-functions');
const isChampsValid = require("./dataValidator");
const isParametersValidOnCreate = require("./dataValidator");
const map = require("./dataMapper");
const updateStats = require("./stats");

exports.update = functions
  .region('europe-west6')
  .firestore.document('/actions/{documentId}')
  .onUpdate(async (change) => {
    const data = change.after.data();
    const categorie = data.category;
    try {
      const co2eBefore = change.before.data().co2e;
      const co2eCurrent = change.after.data().co2e;
      if (co2eCurrent !== co2eBefore) {
        const co2e = co2eCurrent - co2eBefore;
        await updateStats(categorie, data.userId, co2e);
      } else {
        const isValid = isChampsValid(categorie, data);
        if (!isValid) {
          change.after.ref.delete();
          throw new Error(`Action has been deleted, parameter missing in document :  ${JSON.stringify(change.after.data())}`);
        }
      }
    } catch (error) {
      throw new Error(`${categorie} calculation failed, ${error}`);
    }
  });

exports.create = functions
.region('europe-west6')
.firestore.document('/actions/{documentId}')
.onCreate(async (snap) => {
  try {
    const data = snap.data();
    const categorie = data.category;
    const isValid = isParametersValidOnCreate(dcategorie, data);
    if (isValid) {
      const value = map(categorie, data);
      await snap.ref.set(value);
    } else {
      await snap.ref.delete();
      throw new Error(`Action has been deleted, parameter missing in document :  ${JSON.stringify(snap.data())}`);
    }
    await updateStats(categorie, data.userId);
  } catch (error) {
    throw new Error(`${categorie} calculation failed, ${error}`);
  }
});

exports.delete = functions
.region('europe-west6')
.firestore.document('/actions/{documentId}')
.onDelete(async (snap) => {
  try {
    const data = snap.data();
    const categorie = data.category;
    await updateStats(categorie, data.userId);
  } catch (error) {
    throw new Error(`${categorie} delete failed, ${error}`);
  }
});

