const { generateUser } = require('../../../data/users.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

const { getUserBySponsorshipCode } = require('./get-by-sponsorship-code');

const [userData1, userData2] = generateUser(2);
const userPath1 = `users/${userData1.uid}`;
const userPath2 = `users/${userData2.uid}`;

describe('Check sponsor code', () => {
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

    test('error - sponsor code invalid', async () => {
        const sponsorCode = 'invalid_sponsor_code';

        try {
            await getUserBySponsorshipCode(db, sponsorCode);
        } catch (e) {
            expect(e.message).toBe(`Sponsor code ${sponsorCode} is invalid`);
        }
    });

    test('sponsor code valid', async () => {
        const sponsorCode = userData2.sponsorship_code;

        const sponsorCodeExists = await getUserBySponsorshipCode(
            db,
            sponsorCode
        );

        expect(sponsorCodeExists).toBeTruthy();
    });
});
