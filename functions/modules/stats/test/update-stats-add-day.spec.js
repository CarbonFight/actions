const { generateUser } = require('../../../data/users.dataset');
const actionsData = require('../../../data/actions.dataset');
const statsData = require('../../../data/stats.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { init: initFunction, actionUpdate } = require('../index');
const { dbInstance } = require('../../../db-setup');
const {
    generateDocChange,
    generateDocSnapshot,
} = require('../../../tests/utils/change');
const { setUserId } = require('../../../tests/utils/user');
const dayjs = require('dayjs');
const { getStatsDataByUid } = require('../methods/get-stats-by-uid');

const userData = generateUser();
const userPath = 'users/' + userData.uid;
const actionPath = 'actions/' + actionsData.metroTrip.uid;

describe("A stat is updated because of an action's date change (Add).", () => {
    let db = null;

    beforeAll(async () => {
        db = await dbInstance();
    });

    afterAll(() => {
        mockedFunctions.cleanup();
        db.terminate();
    });

    beforeEach(async () => {
        await deleteCollectionsContent(db, ['users', 'actions']);
        await db.doc(userPath).set(userData);
    });

    test('Stats is initialized after user is created', async () => {
        const wrapped = mockedFunctions.wrap(initFunction);

        await wrapped(
            await generateDocSnapshot({
                db,
                data: userData,
                path: userPath,
            })
        );

        const newData = await getStatsDataByUid(db, userData.uid);

        expect(newData).toBeTruthy();
    });

    test('Stats are updated after an action is added.', async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal: statsData.emptyStats.actionsCountTotal + 1,
            eventActionAddCount: statsData.emptyStats.eventActionAddCount + 1,
            actionsCountTransport:
                statsData.emptyStats.actionsCountTransport + 1,
            monthTotal:
                statsData.emptyStats.monthTotal + actionsData.metroTrip.co2e,
            monthTransport:
                statsData.emptyStats.monthTransport +
                actionsData.metroTrip.co2e,
            yearTotal:
                statsData.emptyStats.yearTotal + actionsData.metroTrip.co2e,
            yearTransport:
                statsData.emptyStats.yearTransport + actionsData.metroTrip.co2e,
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {},
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'month')
                        .toDate(),
                },
            })
        );

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test('Stats are updated after an action is updated.', async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal: statsData.emptyStats.actionsCountTotal + 1,
            eventActionAddCount: statsData.emptyStats.eventActionAddCount + 1,
            actionsCountTransport:
                statsData.emptyStats.actionsCountTransport + 1,
            eventActionUpdateCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionUpdateCount,
            monthTotal:
                statsData.emptyStats.monthTotal +
                actionsData.metroTrip.co2e +
                10,
            monthTransport:
                statsData.emptyStats.monthTransport +
                actionsData.metroTrip.co2e +
                10,
            yearTotal:
                statsData.emptyStats.yearTotal +
                actionsData.metroTrip.co2e +
                10,
            yearTransport:
                statsData.emptyStats.yearTransport +
                actionsData.metroTrip.co2e +
                10,
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'month')
                        .toDate(),
                },
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'month')
                        .toDate(),
                    co2e: 30,
                },
            })
        );

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Current month).", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal:
                statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount:
                statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionUpdateCount + 1,
            actionsCountTransport:
                statsData.statsAfterMetroTripActionUpdated
                    .actionsCountTransport,
            monthTotal:
                statsData.emptyStats.monthTotal +
                actionsData.metroTrip.co2e +
                10,
            monthTransport:
                statsData.emptyStats.monthTransport +
                actionsData.metroTrip.co2e +
                10,
            yearTotal:
                statsData.emptyStats.yearTotal +
                actionsData.metroTrip.co2e +
                10,
            yearTransport:
                statsData.emptyStats.yearTransport +
                actionsData.metroTrip.co2e +
                10,
            graphTotal: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 30, 0, 0, 0, 0, 0, 0, 0,
            ],
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'month')
                        .toDate(),
                    co2e: 30,
                },
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'week')
                        .toDate(),
                    co2e: 30,
                },
            })
        );

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Current Week).", async () => {
        const newCo2e = 20;
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal:
                statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount:
                statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionUpdateCount + 2,
            actionsCountTransport:
                statsData.statsAfterMetroTripActionUpdated
                    .actionsCountTransport,
            weekTotal: statsData.emptyStats.weekTotal + newCo2e,
            weekTransport: statsData.emptyStats.weekTotal + newCo2e,
            monthTotal: statsData.emptyStats.monthTotal + newCo2e,
            monthTransport: statsData.emptyStats.monthTotal + newCo2e,
            yearTotal: statsData.emptyStats.yearTotal + newCo2e,
            yearTransport: statsData.emptyStats.yearTransport + newCo2e,
            graphTotal: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 20, 0,
            ],
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'week')
                        .toDate(),
                    co2e: 30,
                },
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'day')
                        .toDate(),
                    co2e: newCo2e,
                },
            })
        );

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Current day).", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal:
                statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount:
                statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionUpdateCount + 3,
            actionsCountTransport:
                statsData.statsAfterMetroTripActionUpdated
                    .actionsCountTransport,
            // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
            dayTotal:
                statsData.emptyStats.dayTotal + actionsData.metroTrip.co2e + 10,
            dayTransport:
                statsData.emptyStats.dayTransport +
                actionsData.metroTrip.co2e +
                10,
            weekTotal:
                statsData.emptyStats.weekTotal +
                actionsData.metroTrip.co2e +
                10,
            weekTransport:
                statsData.emptyStats.weekTransport +
                actionsData.metroTrip.co2e +
                10,
            monthTotal:
                statsData.emptyStats.monthTotal +
                actionsData.metroTrip.co2e +
                10,
            monthTransport:
                statsData.emptyStats.monthTransport +
                actionsData.metroTrip.co2e +
                10,
            yearTotal:
                statsData.emptyStats.yearTotal +
                actionsData.metroTrip.co2e +
                10,
            yearTransport:
                statsData.emptyStats.yearTransport +
                actionsData.metroTrip.co2e +
                10,
            graphTotal: [
                0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 0, 0, 0, 0, 0, 0, 0, 30,
            ],
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(1, 'day')
                        .toDate(),
                    co2e: 20,
                },
                after: {
                    ...actionData,
                    created_time: dayjs(
                        actionsData.metroTrip.created_time
                    ).toDate(),
                    co2e: 30,
                },
            })
        );

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test('Create multiple actions to fill graph', async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal:
                statsData.statsAfterMetroTripActionUpdated.actionsCountTotal +
                4,
            eventActionAddCount:
                statsData.statsAfterMetroTripActionUpdated.eventActionAddCount +
                4,
            eventActionUpdateCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionUpdateCount + 3,
            actionsCountTransport:
                statsData.statsAfterMetroTripActionUpdated
                    .actionsCountTransport + 4,
            dayTotal:
                statsData.emptyStats.dayTotal + actionsData.metroTrip.co2e + 10,
            dayTransport:
                statsData.emptyStats.dayTransport +
                actionsData.metroTrip.co2e +
                10,
            weekTotal: 300,
            weekTransport: 300,
            monthTotal: 355,
            monthTransport: 355,
            yearTotal: 355,
            yearTransport: 355,
            graphTotal: [
                0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 15, 0, 254, 0, 16, 0, 0, 30,
            ],
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {},
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(3, 'day')
                        .toDate(),
                    co2e: 16,
                },
            })
        );

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {},
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(5, 'day')
                        .toDate(),
                    co2e: 254,
                },
            })
        );

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {},
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(7, 'day')
                        .toDate(),
                    co2e: 15,
                },
            })
        );

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {},
                after: {
                    ...actionData,
                    created_time: dayjs(actionsData.metroTrip.created_time)
                        .subtract(24, 'day')
                        .toDate(),
                    co2e: 40,
                },
            })
        );

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test('Stats are updated after an action is deleted.', async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal: 5 - 1,
            eventActionAddCount: 5,
            eventActionUpdateCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionUpdateCount + 3,
            actionsCountTransport: 5 - 1,
            eventActionDeleteCount:
                statsData.statsAfterMetroTripActionUpdated
                    .eventActionDeleteCount + 1,
            dayTotal:
                statsData.statsAfterMetroTripActionUpdated.dayTotal -
                (actionsData.metroTrip.co2e + 10),
            dayTransport:
                statsData.statsAfterMetroTripActionUpdated.dayTransport -
                (actionsData.metroTrip.co2e + 10),
            weekTotal: 270,
            weekTransport: 270,
            monthTotal: 325,
            monthTransport: 325,
            yearTotal: 325,
            yearTransport: 325,
            graphTotal: [
                0, 0, 0, 0, 0, 40, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
                0, 15, 0, 254, 0, 16, 0, 0, 0,
            ],
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: {
                    ...actionData,
                    created_time: dayjs(
                        actionsData.metroTrip.created_time
                    ).toDate(),
                    co2e: 30,
                },
                after: {},
            })
        );

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
