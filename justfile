set dotenv-load

default:
  @just help

help:
  @just --list

install:
  npm --prefix ./functions install ./functions
  npm --prefix ./functions run prepare
  npm --prefix ./import install ./import

refresh ARGS='':
  ./refresh_emulator.bash {{ARGS}}

start ARGS='':
  firebase emulators:start --import ./dumps {{ARGS}}

dev ARGS='':
  firebase emulators:start --only firestore,database {{ARGS}}

test ARGS='':
  cd functions && npm run test {{ARGS}}
