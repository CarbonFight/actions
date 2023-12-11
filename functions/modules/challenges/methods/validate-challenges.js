exports.challengesList = {
    actions1: {
        score: 10,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 10;
        },
    },
    actions2: {
        score: 15,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 20;
        },
    },
    actions3: {
        score: 30,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 50;
        },
    },
    actions4: {
        score: 60,
        condition(statsObj) {
            return statsObj.actionsCountTotal >= 75;
        },
    },
    actions5: {
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
    sponsor1: {
        score: 20,
        condition(statsObj) {
            return statsObj.sponsorshipCount >= 1;
        },
    },
    sponsor2: {
        score: 50,
        condition(statsObj) {
            return statsObj.sponsorshipCount >= 5;
        },
    },
    sponsor3: {
        score: 100,
        condition(statsObj) {
            return statsObj.sponsorshipCount >= 10;
        },
    },
    sponsor4: {
        score: 200,
        condition(statsObj) {
            return statsObj.sponsorshipCount >= 20;
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
    display: {
        score: 50,
        condition(statsObj) {
            return statsObj?.eventUpdateDisplayNameCount >= 1;
        },
    },
    target: {
        score: 25,
        condition(statsObj) {
            return statsObj?.eventUpdateTargetCount >= 1;
        },
    },
    delete: {
        score: 20,
        condition(statsObj) {
            return statsObj?.eventActionDeleteCount >= 1;
        },
    },
};
