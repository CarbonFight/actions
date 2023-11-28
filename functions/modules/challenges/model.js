exports.createChallengeModel = function (uid) {
    return {
        uid,
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
    };
};
