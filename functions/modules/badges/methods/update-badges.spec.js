// Setup
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { dbInstance } = require('../../../db-setup');

// Datasets
const actionsData = require('../../../data/actions.dataset');
const challengesData = require('../../../data/challenges.dataset');
const statsData = require('../../../data/stats.dataset');
const badgesData = require('../../../data/badges.dataset');
const { generateUser } = require('../../../data/users.dataset');

// Methods
const { updateBadges } = require('./update-badges');
const { getUser, setUserId } = require('../../../tests/utils/user');
const { getBadgesByUid } = require('./get-badges-by-uuid');

const userData = generateUser();
const userPath = `users/${userData.uid}`;
const actionPath = `actions/${actionsData.metroTrip.uid}`;
const statPath = `stats/${statsData.emptyStats.uid}`;
const challengePath = `challenges/${challengesData.allEmpty.uid}`;
const badgePath = `badges/${badgesData.allEmpty.uid}`;

describe('A badge is updated because of a challenge change.', () => {
    let db = null;

    beforeAll(async () => {
        db = await dbInstance();
    });

    afterAll(() => {
        mockedFunctions.cleanup();
        db.terminate();
    });

    beforeEach(async () => {
        await deleteCollectionsContent(db, [
            'users',
            'actions',
            'stats',
            'challenges',
            'badges',
        ]);
        await db.doc(userPath).set(userData);
        await db.doc(actionPath).set(actionsData.metroTrip);
        await db.doc(statPath).set(statsData.emptyStats);
        await db
            .doc(challengePath)
            .set(await setUserId(db, challengesData.allEmpty));
        await db.doc(badgePath).set(await setUserId(db, badgesData.allEmpty));
    });

    test('No badges are completed.', async () => {
        const user = await getUser(db);

        await updateBadges(
            db,
            user.uid,
            await setUserId(db, challengesData.allEmpty)
        );

        const badges = (await getBadgesByUid(db, user.uid)).data();

        expect(badges.onboardingHowtoFinished).toBeFalsy();
        expect(badges.onboardingAllChallenges).toBeFalsy();
    });

    test('onboarding badge is completed.', async () => {
        const user = await getUser(db);

        await updateBadges(
            db,
            user.uid,
            await setUserId(db, challengesData.allCompleted)
        );

        const badges = (await getBadgesByUid(db, user.uid)).data();

        expect(badges.onboardingHowtoFinished).toBeFalsy();
        expect(badges.onboardingAllChallenges).toBeTruthy();
    });
});
