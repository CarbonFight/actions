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
        actions1: false,
        actions2: false,
        actions3: false,
        actions4: false,
        actions5: false,
        '5periodics': false,
        sponsor1: false,
        sponsor2: false,
        sponsor3: false,
        sponsor4: false,
        streak1: false,
        streak2: false,
        streak3: false,
        display: false,
        target: false,
        delete: false,
    };
};
