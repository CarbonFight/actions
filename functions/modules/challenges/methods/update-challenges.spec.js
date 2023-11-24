const actionsData = require("../../../data/actions.dataset");
const challengesData = require("../../../data/challenges.dataset");
const statsData = require("../../../data/stats.dataset");
const { generateUser } = require("../../../data/users.dataset");
const { mockedFunctions, deleteCollectionsContent } = require("../../../tests/_setup");
const { updateChallenges } = require("./update-challenges");
const { dbInstance } = require("../../../db-setup");
const { getUser, setUserId } = require("../../../tests/utils/user");
const {challengesList} = require("./validate-challenges");

const userData = generateUser();
const userPath = 'users/'+userData.uid
const actionPath = 'actions/'+actionsData.metroTrip.uid
const statPath = 'stats/'+statsData.emptyStats.uid
const challengePath = 'challenges/'+challengesData.allEmpty.uid

describe("A challenge is updated because of a stat change.", () => {
    let db = null

    beforeAll(async () => {
        db = await dbInstance()
    });

    afterAll(() => {
        mockedFunctions.cleanup()
        db.terminate()
    })

    beforeEach(async () => {
        await deleteCollectionsContent(db, ['users', 'actions', 'stats', 'challenges'])
        await db.doc(userPath).set(userData);
        await db.doc(actionPath).set(actionsData.metroTrip);
        await db.doc(statPath).set(statsData.emptyStats);
        await db.doc(challengePath).set(await setUserId(db, challengesData.allEmpty));
    });

    test("Challenges are checked and no challenges are completed.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.emptyStats), user.uid)

        let challengesDoc = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesDoc = challengesDoc.docs[0].data()

        expect(challengesDoc.onboardingCompleted).toBeFalsy();
        expect(challengesDoc.hasEnoughSponsors).toBeFalsy();
        expect(challengesDoc.score).toBe(0);
    });

    test("Challenges are checked and one challenge is completed : full onboarding.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.statsWithFullOnboarding), user.uid)

        let challengesDoc = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesDoc = challengesDoc.docs[0].data()

        expect(challengesDoc.onboardingCompleted).toBeTruthy();
        expect(challengesDoc.hasEnoughSponsors).toBeFalsy();
        expect(challengesDoc.score).toBe(challengesList.onboardingCompleted.score);
    });

    test("Challenges are checked and 2 challenges are completed : full onboarding / 10 sponsor codes.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.statsWithSponsorshipAndFullOnboarding), user.uid)

        let challengesDoc = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesDoc = challengesDoc.docs[0].data()

        expect(challengesDoc.onboardingCompleted).toBeTruthy();
        expect(challengesDoc.hasEnoughSponsors).toBeTruthy();
        expect(challengesDoc.score).toBe(challengesList.onboardingCompleted.score + challengesList.hasEnoughSponsors.score);
    });

    test("Challenges are checked and 2 challenges are completed : full onboarding / 10 sponsor codes / 10 actions added.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.statsWithManyActionsAndFullOnboarding), user.uid)

        let challengesDoc = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesDoc = challengesDoc.docs[0].data()

        expect(challengesDoc.onboardingCompleted).toBeTruthy();
        expect(challengesDoc.hasEnoughSponsors).toBeTruthy();
        expect(challengesDoc.actionLvl1).toBeTruthy();
        expect(challengesDoc.score).toBe(challengesList.onboardingCompleted.score + challengesList.hasEnoughSponsors.score + challengesList.actionLvl1.score);
    });
});
