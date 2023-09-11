const admin = require('firebase-admin');
const path = require("path");
const serviceAccount = require(path.resolve(__dirname, './../../actions-serviceAccountKey.json'));
const { argv } = require('yargs');

const userCount = argv.count || 500; //default 500

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://actions-dd2b5.firebaseapp.com"
});

const firestore = admin.firestore();

function generateRandomDate() {
  const startDate = new Date(2000, 0, 1);
  const endDate = new Date();
  const randomDate = new Date(
    startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime())
  );
  return randomDate;
}

function formatDate(date) {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

async function viderCollectionUsers() {
  const usersCollection = firestore.collection('users');

  try {
    const snapshot = await usersCollection.get();
    const deletePromises = [];

    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    console.log("La collection 'users' a été vidée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents : ", error);
  }
}

async function viderCollectionActions() {
  const actionsCollection = firestore.collection('actions');

  try {
    const snapshot = await actionsCollection.get();
    const deletePromises = [];

    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    console.log("La collection 'actions' a été vidée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents de la collection 'actions': ", error);
  }
}

async function ajouterUtilisateur(index) {
  const usersCollection = firestore.collection('users');

  const displayName = `Utilisateur ${index}`;
  const email = `user${index}@example.com`;
  const photoUrl = `url${index}`;

  const connectionHistory = Array.from({ length: 10 }, () => generateRandomDate())
  .map(formatDate)
  .sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('/'));
    const dateB = new Date(b.split('/').reverse().join('/'));
    return dateB - dateA;
  });

  try {
    const docRef = await usersCollection.add({
      created_time: admin.firestore.FieldValue.serverTimestamp(),
      display_name: displayName,
      email: email,
      photo_url: photoUrl,
      connection_history: connectionHistory
    });

    console.log(`Utilisateur ajouté avec succès avec l'identifiant : ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'utilisateur : ", error);
  }
}

function createActionData(uid, category, action, option, side, emission_factor, count) {
  const countries = ['FR'];
  const periodicities = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const randomBoolean = Math.random() > 0.5;
  const result = emission_factor * count;

  const data = {
    uid: uid,
    created_time: admin.firestore.FieldValue.serverTimestamp(),
    country: countries[Math.floor(Math.random() * countries.length)],
    category: category,
    action: action,
    co2e: Math.round(result),
    count: count,
    emission_factor: emission_factor,
    isPeriodic: randomBoolean,
    periodicity: randomBoolean ? periodicities : [],
  };
  if (option) {
    data.option = option;
  }
  if (side) {
    data.side = side;
  }

  return data;
}


function randomAction(uid) {
const actionDataFood1 = createActionData(uid, 'food', 'coffee', null, null, 100, 2);
const actionDataFood2 = createActionData(uid, 'food', 'drinks', 'Eau en bouteille', null, 100, 2);
const actionDataTransport1 = createActionData(uid, 'transport', 'car', 'Thermique', null, 119, 150);
const actionDataTransport2 = createActionData(uid, 'transport', 'train', 'Transilien', null, 7.04, 2);
const actionDataClothes1 = createActionData(uid, 'clothes', 'Chemise', 'Coton', null, 13000, 1);
const actionDataClothes2 = createActionData(uid, 'clothes', 'Manteau', 'Veste imperméable', null, 41000, 1);
const actionDataEnergy1 = createActionData(uid, 'energy', 'electricity', 'Photovoltaïque', null, 44, 2);
const actionDataEnergy2 = createActionData(uid, 'energy', 'gas', 'Gaz naturel', null, 239, 1);

const actions = [actionDataFood1, actionDataFood2, actionDataTransport1, actionDataTransport2, actionDataClothes1, actionDataClothes2, actionDataEnergy1, actionDataEnergy2];
const randomIndex = Math.floor(Math.random() * actions.length);

return actions[randomIndex];
}

async function ajouterAction(uid) {
  const actionsCollection = firestore.collection('actions');
  const actionData = randomAction(uid);

  try {
    const docRef = await actionsCollection.add(actionData);

    console.log(`Action ajoutée avec succès avec l'identifiant : ${docRef.id}`);
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'action : ", error);
  }
}

async function ajouterUtilisateursDeTest() {
  await viderCollectionUsers();
  await viderCollectionActions();

  for (let i = 1; i <= userCount; i++) {
    const userId = await ajouterUtilisateur(i);
    await ajouterAction(userId);
  }

  console.log("Opération terminée avec succès !");
  process.exit(0);
}

ajouterUtilisateursDeTest();
