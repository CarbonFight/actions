# CarbonFight Actions V2

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/fdf95efb0c36446397e4c0e75078b155)](https://app.codacy.com/gh/CarbonFight/actions/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)

## Requirements

- [Node.js](https://nodejs.org/en/download)
- [Firebase CLI](https://firebase.google.com/docs/cli?hl=fr#install-cli-mac-linux)
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install?hl=fr#deb)

### Optionnal

- [Just](https://github.com/casey/just): A `Makefile` alternative that run commands easily by creating a `justfile` at the root of the project. Natively installed on all OS where `sh` command is available.

## Install

```bash
just install
```

Or Manual installation:

```bash
npm --prefix ./functions install ./functions
npm --prefix ./import install ./import
```

## Configure
Download you service account json file from Google Firebase.  
A file named `serviceAccountKey.json` should exist in `imports/` folder.

```bash
# Copy account json file
cp <yourFile> import/serviceAccountKey.json
```

# Configure Google Cloud CLI

```bash
gcloud auth login
gcloud components update
gcloud config set project actions-dd2b5
```

💡 All files relative to backups will be stored inside the `./dumps/` folder.

## Refresh emulator (Firestore / Firebase) data

You can run a bash script that will :
- Generate fake data into firestore
- Dump firestore database
- Download dump into local firebase emulator
- Launch firebase emulator

Set permissions for the bash script :

```bash
chmod +x ./refresh_emulator.bash
```

Then run it using:

```bash
just refresh
```

Or run it manually:

```bash
./refresh_emulator.bash
```

## Run the emulator

```bash
just dev
```

Or run it manually:

```bash
firebase emulators:start --import ./dumps
```

## Need help ? 

> **Where are stored information about the data structure?**

You can find the description of entities inside the [DATABASE.md](./DATABASE.md) file.

> **I can't find or remember the command I want to run.**

You can run the command `just help` to see the list of available commands in this project. Each command has an alternative manual way to do so.
