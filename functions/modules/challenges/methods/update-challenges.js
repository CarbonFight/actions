const Logger = require('../../../logger-setup')
const { dbInstance } = require('../../../db-setup');
const { challengesList } = require("./validate-challenges");
const { calculateScore } = require("./calculate-score");

module.exports.updateChallenges = async function (statsObj, uid) {
    const updates = {};

    for (const [statKey, challenge] of Object.entries(challengesList)) {
        if (challenge.condition(statsObj) || statsObj[statKey] === true) {
            updates[statKey] = true;
        }
    }

    const [score, challengeObj] = calculateScore(statsObj, challengesList);

    const completedObject = {
        ...statsObj,
        ...challengeObj,
        score,
    };

    if (Object.keys(updates).length > 0) {
        const db = await dbInstance();
        const userChallenges = await db.collection('challenges').where('uid', '==', uid).limit(1).get();

        if (userChallenges?.docs?.[0]) {
            await userChallenges.docs[0].ref.update(completedObject);
        } else {
            Logger.error(`Can't update the challenge doc for user with uid: ${uid}`);
        }
    }
};
