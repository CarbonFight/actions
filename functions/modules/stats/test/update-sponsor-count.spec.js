const { generateUser } = require('../../../data/users.dataset');
const statsData = require('../../../data/stats.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

const { updateSponsorCount } = require('../methods/update-sponsor-count');

const userData = generateUser();
const userPath = `users/${userData.uid}`;
const statPath = `stats/${userData.uid}`;

describe('Update sponsor count', () => {
    let db = null;

    beforeAll(async () => {
        db = await dbInstance();
    });

    afterAll(() => {
        mockedFunctions.cleanup();
        db.terminate();
    });

    beforeEach(async () => {
        await deleteCollectionsContent(db, ['users', 'stats']);
        await db.doc(userPath).set(userData);
        await db.doc(statPath).set({
            ...statsData.emptyStats,
            uid: userData.uid,
        });
    });

    test('error - sponsorship_code not found in db', async () => {
        const sponsorshipCode = 'sponsorship_code';

        try {
            await updateSponsorCount(db, sponsorshipCode);
        } catch (e) {
            expect(e.message).toBe(`Invalid sponsorship code`);
        }
    });

    test('increment sponsoring user sponsorshipCount in stats collection', async () => {
        const sponsorshipCode = userData.sponsorship_code;

        const beforeStat = (await db.doc(statPath).get()).data();

        await updateSponsorCount(db, sponsorshipCode);

        const afterStat = (await db.doc(statPath).get()).data();

        expect(afterStat.sponsorshipCount).toEqual(
            beforeStat.sponsorshipCount + 1
        );
    });
});
