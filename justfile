set dotenv-load

default:
  @just help

help:
  @just --list

install:
  npm --prefix ./functions install ./functions
  npm --prefix ./import install ./import

refresh ARGS='':
  ./refresh_emulator.bash {{ARGS}}

dev ARGS='':
  firebase emulators:start --import ./dumps {{ARGS}}

test ARGS='':
  echo "Missing setup for unit testing." {{ARGS}}
