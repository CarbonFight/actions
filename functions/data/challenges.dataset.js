const {
    challengesList,
} = require('../modules/challenges/methods/validate-challenges');

const emptyChallenges = {};

for (const key in challengesList) {
    if (Object.hasOwnProperty.call(challengesList, key)) {
        emptyChallenges[key] = false;
    }
}

let totalScore = 0;

const completedChallenges = Object.fromEntries(
    Object.keys(emptyChallenges).map((key) => {
        const challenge = challengesList[key];
        totalScore += challenge.score;
        return [key, true];
    })
);

completedChallenges.score = totalScore;

module.exports = {
    allEmpty: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        ...emptyChallenges,
        score: 0,
    },
    allCompleted: {
        uid: 'tm8nhYrYSPFOKJgdonAt',
        ...completedChallenges,
        totalScore,
    },
};
