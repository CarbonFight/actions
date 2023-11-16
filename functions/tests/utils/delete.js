const { mockedFunctions } = require("../_setup");

/**
 * Asynchronously generates a Firestore document snapshot based on the provided data and path, deletes the corresponding document from the Firestore database, and returns the generated snapshot.
 *
 * @param {Object} obj - An object containing information about the document snapshot.
 * @param {Object} obj.db - The Firestore database instance.
 * @param {Object} obj.data - The data object to be included in the document snapshot.
 * @param {string} obj.path - The path of the document.
 * @returns {Promise<DocumentSnapshot>} A Promise that resolves to a Firestore document snapshot object after the document is deleted.
 * @function
 */
module.exports.generateDeletedDocSnapshot = async function(obj) {
    const {db, data, path} = obj
    const snapshot = await mockedFunctions.firestore.makeDocumentSnapshot(data, path);
    await db.doc(path).delete()
    return snapshot
}
