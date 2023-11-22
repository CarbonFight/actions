exports.createChallengeModel = function (uid) {
    return {
        uid,
        hasEnoughSponsors: false,
        onboardingCompleted: false,
    };
};
