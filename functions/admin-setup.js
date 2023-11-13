const adminSetup = require('firebase-admin');

adminSetup.initializeApp();
const db = adminSetup.firestore();

db.settings({ ignoreUndefinedProperties: true });

module.exports = {
  db,
};
