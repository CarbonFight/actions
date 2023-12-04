exports.createChallengeModel = function (uid) {
    return {
        uid,
        onboardingTransport: false,
        onboardingServices: false,
        onboardingObjects: false,
        onboardingLodging: false,
        onboardingFurniture: false,
        onboardingFood: false,
        onboardingDigital: false,
        onboardingClothes: false,
        onboardingAppliance: false,
        actionLvl1: false,
        actionLvl2: false,
        actionLvl3: false,
        actionLvl4: false,
        actionLvl5: false,
        periodicActionLvl1: false,
        hasEnoughSponsors: false,
        dayStreakLvl1: false,
        dayStreakLvl2: false,
        dayStreakLvl3: false,
    };
};
