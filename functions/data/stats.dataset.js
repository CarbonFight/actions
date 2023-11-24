const actionsData= require("../data/actions.dataset");

const emptyOnboarding = {
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
}

const fullOnboarding = Object.fromEntries(Object.keys(emptyOnboarding).map(key => [key, true]));

const emptyStats = {
    score : 0,
    sponsorshipCount : 0,

    actionsCountTotal : 0,
    actionsPeriodicCountTotal : 0,
    actionsCountTransport : 0,
    actionsCountServices : 0,
    actionsCountObjects : 0,
    actionsCountLodging : 0,
    actionsCountFurniture : 0,
    actionsCountFood : 0,
    actionsCountDigital : 0,
    actionsCountClothes : 0,
    actionsCountAppliance : 0,

    eventActionAddCount : 0,
    eventActionUpdateCount : 0,
    eventActionDeleteCount : 0,
    eventUpdateTargetCount : 0,
    eventUpdateTeamCount : 0,

    weekTotalPerDay : [0],
    weekTotal : 0,
    weekTransport : 0,
    weekServices : 0,
    weekObjects : 0,
    weekLodging : 0,
    weekFurniture : 0,
    weekFood : 0,
    weekDigital : 0,
    weekClothes : 0,
    weekAppliance : 0,

    monthTotalPerDay : [0],
    // monthTotal : 0,
    monthTransport : 0,
    monthServices : 0,
    monthObjects : 0,
    monthLodging : 0,
    monthFurniture : 0,
    monthFood : 0,
    monthDigital : 0,
    monthClothes : 0,
    monthAppliance : 0,

    yearTotalPerDay : [],
    yearTotal : 0,
    yearTransport : 0,
    yearServices : 0,
    yearObjects : 0,
    yearLodging : 0,
    yearFurniture : 0,
    yearFood : 0,
    yearDigital : 0,
    yearClothes : 0,
    yearAppliance : 0,
}

module.exports = {
   emptyStats: {
       ...emptyStats,
       ...emptyOnboarding
   },
   statsWithManyActions: {
       ...emptyStats,
       ...emptyOnboarding,
       actionsCountTotal: 10
   },
    statsWithFullOnboarding: {
        ...emptyStats,
        ...fullOnboarding,
    },
    statsWithManyActionsAndFullOnboarding: {
        ...emptyStats,
        ...fullOnboarding,
        sponsorshipCount: 10,
        actionsCountTotal: 10
    },
    statsWithSponsorshipAndFullOnboarding: {
        ...emptyStats,
        ...fullOnboarding,
        sponsorshipCount: 10,
    },
    statsAfterMetroTripActionAdded: {
        ...emptyStats,
        eventActionAddCount: 1,
        actionsCountTransport:  1,
        // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
        weekTotal: actionsData.metroTrip.co2e,
        'weekTransport': actionsData.metroTrip.co2e,
        monthTotal: actionsData.metroTrip.co2e,
        'monthTransport': actionsData.metroTrip.co2e,
        yearTotal: actionsData.metroTrip.co2e,
        'yearTransport': actionsData.metroTrip.co2e,
    },
    statsAfterMetroTripActionUpdated: {
        ...emptyStats,
        eventActionAddCount: 1,
        actionsCountTransport:  1,
        // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
        weekTotal: actionsData.metroTrip.co2e + 10,
        'weekTransport': actionsData.metroTrip.co2e  + 10,
        monthTotal: actionsData.metroTrip.co2e  + 10,
        'monthTransport': actionsData.metroTrip.co2e  + 10,
        yearTotal: actionsData.metroTrip.co2e  + 10,
        'yearTransport': actionsData.metroTrip.co2e  + 10,
    },
    statsAfterMetroTripActionDeleted: {
        ...emptyStats,
        eventActionAddCount: 1,
        actionsCountTransport:  0,
        // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
        weekTotal: 0,
        'weekTransport': 0,
        monthTotal: 0,
        'monthTransport': 0,
        yearTotal: 0,
        'yearTransport': 0,
    }
}
