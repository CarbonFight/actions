const usersData= require("../../data/users.dataset");
const actionsData= require("../../data/actions.dataset");
const mockLogger = require("../../logger-setup");
const { mockedFunctions, setup, deleteCollectionsContent } = require("../_setup");
const { generateDocChange, generateDocSnapshot} = require("../utils/change");
const { slightlyMutate } = require("../utils/mutate");

const {
    create: createFunction,
    delete: deleteFunction,
    update: updateFunction
} = require("../../modules/actions");

const { setUserId } = require("../utils/user");
const { generateDeletedDocSnapshot } = require("../utils/delete");

jest.mock('../../modules/stats/methods/update-stats', () => ({
    updateStats: jest.fn().mockImplementation((obj) => {
        mockLogger.info('Method `updateStats` has been called with object: '+JSON.stringify(obj))
    }),
}));

const userPath = 'users/'+usersData[0].uid
const actionPath = 'actions/'+actionsData.metroTrip.uid

describe("A function is triggered by an action", () => {
    let db = null

    beforeAll(async () => {
        db = await setup()
    });

    afterAll(() => {
        mockedFunctions.cleanup()
        db.terminate()
    })

    beforeEach(async () => {
        await deleteCollectionsContent(db, ['users', 'actions'])
        await db.doc(userPath).set(usersData[0]);
        await db.doc(actionPath).set(actionsData.metroTrip);
    });

    test("An action is correctly created.", async () => {
        const wrapped = mockedFunctions.wrap(createFunction);

        const actionObject = await setUserId(db, actionsData.metroTrip)

        await wrapped(generateDocSnapshot({
            data: actionObject,
            path: actionPath
        }))

        let newData = await db.doc(actionPath).get();
        newData = newData.data()

        expect(require("../../modules/stats/methods/update-stats").updateStats).toHaveBeenCalled();
        expect(newData).toBeTruthy();
    });

    test("An action with modified `co2e` is correctly updated.", async () => {
        const wrapped = mockedFunctions.wrap(updateFunction);

        const afterUpdate = slightlyMutate(actionsData.metroTrip, ['co2e'])
        await wrapped(generateDocChange({
            path: actionPath,
            before: actionsData.metroTrip,
            after: afterUpdate
        }));

        let newData = await db.doc(actionPath).get();
        newData = newData.data()

        expect(require("../../modules/stats/methods/update-stats").updateStats).toHaveBeenCalled();
        expect(newData.co2e).toBe(afterUpdate.co2e);
    });

    test("An action is successfully deleted.", async () => {
        const wrapped = mockedFunctions.wrap(deleteFunction);

        await wrapped(await generateDeletedDocSnapshot({
            db,
            data: actionsData.metroTrip,
            path: actionPath
        }));

        let newData = await db.doc(actionPath).get();
        newData = newData.data()

        expect(require("../../modules/stats/methods/update-stats").updateStats).toHaveBeenCalled();
        expect(newData).toBeUndefined();
    });
});
