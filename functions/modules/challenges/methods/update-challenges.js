const { dbInstance } = require('../../../db-setup');
const { challengeMappings } = require('../model');

module.exports.updateChallenges = async function (newStats, uid) {
    const updates = {};

    for (const [statKey, condition] of Object.entries(challengeMappings)) {
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

        let challengesList = await db.collection('challenges').get();
        challengesList = challengesList.docs.map(data => data.data())
        console.log(challengesList)

        await userChallenges.docs[0].ref.update(completedObject)
    }
};
