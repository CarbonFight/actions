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
    onboardingCompleted: {
        score: 10,
        condition: function (statsObj) {
            return (
                statsObj.onboardingTransport &&
                statsObj.onboardingServices &&
                statsObj.onboardingObjects &&
                statsObj.onboardingLodging &&
                statsObj.onboardingFurniture &&
                statsObj.onboardingFood &&
                statsObj.onboardingDigital &&
                statsObj.onboardingClothes &&
                statsObj.onboardingAppliance &&
                statsObj.onboardingUpdateAction &&
                statsObj.onboardingDeleteAction &&
                statsObj.onboardingUpdateTarget &&
                statsObj.onboardingUpdateTeam
            );
        },
    },
    hasEnoughSponsors: {
        score: 100,
        condition: function (statsObj) {
            return statsObj.sponsorshipCount >= 10;
        },
    },
    testStreak: {
        score: 1000,
        condition: function (statsObj) {
            console.log('===========================================================')
            return statsObj?.countConsecutiveDays >= 3;
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
