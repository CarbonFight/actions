exports.badgesList = {
    onboardingHowtoFinished: {
        condition(challengeObj) {
            return false;
        },
    },
    onboardingAllChallenges: {
        condition(challengeObj) {
            return (
                challengeObj.onboardingTransport &&
                challengeObj.onboardingServices &&
                challengeObj.onboardingObjects &&
                challengeObj.onboardingLodging &&
                challengeObj.onboardingFurniture &&
                challengeObj.onboardingFood &&
                challengeObj.onboardingDigital &&
                challengeObj.onboardingClothes &&
                challengeObj.onboardingAppliance
            );
        },
    },
};
