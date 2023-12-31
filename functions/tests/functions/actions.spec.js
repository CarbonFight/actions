const { generateUser } = require('../../data/users.dataset');
const actionsData = require('../../data/actions.dataset');

const Logger = require('../../logger-setup');
const { mockedFunctions, deleteCollectionsContent } = require('../_setup');
const { dbInstance } = require('../../db-setup');

const { generateDocChange, generateDocSnapshot } = require('../utils/change');
const { slightlyMutate } = require('../utils/mutate');

const {
    create: createFunction,
    update: updateFunction,
} = require('../../modules/actions');

const { setUserId } = require('../utils/user');

const userData = generateUser();
const userPath = 'users/' + userData.uid;
const actionPath = 'actions/' + actionsData.metroTrip.uid;

describe('A function is triggered by an action', () => {
    let db = null;

    beforeAll(async () => {
        db = await dbInstance();
    });

    afterAll(() => {
        mockedFunctions.cleanup();
        db.terminate();
    });

    beforeEach(async () => {
        jest.spyOn(Logger, 'error').mockImplementation(() => {});
        await deleteCollectionsContent(db, ['users', 'actions']);
        await db.doc(userPath).set(userData);
        await db.doc(actionPath).set(actionsData.metroTrip);
    });

    test('An action is correctly created.', async () => {
        const wrapped = mockedFunctions.wrap(createFunction);

        const actionObject = await setUserId(db, actionsData.metroTrip);

        await wrapped(
            await generateDocSnapshot({
                db,
                data: actionObject,
                path: actionPath,
            })
        );

        const newData = (await db.doc(actionPath).get()).data();

        expect(newData).toBeTruthy();
    });

    test('An action is not correctly created: missing 1 field (poor mobile connection)', async () => {
        const wrapped = mockedFunctions.wrap(createFunction);

        const actionObject = await setUserId(db, actionsData.metroTrip);
        delete actionObject.co2e;

        const result = await wrapped(
            await generateDocSnapshot({
                db,
                data: actionObject,
                path: actionPath,
            })
        );

        const newData = (await db.doc(actionPath).get()).data();

        expect(newData).toBeUndefined();
        expect(result.issues).toEqual([
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'undefined',
                path: ['co2e'],
                message: 'Required',
            },
        ]);
    });

    test('An action with modified `co2e` is correctly updated.', async () => {
        const wrapped = mockedFunctions.wrap(updateFunction);

        const afterUpdate = slightlyMutate(actionsData.metroTrip, ['co2e']);
        await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: actionsData.metroTrip,
                after: afterUpdate,
            })
        );

        let newData = await db.doc(actionPath).get();
        newData = newData.data();

        expect(newData.co2e).toBe(afterUpdate.co2e);
    });

    test('An action with modified `co2e` is not correctly updated: missing 1 field (poor mobile connection)', async () => {
        const wrapped = mockedFunctions.wrap(updateFunction);

        const afterUpdate = slightlyMutate(actionsData.metroTrip, ['count']);
        delete afterUpdate.count;

        const result = await wrapped(
            await generateDocChange({
                db,
                path: actionPath,
                before: actionsData.metroTrip,
                after: afterUpdate,
            })
        );

        const newData = (await db.doc(actionPath).get()).data();

        expect(newData).toBeUndefined();
        expect(result.issues).toEqual([
            {
                code: 'invalid_type',
                expected: 'number',
                received: 'undefined',
                path: ['count'],
                message: 'Required',
            },
        ]);
    });
});
