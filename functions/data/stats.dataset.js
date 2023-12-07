const actionsData = require('../data/actions.dataset');

const emptyStats = {
    score: 0,
    sponsorshipCount: 0,
    countConsecutiveDays: 1,

    actionsCountTotal: 0,
    actionsPeriodicCountTotal: 0,

    actionsCountTransport: 0,
    actionsCountServices: 0,
    actionsCountObjects: 0,
    actionsCountLodging: 0,
    actionsCountFurniture: 0,
    actionsCountFood: 0,
    actionsCountDigital: 0,
    actionsCountClothes: 0,
    actionsCountAppliance: 0,

    eventActionAddCount: 0,
    eventActionUpdateCount: 0,
    eventActionDeleteCount: 0,
    eventUpdateTargetCount: 0,
    eventUpdateTeamCount: 0,

    days: {},
    graphTotal: [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0,
    ],

    dayTotal: 0,
    dayTransport: 0,
    dayServices: 0,
    dayObjects: 0,
    dayLodging: 0,
    dayFurniture: 0,
    dayFood: 0,
    dayDigital: 0,
    dayClothes: 0,
    dayAppliance: 0,

    weekTotal: 0,
    weekTransport: 0,
    weekServices: 0,
    weekObjects: 0,
    weekLodging: 0,
    weekFurniture: 0,
    weekFood: 0,
    weekDigital: 0,
    weekClothes: 0,
    weekAppliance: 0,

    monthTotal: 0,
    monthTransport: 0,
    monthServices: 0,
    monthObjects: 0,
    monthLodging: 0,
    monthFurniture: 0,
    monthFood: 0,
    monthDigital: 0,
    monthClothes: 0,
    monthAppliance: 0,

    yearTotal: 0,
    yearTransport: 0,
    yearServices: 0,
    yearObjects: 0,
    yearLodging: 0,
    yearFurniture: 0,
    yearFood: 0,
    yearDigital: 0,
    yearClothes: 0,
    yearAppliance: 0,
};

const statsAfterMetroTripActionAdded = {
    ...emptyStats,
    actionsCountTotal: emptyStats.actionsCountTotal + 1,
    eventActionAddCount: emptyStats.eventActionAddCount + 1,
    actionsCountTransport: emptyStats.actionsCountTransport + 1,
    dayTotal: emptyStats.dayTotal + actionsData.metroTrip.co2e,
    dayTransport: emptyStats.dayTransport + actionsData.metroTrip.co2e,
    weekTotal: emptyStats.weekTotal + actionsData.metroTrip.co2e,
    weekTransport: emptyStats.weekTransport + actionsData.metroTrip.co2e,
    monthTotal: emptyStats.monthTotal + actionsData.metroTrip.co2e,
    monthTransport: emptyStats.monthTransport + actionsData.metroTrip.co2e,
    yearTotal: emptyStats.yearTotal + actionsData.metroTrip.co2e,
    yearTransport: emptyStats.yearTransport + actionsData.metroTrip.co2e,
};

const statsAfterMetroTripActionUpdated = {
    ...emptyStats,
    actionsCountTotal: statsAfterMetroTripActionAdded.actionsCountTotal,
    eventActionAddCount: statsAfterMetroTripActionAdded.eventActionAddCount,
    eventActionUpdateCount:
        statsAfterMetroTripActionAdded.eventActionUpdateCount + 1,
    actionsCountTransport: statsAfterMetroTripActionAdded.actionsCountTransport,
    // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
    dayTotal: statsAfterMetroTripActionAdded.dayTotal + 10,
    dayTransport: statsAfterMetroTripActionAdded.dayTransport + 10,
    weekTotal: statsAfterMetroTripActionAdded.weekTotal + 10,
    weekTransport: statsAfterMetroTripActionAdded.weekTransport + 10,
    monthTotal: statsAfterMetroTripActionAdded.monthTotal + 10,
    monthTransport: statsAfterMetroTripActionAdded.monthTransport + 10,
    yearTotal: statsAfterMetroTripActionAdded.yearTotal + 10,
    yearTransport: statsAfterMetroTripActionAdded.yearTransport + 10,
};

const statsAfterMetroTripActionDeleted = {
    ...emptyStats,
    actionsCountTotal: statsAfterMetroTripActionUpdated.actionsCountTotal - 1,
    eventActionAddCount: statsAfterMetroTripActionUpdated.eventActionAddCount,
    eventActionUpdateCount:
        statsAfterMetroTripActionUpdated.eventActionUpdateCount,
    actionsCountTransport:
        statsAfterMetroTripActionUpdated.actionsCountTransport - 1,
    eventActionDeleteCount:
        statsAfterMetroTripActionUpdated.eventActionDeleteCount + 1,
    // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
    dayTotal:
        statsAfterMetroTripActionUpdated.dayTotal -
        (actionsData.metroTrip.co2e + 10),
    dayTransport:
        statsAfterMetroTripActionUpdated.dayTransport -
        (actionsData.metroTrip.co2e + 10),
    weekTotal:
        statsAfterMetroTripActionUpdated.weekTotal -
        (actionsData.metroTrip.co2e + 10),
    weekTransport:
        statsAfterMetroTripActionUpdated.weekTransport -
        (actionsData.metroTrip.co2e + 10),
    monthTotal:
        statsAfterMetroTripActionUpdated.monthTotal -
        (actionsData.metroTrip.co2e + 10),
    monthTransport:
        statsAfterMetroTripActionUpdated.monthTransport -
        (actionsData.metroTrip.co2e + 10),
    yearTotal:
        statsAfterMetroTripActionUpdated.yearTotal -
        (actionsData.metroTrip.co2e + 10),
    yearTransport:
        statsAfterMetroTripActionUpdated.yearTransport -
        (actionsData.metroTrip.co2e + 10),
};

module.exports = {
    emptyStats,
    statsWithManyActions: {
        ...emptyStats,
        actionsCountTotal: 10,
    },
    statsWithFullOnboarding: {
        ...emptyStats,
        actionsCountTransport: 1,
        actionsCountServices: 1,
        actionsCountObjects: 1,
        actionsCountLodging: 1,
        actionsCountFurniture: 1,
        actionsCountFood: 1,
        actionsCountDigital: 1,
        actionsCountClothes: 1,
        actionsCountAppliance: 1,
    },
    statsWithManyActionsAndFullOnboarding: {
        ...emptyStats,
        sponsorshipCount: 10,
        actionsCountTotal: 10,
        actionsCountTransport: 1,
        actionsCountServices: 1,
        actionsCountObjects: 1,
        actionsCountLodging: 1,
        actionsCountFurniture: 1,
        actionsCountFood: 1,
        actionsCountDigital: 1,
        actionsCountClothes: 1,
        actionsCountAppliance: 1,
    },
    statsWithSponsorshipAndFullOnboarding: {
        ...emptyStats,
        sponsorshipCount: 10,
        actionsCountTransport: 1,
        actionsCountServices: 1,
        actionsCountObjects: 1,
        actionsCountLodging: 1,
        actionsCountFurniture: 1,
        actionsCountFood: 1,
        actionsCountDigital: 1,
        actionsCountClothes: 1,
        actionsCountAppliance: 1,
    },
    statsAfterMetroTripActionAdded,
    statsAfterMetroTripActionUpdated,
    statsAfterMetroTripActionDeleted,
};
