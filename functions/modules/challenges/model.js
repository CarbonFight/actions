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
        '5periodics': false,
        hasEnoughSponsors: false,
        streak1: false,
        streak2: false,
        streak3: false,
    };
};
