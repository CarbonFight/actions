const functions = require('firebase-functions-test');
const admin = require('firebase-admin');

const { create } = require('../index');

const serviceAccount = require('../../../../import/serviceAccountKey.json');
if (!serviceAccount) {
    throw new Error('serviceAccountKey.json is a mandatory file. Please add it.');
}

const testEnv = functions();

const projectId = 'sample' + new Date().getTime();

// initialize test database
process.env.GCLOUD_PROJECT = projectId;
process.env.FIRESTORE_EMULATOR_HOST = 'localhost:8080';

// Check if admin is already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        projectId,
        credential: admin.credential.cert(serviceAccount),
    });
}

let wrapped;

// Your user dataset
const userData = require('../../../data/users.dataset');

// Create documentReference with created test database
const userRef = admin.firestore().collection('users').doc(userData[0].uid);

describe('Sample tests', () => {
    beforeAll(() => {
        // Creates wrapped test function from the cloud function which can be called in tests
        wrapped = testEnv.wrap(create);
    });

    beforeEach(async () => {
        // Clean database before each test
        await testEnv.firestore.clearFirestoreData({ projectId: projectId });

        // Add the user data to Firestore
        console.log(userRef)
        await userRef.set(userData[0]); // Assuming userData is an array and you want to add the first user
    });

    test('it should have a defined uid', async () => {
        // Retrieve the user document
        const userSnapshot = await userRef.get();

        // Assert that the user document exists
        expect(userSnapshot.exists).toBe(true);

        // Assert that the UID is defined
        expect(userSnapshot.data().uid).toBeDefined();
    });

    // Add more tests as needed

    afterAll(() => {
        // Cleanup and release resources after all tests
        testEnv.cleanup();
    });
});
