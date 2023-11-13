exports.validateChallengeModel = function(challengeObject){
    return true
}

exports.validateOnboardingChallenge = function(badgeObject){
    return badgeObject.onboardingTransport &&
        badgeObject.onboardingServices &&
        badgeObject.onboardingObjects &&
        badgeObject.onboardingLodging &&
        badgeObject.onboardingFurniture &&
        badgeObject.onboardingFood &&
        badgeObject.onboardingDigital &&
        badgeObject.onboardingClothes &&
        badgeObject.onboardingAppliance
}
