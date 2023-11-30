const Logger = require('../../../logger-setup');
const { challengesList } = require('./validate-challenges');
const { calculateScore } = require('./calculate-score');
const { getChallengeByUid } = require('./get-challenge-by-uid');

module.exports.updateChallenges = async function (db, uid, statsObj) {
    const updates = {};

    for (const [statKey, challenge] of Object.entries(challengesList)) {
        if (challenge.condition(statsObj) || statsObj[statKey] === true) {
            updates[statKey] = true;
        }
    }
    const challengeObjWithScore = await calculateScore(
        statsObj,
        challengesList
    );

    if (Object.keys(updates).length > 0) {
        const userChallenges = await getChallengeByUid(db, uid);

        if (userChallenges) {
            await userChallenges.ref.update(challengeObjWithScore);
        } else {
            Logger.error(
                `Can't update the challenge doc for user with uid: ${uid}`
            );
        }
    }
};
