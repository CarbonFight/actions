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
        onboardingUpdateAction: false,
        onboardingDeleteAction: false,
        onboardingUpdateTarget: false,
        onboardingUpdateTeam: false,

        sponsor10: false,
    }
}

// object that maps fields in the 'stats' collection to corresponding actions in the 'challenges' collection
exports.challengeMappings = {
    // Onboarding challenges
    // If action count > 0, set challenge to true
    // Onboarding challenges never reset, even if count goes to 0.
    actionsCountTransport: [
        { key: 'onboardingTransport', condition: (count) => count > 0 },
    ],
    actionsCountServices: [
        { key: 'onboardingServices', condition: (count) => count > 0 },
    ],
    actionsCountObjects: [
        { key: 'onboardingObjects', condition: (count) => count > 0 },
    ],
    actionsCountLodging: [
        { key: 'onboardingLodging', condition: (count) => count > 0 },
    ],
    actionsCountFurniture: [
        { key: 'onboardingFurniture', condition: (count) => count > 0 },
    ],
    actionsCountFood: [
        { key: 'onboardingFood', condition: (count) => count > 0 },
    ],
    actionsCountDigital: [
        { key: 'onboardingDigital', condition: (count) => count > 0 },
    ],
    actionsCountClothes: [
        { key: 'onboardingClothes', condition: (count) => count > 0 },
    ],
    actionsCountAppliance: [
        { key: 'onboardingUpdateTarget', condition: (count) => count > 0 },
    ],
    eventUpdateCount: [
        { key: 'onboardingUpdateAction', condition: (count) => count > 0 },
    ],
    eventDeleteCount: [
        { key: 'onboardingDeleteAction', condition: (count) => count > 0 },
    ],
    eventUpdateTargetCount: [
        { key: 'onboardingUpdateTarget', condition: (count) => count > 0 },
    ],
    eventUpdateTeamCount: [
        { key: 'onboardingUpdateTeam', condition: (count) => count > 0 },
    ],
    // End of onboarding challenges

    // Sponsor challenges
    sponsorCount: [
        { key: 'sponsor10', condition: (count) => count >= 10 },
        // Add more condition for sponsorCount if needed, eg:
        //   { key: 'sponsor20', condition: count => count >= 20 }
    ],
    // End of sponsor challenges
}
