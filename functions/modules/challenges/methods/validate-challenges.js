exports.challengesList = {
    actionLvl1: {
        score: 10,
        condition: function (data) {
            return data.actionsCountTotal >= 10;
        },
    },
    actionLvl2: {
        score: 15,
        condition: function (data) {
            return data.actionsCountTotal >= 20;
        },
    },
    actionLvl3: {
        score: 30,
        condition: function (data) {
            return data.actionsCountTotal >= 50;
        },
    },
    actionLvl4: {
        score: 60,
        condition: function (data) {
            return data.actionsCountTotal >= 75;
        },
    },
    actionLvl5: {
        score: 100,
        condition: function (data) {
            return data.actionsCountTotal >= 100;
        },
    },
    periodicActionLvl1: {
        score: 10,
        condition: function (data) {
            return data.actionsPeriodicCountTotal >= 3;
        },
    },
    onboardingCompleted: {
        score: 10,
        condition: function (data) {
            return (
                data.onboardingTransport &&
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
            );
        },
    },
    hasEnoughSponsors: {
        score: 100,
        condition: function (data) {
            return data.sponsorshipCount >= 10;
        },
    },
};
