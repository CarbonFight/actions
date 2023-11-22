exports.challengesList = {
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
        return data.sponsorshipCount >= 10
    },
};
