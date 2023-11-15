const firebase = require('@firebase/testing');
const fireTest = require("firebase-functions-test")
const fs = require('fs');

const projectId = "carbonfight-test-" + new Date().getTime()

module.exports.setup = async () => {
    process.env.GCLOUD_PROJECT = projectId
    process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

    const app = await firebase.initializeTestApp({
        projectId
    });

    const db = app.firestore();

    await firebase.loadFirestoreRules({
        projectId,
        rules: fs.readFileSync('../firestore.rules', 'utf8')
    });

    return db;
};

module.exports.mockedFunctions = fireTest({
    projectId,
});
