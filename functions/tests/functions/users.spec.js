const { generateUser } = require('../../data/users.dataset');

const { mockedFunctions, deleteCollectionsContent } = require('../_setup');
const { generateDocSnapshot } = require('../utils/change');
const { dbInstance } = require('../../db-setup');

const { userCreate } = require('../../modules/users');

const userData = generateUser();
const userPath = `users/${userData.uid}`;

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
        await deleteCollectionsContent(db, ['users']);
        await db.doc(userPath).set(userData);
    });

    test('An user is correctly created.', async () => {
        const wrapped = mockedFunctions.wrap(userCreate);

        await wrapped(
            await generateDocSnapshot({
                db,
                data: userData,
                path: userPath,
            })
        );

        const data = (await db.doc(userPath).get()).data();

        expect(data).toBeTruthy();
    });

    test('An user is not correctly created: missing 1 field (poor mobile connection)', async () => {
        const wrapped = mockedFunctions.wrap(userCreate);

        delete userData.display_name;

        const result = await wrapped(
            await generateDocSnapshot({
                db,
                data: userData,
                path: userPath,
            })
        );

        const data = (await db.doc(userPath).get()).data();

        expect(data).toBeUndefined();
        expect(result.issues).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                received: 'undefined',
                path: ['display_name'],
                message: 'Required',
            },
        ]);
    });

    test('An user is not correctly created: missing multiple fields (poor mobile connection)', async () => {
        const wrapped = mockedFunctions.wrap(userCreate);

        delete userData.display_name;
        delete userData.email;

        const result = await wrapped(
            await generateDocSnapshot({
                db,
                data: userData,
                path: userPath,
            })
        );

        const data = (await db.doc(userPath).get()).data();

        expect(data).toBeUndefined();
        expect(result.issues).toEqual([
            {
                code: 'invalid_type',
                expected: 'string',
                received: 'undefined',
                path: ['display_name'],
                message: 'Required',
            },
            {
                code: 'invalid_type',
                expected: 'string',
                received: 'undefined',
                path: ['email'],
                message: 'Required',
            },
        ]);
    });
});
