module.exports.calculateScore = function (challengesObj, challengesList) {
    let totalScore = 0;
    const challengeObj = {};

    for (const [key, challenge] of Object.entries(challengesList)) {
        const score = challenge.score;
        const condition = challenge.condition;

        const valid = condition(challengesObj);
        challengeObj[key] = valid;
        totalScore += valid ? score : 0;
    }

    return [totalScore, challengeObj];
};
