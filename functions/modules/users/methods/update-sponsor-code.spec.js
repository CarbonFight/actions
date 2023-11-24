const { generateUser } = require('../../../data/users.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

const { updateUserSponsor } = require('./update-sponsor-code');

const [userData1, userData2] = generateUser(2);
const userPath1 = `users/${userData1.uid}`;
const userPath2 = `users/${userData2.uid}`;

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
        await db.doc(userPath1).set(userData1);
        await db.doc(userPath2).set(userData2);
    });

    test('error - user not found', async () => {
        const uid = 'invalid_uid';
        const sponsorCode = userData2.sponsorship_code;

        try {
            await updateUserSponsor(db, uid, sponsorCode);
        } catch (e) {
            expect(e.message).toBe(`User with uid ${uid} not found`);
        }
    });

    test('error - user sponsor himself', async () => {
        const uid = userData1.uid;
        const sponsorCode = userData1.sponsorship_code;

        try {
            await updateUserSponsor(db, uid, sponsorCode);
        } catch (e) {
            expect(e.message).toBe(`Users cannot sponsor themselves`);
        }
    });

    test('user sponsor updated', async () => {
        const uid = userData1.uid;
        const sponsorCode = userData2.sponsorship_code;

        await updateUserSponsor(db, uid, sponsorCode);

        const newData = (await db.doc(userPath1).get()).data();

        expect(newData.sponsor).toEqual(userData2.sponsorship_code);
    });
});
