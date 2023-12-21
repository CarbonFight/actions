exports.badgesList = {
    onboardingAllChallenges: {
        condition(challengeObj) {
            return (
                challengeObj.onboardingTransport &&
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
