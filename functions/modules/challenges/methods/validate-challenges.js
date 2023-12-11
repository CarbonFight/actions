exports.challengesList = {
    actionLvl1: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 10;
        },
    },
    actionLvl2: {
        score: 15,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 20;
        },
    },
    actionLvl3: {
        score: 30,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 50;
        },
    },
    actionLvl4: {
        score: 60,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 75;
        },
    },
    actionLvl5: {
        score: 100,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 100;
        },
    },
    '5periodics': {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsPeriodicCountTotal >= 5;
        },
    },
    onboardingTransport: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountTransport >= 1;
        },
    },
    onboardingServices: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountServices >= 1;
        },
    },
    onboardingObjects: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountObjects >= 1;
        },
    },
    onboardingLodging: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountLodging >= 1;
        },
    },
    onboardingFurniture: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountFurniture >= 1;
        },
    },
    onboardingFood: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountFood >= 1;
        },
    },
    onboardingDigital: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountDigital >= 1;
        },
    },
    onboardingClothes: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountClothes >= 1;
        },
    },
    onboardingAppliance: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountAppliance >= 1;
        },
    },
    hasEnoughSponsors: {
        score: 100,
        condition(statsObj) {
            return statsObj.sponsorshipCount >= 10;
        },
    },
    streak1: {
        score: 10,
        condition(statsObj) {
            return statsObj?.connectionStreak >= 7;
        },
    },
    streak2: {
        score: 50,
        condition(statsObj) {
            return statsObj?.connectionStreak >= 15;
        },
    },
    streak3: {
        score: 100,
        condition(statsObj) {
            return statsObj?.connectionStreak >= 30;
        },
    },
};
