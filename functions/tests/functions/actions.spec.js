const usersData= require("../../data/users.dataset");
const actionsData= require("../../data/actions.dataset");
const { mockedFunctions, setup, deleteCollectionsContent } = require("../_setup");
const { generateDocChange } = require("../utils/change");
const { slightlyMutate } = require("../utils/mutate");

const { update, create } = require("../../modules/actions");

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
        const wrapped = mockedFunctions.wrap(create);

        await wrapped(generateDocChange({
            path: actionPath,
            before: null,
            after: actionsData.metroTrip
        }, {
            documentId: actionsData.metroTrip.uid
        }));

        let newData = await db.doc(actionPath).get();
        newData = newData.data()

        expect(newData.co2e).toBeTruthy();
    });

    test("An action with modified `co2e` is correctly updated.", async () => {
        const wrapped = mockedFunctions.wrap(update);

        const afterUpdate = slightlyMutate(actionsData.metroTrip, ['co2e'])
        await wrapped(generateDocChange({
            path: actionPath,
            before: actionsData.metroTrip,
            after: afterUpdate
        }));

        let newData = await db.doc(actionPath).get();
        newData = newData.data()

        expect(newData.co2e).toBe(afterUpdate.co2e);
    });
});
