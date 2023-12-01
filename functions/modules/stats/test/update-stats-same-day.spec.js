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
const { getStatsDataByUid } = require("../methods/get-stats-by-uid");

const userData = generateUser();
const userPath = 'users/'+userData.uid
const actionPath = 'actions/'+actionsData.metroTrip.uid

describe("A stat is updated because of an action change.", () => {
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
        const expectedData = {
            ...statsData.statsAfterMetroTripActionAdded,
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
            after: actionData
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(expectedData);
    });

    test("Stats are updated after an action is updated.", async () => {
        const expectedData = {
            ...statsData.statsAfterMetroTripActionUpdated,
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

    test("Stats are updated after an action is deleted.", async () => {
        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: {
                ...actionData,
                co2e: 30,
            },
            after: {}
        }));

        const data = await getStatsDataByUid(db, actionData.uid);

        expect(data).toMatchObject(statsData.statsAfterMetroTripActionDeleted);
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
