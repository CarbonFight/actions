exports.challengesList = {
    actionLvl1: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountTotal >= 10;
        },
    },
    actionLvl2: {
        score: 15,
        condition: function (statsObj) {
            return statsObj.actionsCountTotal >= 20;
        },
    },
    actionLvl3: {
        score: 30,
        condition: function (statsObj) {
            return statsObj.actionsCountTotal >= 50;
        },
    },
    actionLvl4: {
        score: 60,
        condition: function (statsObj) {
            return statsObj.actionsCountTotal >= 75;
        },
    },
    actionLvl5: {
        score: 100,
        condition: function (statsObj) {
            return statsObj.actionsCountTotal >= 100;
        },
    },
    periodicActionLvl1: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsPeriodicCountTotal >= 3;
        },
    },
    onboardingTransport: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountTransport >= 1;
        },
    },
    onboardingServices: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountServices >= 1;
        },
    },
    onboardingObjects: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountObjects >= 1;
        },
    },
    onboardingLodging: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountLodging >= 1;
        },
    },
    onboardingFurniture: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountFurniture >= 1;
        },
    },
    onboardingFood: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountFood >= 1;
        },
    },
    onboardingDigital: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountDigital >= 1;
        },
    },
    onboardingClothes: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountClothes >= 1;
        },
    },
    onboardingAppliance: {
        score: 10,
        condition: function (statsObj) {
            return statsObj.actionsCountAppliance >= 1;
        },
    },
    hasEnoughSponsors: {
        score: 100,
        condition: function (statsObj) {
            return statsObj.sponsorshipCount >= 10;
        },
    },
    dayStreakLvl1: {
        score: 10,
        condition: function (statsObj) {
            return statsObj?.countConsecutiveDays >= 7;
        },
    },
    dayStreakLvl2: {
        score: 50,
        condition: function (statsObj) {
            return statsObj?.countConsecutiveDays >= 15;
        },
    },
    dayStreakLvl3: {
        score: 100,
        condition: function (statsObj) {
            return statsObj?.countConsecutiveDays >= 30;
        },
    },
};
