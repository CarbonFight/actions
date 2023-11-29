/**
 * Retrieves a challenge from the database based on the given UID.
 *
 * @param {import('firebase').firestore.Firestore} db - The Firestore database instance.
 * @param {string} uid - The unique identifier (UID) to search for in the 'challenges' collection.
 * @returns {Promise<import('firebase').firestore.DocumentSnapshot|null>} - A promise that resolves to the document snapshot of the found challenge, or null if no matching challenge is found.
 */
module.exports.getChallengeByUid = async function(db, uid){
  const userChallenges = await db.collection('challenges').where('uid', '==', uid).limit(1).get();
  return userChallenges?.docs?.[0] || null;
}
