const usersData= require("../../../data/users.dataset");
const actionsData= require("../../../data/actions.dataset");
const { mockedFunctions, deleteCollectionsContent } = require("../../../tests/_setup");
const { setUserId } = require("../../../tests/utils/user");
const { updateStats } = require("./update-stats");
const {dbInstance} = require("../../../db-setup");

const userPath = 'users/'+usersData[0].uid
const actionPath = 'actions/'+actionsData.metroTrip.uid

describe("A stat is updated because of an action change.", () => {
    let db = null

    beforeAll(async () => {
        db = await dbInstance()
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

    test("An action is added.", async () => {
        const actionObject = await setUserId(db, actionsData.metroTrip)

        const updatedStat = await updateStats(actionObject)

        expect(updatedStat).toBeInstanceOf(Object);
    });
});
