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
npm --prefix ./functions run prepare
```

## Configure Google Cloud CLI

```bash
gcloud auth login
gcloud components update
gcloud config set project actions-dd2b5
```

## Run the emulator

```bash
just start
```

Using this command, you will be able to open firebase admin panel to see and navigate inside the application data.

## Run the emulator to run unit testing

```bash
just dev
```

Then in another console, you can run : 

```bash
just test
```

Using this command, there will be no firebase admin panel available but an optimal firestore instance to run unit tests.


## Add fake data / fixtures to the emulator

Be sure you have an instance of the emulator running using `just start`.

The fixture script :

- Generate a fake user.
- Give him 5 default actions.
- Will generate a default `stats` doc, default `challenges` doc & default `badge` doc.
- Will recalculate the carbon impact based on each of these 5 actions.
- Will recalculate if this user will have completed challenges or completed badges.

You can load fixtures using:

```bash
just import
```

## Run a cron locally

In the app, there are CRON / periodic tasks that will run each day. 

There are located inside: [./functions/modules/crons/index.js](./functions/modules/crons/index.js).

You may want to test them locally to see if the modification they will do are doing the way you expect it. 
To do so, you can run the logic of this periodic task locally.

```bash
# Run all CRON of the app
just cron 
# Run all CRON about the reset of stats each day
just cron day
```

To see if there are more / missing cron task, you can check inside:
- [./functions/modules/crons/index.js](./functions/modules/crons/index.js).
- [./functions/modules/crons/run-cron-locally.js](./functions/modules/crons/run-cron-locally.js).
- [./justfile](./justfile) (check for the `cron` command).

## Need help ?

> **GCloud credential issue** 

If you see the GCloud error `Could not load the default credentials`, you can run the command:
```bash
just test-init
```

Then, connect to GCloud using the email used for this project.

> **Where are stored information about the data structure?**

You can find the description of entities inside the [DATABASE.md](./DATABASE.md) file.

> **I can't find or remember the command I want to run.**

You can run the command `just help` to see the list of available commands in this project. Each command has an alternative manual way to do so.
