const { generateUser } = require('../../../data/users.dataset');
const actionsData= require("../../../data/actions.dataset");
const statsData= require("../../../data/stats.dataset");
const { mockedFunctions, deleteCollectionsContent } = require("../../../tests/_setup");
const {
    init: initFunction,
    actionUpdate,
} = require("../index");
const { dbInstance } = require("../../../db-setup");
const { generateDocChange, generateDocSnapshot } = require("../../../tests/utils/change");
const { setUserId } = require("../../../tests/utils/user");
const dayjs = require("dayjs");
const {formatDateForDB} = require("../../../utils/dates");
const { getStatsDataByUid } = require("../methods/get-stats-by-uid");

const userData = generateUser();
const userPath = 'users/'+userData.uid
const actionPath = 'actions/'+actionsData.metroTrip.uid

describe("A stat is updated because of an action's date change (subtract).", () => {
    let db = null

    beforeAll(async () => {
        db = await dbInstance();
    });

    afterAll(() => {
        mockedFunctions.cleanup();
        db.terminate();
    });

    beforeEach(async () => {
        await deleteCollectionsContent(db, ['users', 'actions'])
        await db.doc(userPath).set(userData);
    });

    test("Stats is initialized after user is created", async () => {
        const wrapped = mockedFunctions.wrap(initFunction);

        await wrapped(await generateDocSnapshot({
            db,
            data: userData,
            path: userPath
        }))

        const newData = await getStatsDataByUid(db, userData.uid)

        expect(newData).toBeTruthy();
    });

    test("Stats are updated after an action is added.", async () => {
        const actionDateDBFormat = formatDateForDB(actionsData.metroTrip.created_time)
        const expectedData = {
            ...statsData.statsAfterMetroTripActionAdded,
            days: {
                [actionDateDBFormat]: actionsData.metroTrip.co2e
            },
            graphTotal: [
                0, 0,  0, 0, 0, 0, 0, 0, 0,
                0, 0,  0, 0, 0, 0, 0, 0, 0,
                0, 0,  0, 0, 0, 0, 0, 0, 0,
                0, 0, 20
            ]
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: {},
            after: actionData // Co2e = 20
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after an action is updated.", async () => {
        const actionDateDBFormat = formatDateForDB(actionsData.metroTrip.created_time)
        const expectedData = {
            ...statsData.statsAfterMetroTripActionUpdated,
            days: {
                [actionDateDBFormat]: 30
            },
            graphTotal: [
                0, 0,  0, 0, 0, 0, 0, 0, 0,
                0, 0,  0, 0, 0, 0, 0, 0, 0,
                0, 0,  0, 0, 0, 0, 0, 0, 0,
                0, 0, 30
            ]
        }
        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: actionData,
            after: {
                ...actionData,
                co2e: 30,
            }
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Same week).", async () => {
        const oldActionDateDBFormat = formatDateForDB(actionsData.metroTrip.created_time)
        const newActionDateDBFormat = formatDateForDB(dayjs(actionsData.metroTrip.created_time).subtract(4, 'day').toDate())
        const expectedData = {
            ...statsData.emptyStats,
            days: {
                [oldActionDateDBFormat]: 0,
                [newActionDateDBFormat]: 30
            },
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 1,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport,
            dayTotal: statsData.statsAfterMetroTripActionUpdated.dayTotal - (actionsData.metroTrip.co2e + 10), // 0
            dayTransport: statsData.statsAfterMetroTripActionUpdated.dayTransport - (actionsData.metroTrip.co2e + 10), // 0
            weekTotal: statsData.statsAfterMetroTripActionUpdated.weekTotal, // 30
            weekTransport: statsData.statsAfterMetroTripActionUpdated.weekTransport, // 30
            monthTotal: statsData.statsAfterMetroTripActionUpdated.monthTotal, // 30
            monthTransport: statsData.statsAfterMetroTripActionUpdated.monthTransport, // 30
            yearTotal: statsData.statsAfterMetroTripActionUpdated.yearTotal, // 30
            yearTransport: statsData.statsAfterMetroTripActionUpdated.yearTransport, // 30
            graphTotal: [
                0, 0, 0, 0, 0, 0, 0,  0, 0,
                0, 0, 0, 0, 0, 0, 0,  0, 0,
                0, 0, 0, 0, 0, 0, 0, 30, 0,
                0, 0, 0
            ]
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before:  {
                ...actionData,
                co2e: 30,
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(4, 'day').toDate(),
                co2e: 30,
            }
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    // TODO: add all "days" property for every test
    test("Stats are updated after a action's date is updated (same month).", async () => {
        const newCo2 = actionsData.metroTrip.co2e;
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 2,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport,
            dayTotal: statsData.statsAfterMetroTripActionUpdated.dayTotal - (actionsData.metroTrip.co2e + 10), // 0
            dayTransport: statsData.statsAfterMetroTripActionUpdated.dayTransport - (actionsData.metroTrip.co2e + 10), // 0
            weekTotal: statsData.statsAfterMetroTripActionUpdated.weekTotal - (actionsData.metroTrip.co2e + 10), // 0
            weekTransport: statsData.statsAfterMetroTripActionUpdated.weekTransport - (actionsData.metroTrip.co2e + 10), // 0
            monthTotal: statsData.statsAfterMetroTripActionUpdated.monthTotal - 10, // 20
            monthTransport: statsData.statsAfterMetroTripActionUpdated.monthTransport - 10, // 20
            yearTotal: statsData.statsAfterMetroTripActionUpdated.yearTotal - 10, // 20
            yearTransport: statsData.statsAfterMetroTripActionUpdated.yearTransport - 10, // 20
            graphTotal: [
                0, 0, 0, 0,  0, 0, 0, 0, 0,
                0, 0, 0, 0,  0, 0, 0, 0, 0,
                0, 0, 0, 0, 20, 0, 0, 0, 0,
                0, 0, 0
            ]
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before:  {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(4, 'day').toDate(),
                co2e: 30,
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'week').toDate(),
                co2e: newCo2,
            }
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (same year).", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 3,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport,
            dayTotal: statsData.statsAfterMetroTripActionUpdated.dayTotal - (actionsData.metroTrip.co2e + 10),
            dayTransport: statsData.statsAfterMetroTripActionUpdated.dayTransport - (actionsData.metroTrip.co2e + 10),
            weekTotal: statsData.statsAfterMetroTripActionUpdated.weekTotal - (actionsData.metroTrip.co2e + 10),
            weekTransport: statsData.statsAfterMetroTripActionUpdated.weekTransport - (actionsData.metroTrip.co2e + 10),
            monthTotal: statsData.statsAfterMetroTripActionUpdated.monthTotal - (actionsData.metroTrip.co2e + 10),
            monthTransport: statsData.statsAfterMetroTripActionUpdated.monthTransport - (actionsData.metroTrip.co2e + 10),
            yearTotal: statsData.statsAfterMetroTripActionUpdated.yearTotal,
            yearTransport: statsData.statsAfterMetroTripActionUpdated.yearTransport,
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before:  {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'week').toDate(),
                co2e: 20,
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'month').toDate(),
                co2e: 30,
            }
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after an action is deleted.", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal - 1,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 3,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport - 1,
            eventActionDeleteCount: statsData.statsAfterMetroTripActionUpdated.eventActionDeleteCount + 1,
            dayTotal: statsData.statsAfterMetroTripActionUpdated.dayTotal - (actionsData.metroTrip.co2e + 10),
            dayTransport: statsData.statsAfterMetroTripActionUpdated.dayTransport - (actionsData.metroTrip.co2e + 10),
            weekTotal: statsData.statsAfterMetroTripActionUpdated.weekTotal - (actionsData.metroTrip.co2e + 10),
            weekTransport: statsData.statsAfterMetroTripActionUpdated.weekTransport - (actionsData.metroTrip.co2e + 10),
            monthTotal: statsData.statsAfterMetroTripActionUpdated.monthTotal - (actionsData.metroTrip.co2e + 10),
            monthTransport: statsData.statsAfterMetroTripActionUpdated.monthTransport - (actionsData.metroTrip.co2e + 10),
            yearTotal: statsData.statsAfterMetroTripActionUpdated.yearTotal - (actionsData.metroTrip.co2e + 10),
            yearTransport: statsData.statsAfterMetroTripActionUpdated.yearTransport - (actionsData.metroTrip.co2e + 10),
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'month').toDate(),
                co2e: 30,
            },
            after: {}
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    // TODO: Add more test
    // test("Stats are removed after a user is deleted.", async () => {
    //     const wrapped = mockedFunctions.wrap(userDelete);
    //
    //     await wrapped(await generateDocSnapshot({
    //         db,
    //         data: userData,
    //         path: userPath
    //     }))
    //
    //     let newStat = await db.doc(userPath).get();
    //
    //     console.log(newStat);
    //
    //     expect(data).toMatchObject(statsData.statsAfterMetroTripActionAdded);
    // });
});
