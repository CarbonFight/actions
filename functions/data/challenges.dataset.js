const { challengesList } = require("../modules/challenges/methods/validate-challenges");

const emptyChallenges = {
    actionLvl1: false,
    actionLvl2: false,
    actionLvl3: false,
    actionLvl4: false,
    actionLvl5: false,
    periodicActionLvl1: false,
    hasEnoughSponsors: false,
    onboardingCompleted: false,
    dayStreakLvl1: false,
    dayStreakLvl2: false,
    dayStreakLvl3: false,
}

let totalScore = 0;

const completedChallenges = Object.fromEntries(
    Object.keys(emptyChallenges).map(key => {
        const challenge = challengesList[key];
        totalScore += challenge.score;
        return [key, true];
    })
);

completedChallenges.score = totalScore;

module.exports = {
    allEmpty: {
        uid: "tm8nhYrYSPFOKJgdonAt",
        ...emptyChallenges,
        score: 0
    },
    allCompleted: {
        uid: "tm8nhYrYSPFOKJgdonAt",
        ...completedChallenges,
        totalScore
    },
}
