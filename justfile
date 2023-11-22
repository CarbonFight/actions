set dotenv-load

default:
  @just help

help:
  @just --list

install:
  npm --prefix ./functions install ./functions
  npm --prefix ./functions run prepare

start ARGS='':
  firebase emulators:start --project local-project

dev ARGS='':
  firebase emulators:start --only firestore,database {{ARGS}}

test-init:
  gcloud auth application-default login

test ARGS='':
  cd functions && npm run test {{ARGS}}

import:
    node ./functions/generate-fixtures-data.js

cron ARGS='all':
    node ./functions/modules/crons/run-cron-locally.js {{ARGS}}
