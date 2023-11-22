const { dbInstance } = require('../../../db-setup');
const { challengesList } = require("./validate-challenges");

module.exports.updateChallenges = async function (newStats, uid) {
    const updates = {};

    for (const [statKey, condition] of Object.entries(challengesList)) {
        if(condition(newStats)){
            updates[statKey] = true
        }
    }

    const completedObject = {
        ...newStats,
        ...updates
    }

    if (Object.keys(updates).length > 0) {
        const db = await dbInstance();
        const userChallenges = await db.collection('challenges').where('uid', '==', uid).limit(1).get()

        await userChallenges.docs[0].ref.update(completedObject)
    }
};
