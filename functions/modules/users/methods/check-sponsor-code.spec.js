const usersData = require('../../../data/users.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

const { checkIfSponsorCodeExists } = require('./check-sponsor-code');

const userPath = `users/${usersData[0].uid}`;
const userPath2 = `users/${usersData[1].uid}`;

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
        await db.doc(userPath).set(usersData[0]);
        await db.doc(userPath2).set(usersData[1]);
    });

    test('error - sponsor code invalid', async () => {
        const sponsorCode = 'invalid_sponsor_code';

        try {
            await checkIfSponsorCodeExists(db, sponsorCode);
        } catch (e) {
            expect(e.message).toBe(`Sponsor code ${sponsorCode} is invalid`);
        }
    });

    test('sponsor code valid', async () => {
        const sponsorCode = usersData[1].sponsorship_code;

        const sponsorCodeExists = await checkIfSponsorCodeExists(
            db,
            sponsorCode
        );

        expect(sponsorCodeExists).toBeTruthy();
    });
});
