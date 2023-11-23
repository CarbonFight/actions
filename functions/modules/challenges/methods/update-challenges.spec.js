const actionsData= require("../../../data/actions.dataset");
const challengesData = require("../../../data/challenges.dataset");
const statsData= require("../../../data/stats.dataset");
const usersData= require("../../../data/users.dataset");
const { mockedFunctions, deleteCollectionsContent } = require("../../../tests/_setup");
const { updateChallenges } = require("./update-challenges");
const { dbInstance } = require("../../../db-setup");
const { getUser, setUserId } = require("../../../tests/utils/user");

const userPath = 'users/'+usersData[0].uid
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
        await db.doc(userPath).set(usersData[0]);
        await db.doc(actionPath).set(actionsData.metroTrip);
        await db.doc(statPath).set(statsData.emptyStats);
        await db.doc(challengePath).set(await setUserId(db, challengesData.allEmpty));
    });

    test("Challenges are checked and no challenges are completed.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.emptyStats), user.uid)

        let challengesList = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesList = challengesList.docs[0].data()

        expect(challengesList.onboardingCompleted).toBeFalsy();
        expect(challengesList.hasEnoughSponsors).toBeFalsy();
    });

    test("Challenges are checked and one challenge is completed : full onboarding.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.statsWithFullOnboarding), user.uid)

        let challengesList = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesList = challengesList.docs[0].data()

        expect(challengesList.onboardingCompleted).toBeTruthy();
        expect(challengesList.hasEnoughSponsors).toBeFalsy();
    });

    test("Challenges are checked and 2 challenges are completed : full onboarding / 10 sponsor codes.", async () => {
        const user = await getUser(db)

        await updateChallenges(await setUserId(db, statsData.statsWithManyActionsAndFullOnboarding), user.uid)

        let challengesList = await db.collection('challenges').where('uid', '==', user.uid).limit(1).get();
        challengesList = challengesList.docs[0].data()

        expect(challengesList.onboardingCompleted).toBeTruthy();
        expect(challengesList.hasEnoughSponsors).toBeTruthy();
    });
});
