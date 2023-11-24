/**
 * Retrieves a stats document from the database based on the given UID.
 *
 * @param {import('firebase').firestore.Firestore} db - The Firestore database instance.
 * @param {string} uid - The unique identifier (UID) to search for in the 'stats' collection.
 * @returns {Promise<import('firebase').firestore.DocumentSnapshot|null>} - A promise that resolves to the document snapshot of the found stats, or null if no matching stats are found.
 */
module.exports.getStatsByUid = async function(db, uid){
    const userStats = await db.collection('stats').where('uid', '==', uid).limit(1).get();
    return userStats?.docs?.[0] || null;
}
