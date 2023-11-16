const { mockedFunctions } = require("../_setup");

/**
 * Generates a Firestore document change based on the provided data.
 *
 * @param {Object} data - The data object containing information about the document change.
 * @param {string} data.path - The path of the document.
 * @param {Object} data.before - The data of the document before the change.
 * @param {Object} data.after - The data of the document after the change.
 * @returns {Change} A Firestore document change object.
 * @function
 */
module.exports.generateDocChange = function(data){
    /**
     * Represents a Firestore document change.
     * @typedef {Object} Change
     * @property {Function} before - Returns the document snapshot before the change.
     * @property {Function} after - Returns the document snapshot after the change.
     */
    const {path, before, after} = data
    const beforeSnap = mockedFunctions.firestore.makeDocumentSnapshot(before, path);
    const afterSnap = mockedFunctions.firestore.makeDocumentSnapshot(after, path);
    return mockedFunctions.makeChange(beforeSnap, afterSnap);
}
