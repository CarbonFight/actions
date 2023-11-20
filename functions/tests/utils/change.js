const { mockedFunctions } = require("../_setup");

/**
 * Generates a Firestore document snapshot based on the provided data and path.
 *
 * @param {Object} obj - An object containing information about the document snapshot.
 * @param {Object} obj.data - The data object to be included in the document snapshot.
 * @param {string} obj.path - The path of the document.
 * @param {Firestore} obj.db - The Firestore database instance.
 * @returns {Promise<DocumentSnapshot>} A Firestore document snapshot object representing the document at the specified path.
 * @function
 */
async function generateDocSnapshot(obj) {
    const { db, data, path } = obj;

    // Set the document data at the specified path
    await db.doc(path).set(data);

    // Create and return a Firestore document snapshot
    return mockedFunctions.firestore.makeDocumentSnapshot(data, path);
}

module.exports.generateDocSnapshot = generateDocSnapshot;

/**
 * Generates a Firestore document change based on the provided data.
 *
 * @param {Object} data - The data object containing information about the document change.
 * @param {string} data.path - The path of the document.
 * @param {Object} data.before - The data of the document before the change.
 * @param {Object} data.after - The data of the document after the change.
 * @param {Firestore} data.db - The Firestore database instance.
 * @returns {Promise<Change<DocumentSnapshot>>} A Firestore document change object representing the change that occurred.
 * @function
 */
module.exports.generateDocChange = async function (data) {
    /**
     * Represents a Firestore document change.
     * @typedef {Object} Change
     * @property {Function} before - Returns the document snapshot before the change.
     * @property {Function} after - Returns the document snapshot after the change.
     */
    const { db, path, before, after } = data;

    // Generate document snapshots for the before and after states
    const beforeSnap = await generateDocSnapshot({ db, data: before, path });
    const afterSnap = await generateDocSnapshot({ db, data: after, path });

    // Create and return a Firestore document change
    return mockedFunctions.makeChange(beforeSnap, afterSnap);
};
