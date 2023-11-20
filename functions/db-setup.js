const admin = require('firebase-admin')
const firebase = require("@firebase/testing");
const fs = require("fs");

const projectId = "carbonfight-test-" + new Date().getTime()
async function dbInstanceSetup(){
    if(process.env.NODE_ENV === 'test'){
        process.env.GCLOUD_PROJECT = projectId
        process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

        const app = await firebase.initializeTestApp({
            projectId
        });

        let db = app.firestore();

        await firebase.loadFirestoreRules({
            projectId,
            rules: fs.readFileSync('../firestore.rules', 'utf8')
        });

        return db
    } else {
        admin.initializeApp()
        const db = admin.firestore()

        db.settings({ ignoreUndefinedProperties: true })

        return db
    }
}

module.exports.dbInstance = dbInstanceSetup
module.exports.projectId = projectId