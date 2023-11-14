const { update } = require("../modules/actions");
const usersData= require("../data/users.dataset");
const { mockedFunctions, setup } = require("../__tests__/_utils");

const fireTest = mockedFunctions

const userPath = 'users/'+usersData[0].uid

describe("Test firestore path/Users", () => {
    let db = null

    beforeAll(async () => {
        db = await setup()
    });

    beforeEach(async () => {
        await setup()
        await db.doc(userPath).set(usersData[0]);
    });

    test("When update user set updatedDate with time now", async () => {
        const beforeSnap = fireTest.firestore.makeDocumentSnapshot({name: "Gustavo"}, userPath);
        const afterSnap = fireTest.firestore.makeDocumentSnapshot({name: "Gustavo Condezo"}, userPath);
        const change = fireTest.makeChange(beforeSnap, afterSnap);

        const wrapped = fireTest.wrap(update);

        await wrapped(change);

        const userDateNow = (await db.doc(userPath).get()).get("updatedDate");
        const dateNow = new Date();

        expect(dateNow.getTime() - userDateNow.toDate().getTime()).toBeLessThanOrEqual(10000);
    });
});
