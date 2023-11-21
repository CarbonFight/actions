exports.createChallengeModel = function (uid) {
    return {
        uid,
        hasEnoughSponsors: false,
        onboardingCompleted: false,
    };
};

exports.challengeMappings = {
    onboardingCompleted: function (data) {
        return data.onboardingTransport &&
            data.onboardingServices &&
            data.onboardingObjects &&
            data.onboardingLodging &&
            data.onboardingFurniture &&
            data.onboardingFood &&
            data.onboardingDigital &&
            data.onboardingClothes &&
            data.onboardingAppliance &&
            data.onboardingUpdateAction &&
            data.onboardingDeleteAction &&
            data.onboardingUpdateTarget &&
            data.onboardingUpdateTeam
    },
    hasEnoughSponsors: function (data){
        return false
    },
};
