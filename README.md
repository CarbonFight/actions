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
