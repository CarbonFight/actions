const { update } = require("../../modules/actions");
const usersData= require("../../data/users.dataset");
const actionsData= require("../../data/actions.dataset");
const { mockedFunctions, setup } = require("../_setup");
const { generateDocChange } = require("../utils/change");
const {slightlyMutate} = require("../utils/mutate");

const userPath = 'users/'+usersData[0].uid
const actionPath = 'actions/'+actionsData.metroTrip.uid

describe("Test firestore path/Users", () => {
    let db = null

    beforeAll(async () => {
        db = await setup()
    });

    beforeEach(async () => {
        await db.doc(userPath).set(usersData[0]);
        await db.doc(actionPath).set(actionsData.metroTrip);
    });

    test("An action with modified `co2e` is updated correctly.", async () => {
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
