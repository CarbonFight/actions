const admin = require("firebase-admin");
const fireTest = require("firebase-functions-test");

const { deleteCollectionsContent } = require('./tests/_setup')
const { update: updateFunction } = require("./modules/actions");
const { create: createAction } = require('./modules/actions')
const { setUserId } = require("./tests/utils/user");
const actionsData = require("./data/actions.dataset");
const usersData= require("./data/users.dataset");

const { generateDocSnapshot } = require("./tests/utils/change");

process.env.FIRESTORE_EMULATOR_HOST="127.0.0.1:8080"

const projectId = 'local-project'

admin.initializeApp({
  projectId
});

const db = admin.firestore();
db.settings({ host: "127.0.0.1:8080", ssl: false });

const mockedFunctions = fireTest({
  projectId,
})

async function init() {
  await deleteCollectionsContent(db, ['users', 'actions', 'stats', 'challenges', 'badges'])

  const user = usersData.generateUser()
  await db.doc('users/'+user.uid).set(user)

  const wrapped = mockedFunctions.wrap(createAction);

  await Promise.all(
      Object.entries(actionsData).map(async ([key, data]) => {
        const actionObject = await setUserId(db, data);
        await wrapped(await generateDocSnapshot({
          db,
          data: actionObject,
          path: 'actions/' + data.id
        }));
        return actionObject;
      })
  );
}

init()
