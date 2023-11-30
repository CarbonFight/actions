const { generateUser } = require('../../../data/users.dataset');
const actionsData= require("../../../data/actions.dataset");
const statsData= require("../../../data/stats.dataset");
const { mockedFunctions, deleteCollectionsContent } = require("../../../tests/_setup");
const {
    init: initFunction,
    actionUpdate,
} = require("../../stats");
const { dbInstance } = require("../../../db-setup");
const { generateDocChange, generateDocSnapshot } = require("../../../tests/utils/change");
const { setUserId } = require("../../../tests/utils/user");
const dayjs = require("dayjs");

const userData = generateUser();
const userPath = 'users/'+userData.uid
const actionPath = 'actions/'+actionsData.metroTrip.uid

describe("A stat is updated because of an action's date change (Add).", () => {
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

        const newData = await getStatByUid(db, userData.uid)

        expect(newData).toBeTruthy();
    });

    test("Stats are updated after an action is added.", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.emptyStats.actionsCountTotal + 1,
            eventActionAddCount: statsData.emptyStats.eventActionAddCount + 1,
            actionsCountTransport: statsData.emptyStats.actionsCountTransport + 1,
            yearTotal: statsData.emptyStats.yearTotal + actionsData.metroTrip.co2e,
            yearTransport: statsData.emptyStats.yearTransport + actionsData.metroTrip.co2e,
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: {},
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'month').toDate(),
            }
        }));

        const data = await getStatByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after an action is updated.", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.emptyStats.actionsCountTotal + 1,
            eventActionAddCount: statsData.emptyStats.eventActionAddCount + 1,
            actionsCountTransport: statsData.emptyStats.actionsCountTransport + 1,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount,
            yearTotal: statsData.emptyStats.yearTotal + actionsData.metroTrip.co2e + 10,
            yearTransport: statsData.emptyStats.yearTransport + actionsData.metroTrip.co2e + 10,
        };

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'month').toDate(),
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'month').toDate(),
                co2e: 30,
            }
        }));

        const data = await getStatByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Current month).", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 1,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport,
            monthTotal: statsData.emptyStats.monthTotal + actionsData.metroTrip.co2e + 10,
            monthTransport: statsData.emptyStats.monthTransport + actionsData.metroTrip.co2e + 10,
            yearTotal: statsData.emptyStats.yearTotal + actionsData.metroTrip.co2e + 10,
            yearTransport: statsData.emptyStats.yearTransport + actionsData.metroTrip.co2e + 10,
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before:  {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'month').toDate(),
                co2e: 30,
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'week').toDate(),
                co2e: 30,
            }
        }));

        const data = await getStatByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Current Week).", async () => {
        const newCo2e = 20
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 2,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport,
            weekTotal:  statsData.emptyStats.weekTotal + newCo2e,
            weekTransport:  statsData.emptyStats.weekTotal + newCo2e,
            monthTotal: statsData.emptyStats.monthTotal + newCo2e,
            monthTransport: statsData.emptyStats.monthTotal + newCo2e,
            yearTotal: statsData.emptyStats.yearTotal + newCo2e,
            yearTransport: statsData.emptyStats.yearTransport + newCo2e,
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before:  {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'week').toDate(),
                co2e: 30,
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'day').toDate(),
                co2e: newCo2e,
            }
        }));

        const data = await getStatByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after a action's date is updated (Current day).", async () => {
        const expectedData = {
            ...statsData.emptyStats,
            actionsCountTotal : statsData.statsAfterMetroTripActionUpdated.actionsCountTotal,
            eventActionAddCount: statsData.statsAfterMetroTripActionUpdated.eventActionAddCount,
            eventActionUpdateCount: statsData.statsAfterMetroTripActionUpdated.eventActionUpdateCount + 3,
            actionsCountTransport: statsData.statsAfterMetroTripActionUpdated.actionsCountTransport,
            // ['days.' + action.created_time]:  actionsData.metroTrip.co2e,
            dayTotal: statsData.emptyStats.dayTotal + actionsData.metroTrip.co2e + 10,
            dayTransport: statsData.emptyStats.dayTransport + actionsData.metroTrip.co2e + 10,
            weekTotal: statsData.emptyStats.weekTotal + actionsData.metroTrip.co2e + 10,
            weekTransport: statsData.emptyStats.weekTransport + actionsData.metroTrip.co2e + 10,
            monthTotal: statsData.emptyStats.monthTotal + actionsData.metroTrip.co2e + 10,
            monthTransport: statsData.emptyStats.monthTransport + actionsData.metroTrip.co2e + 10,
            yearTotal: statsData.emptyStats.yearTotal + actionsData.metroTrip.co2e + 10,
            yearTransport: statsData.emptyStats.yearTransport + actionsData.metroTrip.co2e + 10,
        }

        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before:  {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).subtract(1, 'day').toDate(),
                co2e: 20,
            },
            after: {
                ...actionData,
                created_time: dayjs(actionsData.metroTrip.created_time).toDate(),
                co2e: 30,
            }
        }));

        const data = await getStatByUid(db, actionData.uid);

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
                created_time: dayjs(actionsData.metroTrip.created_time).toDate(),
                co2e: 30,
            },
            after: {}
        }));

        const data = await getStatByUid(db, actionData.uid);

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

async function getStatByUid(db, uid) {
    const updatedUserStats = await db.collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    return updatedUserStats.docs.map( doc => doc.data())[0];
}
