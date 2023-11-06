# actions

## Requirements

Install Nodejs

## Install project dependencies : 

```bash
npm install firebase
```

```bash
npm install firebase-admin
```

```bash
npm install yargs
```

## How to generate users and actions data for test 

Copy the actions-serviceAccountKey.json file into root project.

Run the following command:

```bash
cd functions/database
```

```bash
node initDataTests.js --count 1000 // count optional, default 500
```

count is the number of users that we wsh to generate, it's 500 by default


## Firebase emulator (local tests)

Install Java

```bash
# On Ubuntu
sudo apt install default-jre
```

Install [Gcloud](https://cloud.google.com/sdk/docs/install?hl=fr#deb)

Configure Gcloud

```bash
gcloud auth login
gcloud components update
gcloud config set project carbonfight-89af6
```

Create dumps folder

```bash
mkdir dumps
```

Download database (need specific rights on GCP project)

```bash
gsutil rm -r gs://actions-dd2b5.appspot.com/backups
gcloud firestore export gs://actions-dd2b5.appspot.com/backups
gsutil -m cp -r gs://actions-dd2b5.appspot.com/backups/* ./dumps/
```

You can launch Firebase emulator
```bash
firebase emulators:start --import ./dumps
```
