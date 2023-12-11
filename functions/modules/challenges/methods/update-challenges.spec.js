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
const { generateUser } = require('../../../data/users.dataset');

// Methods
const { updateChallenges } = require('./update-challenges');
const { getUser, setUserId } = require('../../../tests/utils/user');
const { challengesList } = require('./validate-challenges');
const { getChallengeByUid } = require('./get-challenge-by-uid');

const userData = generateUser();
const userPath = `users/${userData.uid}`;
const actionPath = `actions/${actionsData.metroTrip.uid}`;
const statPath = `stats/${statsData.emptyStats.uid}`;
const challengePath = `challenges/${challengesData.allEmpty.uid}`;

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

    test('No challenges are completed.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.emptyStats)
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.onboardingTransport).toBeFalsy();
        expect(challenges.sponsor1).toBeFalsy();
        expect(challenges.score).toBe(0);
    });

    test('Onboarding challenges are completed.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.statsWithFullOnboarding)
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.onboardingTransport).toBeTruthy();
        expect(challenges.onboardingServices).toBeTruthy();
        expect(challenges.onboardingObjects).toBeTruthy();
        expect(challenges.onboardingLodging).toBeTruthy();
        expect(challenges.onboardingFurniture).toBeTruthy();
        expect(challenges.onboardingFood).toBeTruthy();
        expect(challenges.onboardingDigital).toBeTruthy();
        expect(challenges.onboardingClothes).toBeTruthy();
        expect(challenges.onboardingAppliance).toBeTruthy();
        expect(challenges.sponsor1).toBeFalsy();
        expect(challenges.actions1).toBeFalsy();
        expect(challenges.score).toBe(totalScoreOnboardingCompleted);
    });

    test('Some challenges are completed : full onboarding / 1 sponsor.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.statsWithSponsorshipAndFullOnboarding)
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.onboardingTransport).toBeTruthy();
        expect(challenges.sponsor1).toBeTruthy();
        expect(challenges.actions1).toBeFalsy();
        expect(challenges.score).toBe(
            totalScoreOnboardingCompleted + challengesList.sponsor1.score
        );
    });

    test('Some challenges are completed : full onboarding / 1 sponsor / 10 actions added.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, statsData.statsWithManyActionsAndFullOnboarding)
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.onboardingTransport).toBeTruthy();
        expect(challenges.sponsor1).toBeTruthy();
        expect(challenges.actions1).toBeTruthy();
        expect(challenges.score).toBe(
            totalScoreOnboardingCompleted +
                challengesList.sponsor1.score +
                challengesList.actions1.score
        );
    });

    test('Some challenges are completed : 20 sponsors.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                sponsorshipCount: 20,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.sponsor1).toBeTruthy();
        expect(challenges.sponsor2).toBeTruthy();
        expect(challenges.sponsor3).toBeTruthy();
        expect(challenges.sponsor4).toBeTruthy();
        expect(challenges.score).toBe(
            challengesList.sponsor1.score +
                challengesList.sponsor2.score +
                challengesList.sponsor3.score +
                challengesList.sponsor4.score
        );
    });

    test('Some challenges are completed : 100 actions added.', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                actionsCountTotal: 100,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.actions1).toBeTruthy();
        expect(challenges.actions2).toBeTruthy();
        expect(challenges.actions3).toBeTruthy();
        expect(challenges.actions4).toBeTruthy();
        expect(challenges.actions5).toBeTruthy();
        expect(challenges.score).toBe(
            challengesList.actions1.score +
                challengesList.actions2.score +
                challengesList.actions3.score +
                challengesList.actions4.score +
                challengesList.actions5.score
        );
    });

    test('Some challenges are completed : 5 periodics actions added', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                actionsPeriodicCountTotal: 5,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges['5periodics']).toBeTruthy();
        expect(challenges.score).toBe(challengesList['5periodics'].score);
    });

    test('Some challenges are completed : 7 connection streak', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                connectionStreak: 7,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.streak1).toBeTruthy();
        expect(challenges.streak2).toBeFalsy();
        expect(challenges.streak3).toBeFalsy();
        expect(challenges.score).toBe(challengesList.streak1.score);
    });

    test('Some challenges are completed : 30 connection streak', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                connectionStreak: 30,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.streak1).toBeTruthy();
        expect(challenges.streak2).toBeTruthy();
        expect(challenges.streak3).toBeTruthy();
        expect(challenges.score).toBe(
            challengesList.streak1.score +
                challengesList.streak2.score +
                challengesList.streak3.score
        );
    });

    test('Some challenges are completed : Update pseudo (display_name)', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                eventUpdateDisplayNameCount: 1,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.display).toBeTruthy();
        expect(challenges.score).toBe(challengesList.display.score);
    });

    test('Some challenges are completed : Update target', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                eventUpdateTargetCount: 1,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.target).toBeTruthy();
        expect(challenges.score).toBe(challengesList.target.score);
    });

    test('Some challenges are completed : Delete an action', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                eventActionDeleteCount: 1,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.delete).toBeTruthy();
        expect(challenges.score).toBe(challengesList.delete.score);
    });

    test('Some challenges are completed : Modify an action', async () => {
        const user = await getUser(db);

        await updateChallenges(
            db,
            user.uid,
            await setUserId(db, {
                ...statsData.emptyStats,
                eventActionUpdateCount: 1,
            })
        );

        const challenges = (await getChallengeByUid(db, user.uid)).data();

        expect(challenges.modify).toBeTruthy();
        expect(challenges.score).toBe(challengesList.modify.score);
    });
});
