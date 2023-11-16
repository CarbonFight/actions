/**
 * Sets the user ID in the provided object using data from the 'users' collection in the database.
 *
 * @param {FirebaseFirestore} db - The Firestore database instance.
 * @param {Object} obj - The object to which the user ID will be added.
 * @returns {Promise<Object>} A promise that resolves to the modified object with the 'userId' property.
 * @throws {Error} Throws an error if there is an issue accessing the 'users' collection or retrieving the user ID.
 */
module.exports.setUserId = async function(db, obj){
    const users = await db.collection('users').limit(1).get()

    return {
        ...obj,
        userId: users.docs[0].data().uid
    }
}
