const actionsData = require('../data/actions.dataset');
const { createStatsModel } = require('../modules/stats/model');

const emptyStats = createStatsModel('');
delete emptyStats.uid;

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
        sponsorshipCount: 1,
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
        sponsorshipCount: 1,
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
