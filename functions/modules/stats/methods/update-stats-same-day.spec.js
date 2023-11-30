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

        const newData = await getStatByUid(db, userData.uid)

        expect(newData).toBeTruthy();
    });

    test("Stats are updated after an action is added.", async () => {
        const wrapped = mockedFunctions.wrap(actionUpdate);
        const actionData = await setUserId(db, actionsData.metroTrip);

        await wrapped(await generateDocChange({
            db,
            path: actionPath,
            before: {},
            after: actionData
        }));

        const data = await getStatByUid(db, actionData.uid);

        expect(data).toMatchObject(statsData.statsAfterMetroTripActionAdded);
    });

    test("Stats are updated after an action is updated.", async () => {
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

        const data = await getStatByUid(db, actionData.uid);

        expect(data).toMatchObject(statsData.statsAfterMetroTripActionUpdated);
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

        const data = await getStatByUid(db, actionData.uid);

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

async function getStatByUid(db, uid) {
    const updatedUserStats = await db.collection('stats')
        .where('uid', '==', uid)
        .limit(1)
        .get();

    return updatedUserStats.docs.map( doc => doc.data())[0];
}
