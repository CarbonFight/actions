# CarbonFight Actions V2

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/fdf95efb0c36446397e4c0e75078b155)](https://app.codacy.com/gh/CarbonFight/actions/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## Requirements

- [Node.js](https://nodejs.org/en/download)
- [Firebase CLI](https://firebase.google.com/docs/cli?hl=fr#install-cli-mac-linux)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install?hl=fr#deb)

## Install

```bash
npm --prefix ./functions install ./functions
npm --prefix ./import install ./import
```

## Configure
Download you service account json file from Google Firebase.  

```bash
# Copy account json file
cp <yourFile> import/serviceAccountKey.json

# Create empty dump folder
mkdir dumps

# Configure Google Cloud CLI
gcloud auth login
gcloud components update
gcloud config set project actions-dd2b5
```

## Run

You can run a bash script that will :
- Generate fake data into firestore
- Dump firestore database
- Download dump into local firebase emulator
- Lanuch firebase emulator

```bash
chmod +x ./refresh_emulator.bash
./refresh_emulator.bash
```