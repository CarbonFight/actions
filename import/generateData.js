const admin = require('firebase-admin');
const path = require("path");
const serviceAccount = require(path.resolve(__dirname, './serviceAccountKey.json'));

const userCount =  1;
const actionCount =  10; 

// Initialize app
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://actions-dd2b5.firebaseapp.com"
});
const firestore = admin.firestore();

// Generate Random Users
function generateFakeIdentity() {

  var firstNames = [
    'John', 'Jane', 'Jack', 'Jim', 'Jill', 'Joan', 'Jenny', 'Joe', 'Jesse',
    'Jody', 'Jodi', 'Josh', 'Jules', 'Julie', 'Judy', 'Jake', 'Jade', 'Jude',
    'Jean', 'Jett', 'Judd', 'Jules', 'Jock', 'Jax', 'Jed', 'Jeb', 'Jen',
    'Jett', 'Jude', 'Jean', 'Jock', 'Jax', 'Jed', 'Jeb', 'Jen'
  ];
  
  var lastNames = [
    'Johnson', 'Jackson', 'Jameson', 'Jenkins', 'Jennings', 'Jensen', 'Jett',
    'Jewell', 'Jewett', 'Jolly', 'Jollyman', 'Jones', 'Joplin', 'Judd', 'Judge',
    'Jude', 'Julian', 'Julius', 'Jumper', 'Jumperman', 'Jumperdink', 'Jumperdoo',
    'Jumperdink', 'Jumperoo', 'Jumperduff', 'Jumperdoff', 'Jumperdough', 'Jumperstuff',
    'Jumperdoodle', 'Jumperdoo', 'Jumperdink', 'Jumperdoo', 'Jumperdoo', 'Jumperdink',
    'Jumperdoo', 'Jumperdink'
  ];

  var firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  var lastName =  lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return {
    firstName: firstName,
    lastName: lastName,
    displayName: firstName + ' ' + lastName,
    email: firstName + '.' + lastName + '@example.com',
    photo_url: "https://lh3.googleusercontent.com/a-/" + firstName + '-' + lastName + "=s96-c"
  };
};

function generateUUID() {
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, function(c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}

function generateSponsorCode() {
  return Math.random().toString(36).substr(2, 8).toUpperCase().match(/.{1,4}/g).join('-')
}

function generateTeam() {
  var teams = ['earth', 'sky', 'forest'];
  return teams[Math.floor(Math.random() * teams.length)];
}

function generateTarget() {
  var targets = [2,4,6,8,10];
  return targets[Math.floor(Math.random() * targets.length)];
}


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

async function viderCollectionStats() {
  const actionsCollection = firestore.collection('stats');

  try {
    const snapshot = await actionsCollection.get();
    const deletePromises = [];

    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    console.log("La collection 'stats' a été vidée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents de la collection 'stats': ", error);
  }
}

async function viderCollectionChallenges() {
  const actionsCollection = firestore.collection('challenges');

  try {
    const snapshot = await actionsCollection.get();
    const deletePromises = [];

    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    console.log("La collection 'challenges' a été vidée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents de la collection 'challenges': ", error);
  }
}

async function viderCollectionBadges() {
  const actionsCollection = firestore.collection('badges');

  try {
    const snapshot = await actionsCollection.get();
    const deletePromises = [];

    snapshot.forEach((doc) => {
      deletePromises.push(doc.ref.delete());
    });

    await Promise.all(deletePromises);
    console.log("La collection 'badges' a été vidée avec succès.");
  } catch (error) {
    console.error("Erreur lors de la suppression des documents de la collection 'badges': ", error);
  }
}




async function ajouterUtilisateur(uid) {
  const usersCollection = firestore.collection('users');
  const fakeIdentity = new generateFakeIdentity();

  const connectionHistory = Array.from({ length: 10 }, () => generateRandomDate())
  .map(formatDate)
  .sort((a, b) => {
    const dateA = new Date(a.split('/').reverse().join('/'));
    const dateB = new Date(b.split('/').reverse().join('/'));
    return dateB - dateA;
  });

  try {
    const docRef = await usersCollection.add({
      uid: uid,
      created_time: admin.firestore.FieldValue.serverTimestamp(),
      display_name: fakeIdentity.displayName,
      last_Name: fakeIdentity.lastName,
      first_Name: fakeIdentity.firstName,
      email: fakeIdentity.email,
      photo_url: fakeIdentity.photo_url,
      sponsorship_code: generateSponsorCode(),
      sponsor: generateSponsorCode(),
      connection_history: connectionHistory,
      team: generateTeam(),
      target: generateTarget(),
      hasCompletedHowto: false
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
const actionDataEnergy1 = createActionData(uid, 'lodging', 'electricity', 'Photovoltaïque', null, 44, 2);
const actionDataEnergy2 = createActionData(uid, 'lodging', 'gas', 'Gaz naturel', null, 239, 1);

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
  await viderCollectionStats();
  await viderCollectionChallenges();
  await viderCollectionBadges();

  for (let i = 1; i <= userCount; i++) {
    const uid = generateUUID();
    await ajouterUtilisateur(uid);

    // Wait 2 sec to Stats document to be created
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
    await delay(2000);

    for (let a = 1; a <= actionCount; a++) { 
      await ajouterAction(uid);
    }
  }

  console.log("Opération terminée avec succès !");
  process.exit(0);
}

ajouterUtilisateursDeTest();
