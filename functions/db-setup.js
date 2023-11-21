const admin = require('firebase-admin')
const firebase = require("@firebase/testing");
const { readFileSync } = require("fs");
const { FieldValue } = require("firebase-admin/firestore");

const projectId = "carbonfight-test-" + new Date().getTime()
async function dbInstanceSetup(){
    let db = null

    if(process.env.NODE_ENV === 'test'){
        if(firebase.apps.length){
            db = firebase.apps[0]
        } else {
            process.env.GCLOUD_PROJECT = projectId
            process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080";

            const app = await firebase.initializeTestApp({
                projectId
            });

            db = app.firestore();

            await firebase.loadFirestoreRules({
                projectId,
                rules: readFileSync('../firestore.rules', 'utf8')
            });
        }
    } else {
        try {
            admin.initializeApp()
            db = admin.firestore()
            db.settings({ignoreUndefinedProperties: true})
        }
        catch(err){
            admin.app()
            db = admin.firestore()
        }
    }

    return db
}

module.exports.dbInstance = dbInstanceSetup
module.exports.projectId = projectId
module.exports.fieldValue = process.env.NODE_ENV === 'test' ? firebase.firestore.FieldValue : FieldValue;