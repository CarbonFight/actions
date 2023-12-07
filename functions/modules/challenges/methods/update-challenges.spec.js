const actionsData = require('../../../data/actions.dataset');
const challengesData = require('../../../data/challenges.dataset');
const statsData = require('../../../data/stats.dataset');
const { generateUser } = require('../../../data/users.dataset');
const {
    mockedFunctions,
    deleteCollectionsContent,
} = require('../../../tests/_setup');
const { updateChallenges } = require('./update-challenges');
const { dbInstance } = require('../../../db-setup');
const { getUser, setUserId } = require('../../../tests/utils/user');
const { challengesList } = require('./validate-challenges');

const userData = generateUser();
const userPath = 'users/' + userData.uid;
const actionPath = 'actions/' + actionsData.metroTrip.uid;
const statPath = 'stats/' + statsData.emptyStats.uid;
const challengePath = 'challenges/' + challengesData.allEmpty.uid;

const totalScoreOnboardingCompleted = (() => {
    let totalScore = 0;
    for (const key in challengesList) {
        if (key.startsWith('onboarding')) {
            totalScore += challengesList[key].score;
        }
    }

    return totalScore;
})();

describe('A challenge is updated because of a stat change.', () => {
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
        ]);
        await db.doc(userPath).set(userData);
        await db.doc(actionPath).set(actionsData.metroTrip);
        await db.doc(statPath).set(statsData.emptyStats);
        await db
            .doc(challengePath)
            .set(await setUserId(db, challengesData.allEmpty));
    });

    test('Challenges are checked and no challenges are completed.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.emptyStats)
        );

        let challengesDoc = await db
            .collection('challenges')
            .where('uid', '==', user.uid)
            .limit(1)
            .get();
        challengesDoc = challengesDoc.docs[0].data();

        expect(challengesDoc.onboardingTransport).toBeFalsy();
        expect(challengesDoc.hasEnoughSponsors).toBeFalsy();
        expect(challengesDoc.score).toBe(0);
    });

    test('Challenges are checked and onboarding challenges are completed.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.statsWithFullOnboarding)
        );

        let challengesDoc = await db
            .collection('challenges')
            .where('uid', '==', user.uid)
            .limit(1)
            .get();
        challengesDoc = challengesDoc.docs[0].data();

        expect(challengesDoc.onboardingTransport).toBeTruthy();
        expect(challengesDoc.onboardingServices).toBeTruthy();
        expect(challengesDoc.onboardingObjects).toBeTruthy();
        expect(challengesDoc.onboardingLodging).toBeTruthy();
        expect(challengesDoc.onboardingFurniture).toBeTruthy();
        expect(challengesDoc.onboardingFood).toBeTruthy();
        expect(challengesDoc.onboardingDigital).toBeTruthy();
        expect(challengesDoc.onboardingClothes).toBeTruthy();
        expect(challengesDoc.onboardingAppliance).toBeTruthy();
        expect(challengesDoc.hasEnoughSponsors).toBeFalsy();
        expect(challengesDoc.actionLvl1).toBeFalsy();
        expect(challengesDoc.score).toBe(totalScoreOnboardingCompleted);
    });

    test('Challenges are checked and some challenges are completed : full onboarding / 10 sponsor codes.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.statsWithSponsorshipAndFullOnboarding)
        );

        let challengesDoc = await db
            .collection('challenges')
            .where('uid', '==', user.uid)
            .limit(1)
            .get();
        challengesDoc = challengesDoc.docs[0].data();

        expect(challengesDoc.onboardingTransport).toBeTruthy();
        expect(challengesDoc.hasEnoughSponsors).toBeTruthy();
        expect(challengesDoc.actionLvl1).toBeFalsy();
        expect(challengesDoc.score).toBe(
            totalScoreOnboardingCompleted +
                challengesList.hasEnoughSponsors.score
        );
    });

    test('Challenges are checked and some challenges are completed : full onboarding / 10 sponsor codes / 10 actions added.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.statsWithManyActionsAndFullOnboarding)
        );

        let challengesDoc = await db
            .collection('challenges')
            .where('uid', '==', user.uid)
            .limit(1)
            .get();
        challengesDoc = challengesDoc.docs[0].data();

        expect(challengesDoc.onboardingTransport).toBeTruthy();
        expect(challengesDoc.hasEnoughSponsors).toBeTruthy();
        expect(challengesDoc.actionLvl1).toBeTruthy();
        expect(challengesDoc.score).toBe(
            totalScoreOnboardingCompleted +
                challengesList.hasEnoughSponsors.score +
                challengesList.actionLvl1.score
        );
    });
});
