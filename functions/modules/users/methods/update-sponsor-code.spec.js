const usersData = require('../../../data/users.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

const { updateUserSponsor } = require('./update-sponsor-code');

const userPath = `users/${usersData[0].uid}`;
const userPath2 = `users/${usersData[1].uid}`;

describe('Update user sponsor code', () => {
    let db = null;

    beforeAll(async () => {
        db = await dbInstance();
    });

    afterAll(() => {
        mockedFunctions.cleanup();
        db.terminate();
    });

    beforeEach(async () => {
        await deleteCollectionsContent(db, ['users']);
        await db.doc(userPath).set(usersData[0]);
        await db.doc(userPath2).set(usersData[1]);
    });

    test('user not found', async () => {
        const uid = 'invalid_uid';
        const sponsorCode = usersData[1].sponsorship_code;

        try {
            await updateUserSponsor(db, uid, sponsorCode);
        } catch (e) {
            expect(e.message).toBe(`User with uid ${uid} not found`);
        }
    });

    test('user sponsor updated', async () => {
        const uid = usersData[0].uid;
        const sponsorCode = usersData[1].sponsorship_code;

        await updateUserSponsor(db, uid, sponsorCode);

        const newData = (await db.doc(userPath).get()).data();

        expect(newData.sponsor).toEqual(usersData[1].sponsorship_code);
    });
});
