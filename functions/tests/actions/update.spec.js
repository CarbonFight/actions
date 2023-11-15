const { update } = require("../../modules/actions");
const usersData= require("../../data/users.dataset");
const actionsData= require("../../data/actions.dataset");
const { mockedFunctions, setup } = require("../_setup");
const { generateDocChange } = require("../_utils");

const userPath = 'users/'+usersData[0].uid
const actionPath = 'actions/'+actionsData[0].uid

describe("Test firestore path/Users", () => {
    let db = null

    beforeAll(async () => {
        db = await setup()
    });

    beforeEach(async () => {
        await db.doc(userPath).set(usersData[0]);
        await db.doc(actionPath).set(actionsData[0]);
    });

    test("An action is updated in a correct way.", async () => {
        const wrapped = mockedFunctions.wrap(update);

        await wrapped(generateDocChange({
            path: actionPath,
            before: {
                ...actionsData[0],
                co2e: 0
            },
            after: actionsData[0]
        }));

        let newData = await db.doc(actionPath).get();
        newData = newData.data()

        expect(newData.co2e).toBe(actionsData[0].co2e);
    });
});
