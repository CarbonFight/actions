const usersData = require('../../../data/users.dataset');
const statsData = require('../../../data/stats.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

const { updateSponsorCount } = require('./update-sponsor-count');

const userPath = `users/${usersData[1].uid}`;
const statPath = `stats/${usersData[1].uid}`;

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
        await db.doc(userPath).set(usersData[1]);
        await db.doc(statPath).set({
            ...statsData.emptyStats,
            uid: usersData[1].uid,
        });
    });

    test('error - sponsorship_code invalid', async () => {
        const sponsorshipCode = 'sponsorship_code';

        try {
            await updateSponsorCount(db, sponsorshipCode);
        } catch (e) {
            expect(e.message).toBe(`Invalid sponsorship code`);
        }
    });

    test('update user sponsorshipCount stats ', async () => {
        const sponsorshipCode = usersData[1].sponsorship_code;

        const beforeStat = (await db.doc(statPath).get()).data();

        await updateSponsorCount(db, sponsorshipCode);

        const afterStat = (await db.doc(statPath).get()).data();

        expect(afterStat.sponsorshipCount).toEqual(
            beforeStat.sponsorshipCount + 1
        );
    });
});
