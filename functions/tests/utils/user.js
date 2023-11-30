/**
 * Retrieves user data from the 'users' collection in the database.
 *
 * @param {FirebaseFirestore} db - The Firestore database instance.
 * @returns {Promise<Object>} A promise that resolves to the user data.
 * @throws {Error} Throws an error if there is an issue accessing the 'users' collection or retrieving user data.
 * @function
 */
module.exports.getUser = async function(db){
    /**
     * Represents user data from the 'users' collection.
     * @typedef {Object} UserData
     * @property {string} uid - The user ID.
     */

    const users = await db.collection('users').limit(1).get();

    return users.docs[0].data();
}

/**
 * Updates user content in the 'users' collection in the database.
 *
 * @param {FirebaseFirestore} db - The Firestore database instance.
 * @param {Object} content - The content to be updated in the user document.
 * @returns {Promise<void>} A promise that resolves when the update is complete.
 * @throws {Error} Throws an error if there is an issue accessing the 'users' collection or updating user content.
 * @function
 */
module.exports.setUserContent = async function(db, content){
    const users = await db.collection('users').limit(1).get();
    const uid = users.docs[0].data().uid

    return users.docs[0].ref.update({
        ...content,
        uid
    });
}

/**
 * Sets the user ID in the provided object using data from the 'users' collection in the database.
 *
 * @param {FirebaseFirestore} db - The Firestore database instance.
 * @param {Object} obj - The object to which the user ID will be added.
 * @returns {Promise<Object>} A promise that resolves to the modified object with the 'userId' property.
 * @throws {Error} Throws an error if there is an issue accessing the 'users' collection or retrieving the user ID.
 * @function
 */
module.exports.setUserId = async function(db, obj){
    /**
     * Represents user data from the 'users' collection.
     * @typedef {Object} UserData
     * @property {string} uid - The user ID.
     */

    const userData = await module.exports.getUser(db);

    return {
        ...obj,
        uid: userData.uid
    };
}
