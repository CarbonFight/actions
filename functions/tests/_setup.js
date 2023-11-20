const fireTest = require("firebase-functions-test")
const { projectId } = require("../db-setup");

/**
 * Creates a mocked instance of Firebase Functions for testing.
 *
 * @typedef {Object} FeaturesList
 * @property {Function} features - Mocks the features listed.
 * @property {Function} cleanup - Cleans up the mocked features.
 *
 * @type {FeaturesList} The mocked Firebase Functions instance.
 */
module.exports.mockedFunctions = fireTest({
    projectId,
});

/**
 * Deletes the content of specified collections in the Firestore database.
 *
 * @param {Firestore} db - The Firestore instance.
 * @param {string[]} collections - An array of collection names to delete.
 * @returns {Promise<void>} A promise that resolves when all deletions are complete.
 */
module.exports.deleteCollectionsContent = async function(db, collections = []) {
    await Promise.all(collections.map(async (collection) => {
        const querySnapshot = await db.collection(collection).get();

        const deletePromises = querySnapshot.docs.map(async (snapshot) => {
            await snapshot.ref.delete();
        });

        await Promise.all(deletePromises);
    }));
};
