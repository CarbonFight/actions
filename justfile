set dotenv-load

[private]
default:
  @just help

[private]
help:
  @just --list

install:
  npm --prefix ./functions install ./functions
  npm --prefix ./import install ./import

refresh ARGS='':
  ./refresh_emulator.bash

dev ARGS='':
  firebase emulators:start --import ./dumps

test ARGS='':
  echo "Missing setup for unit testing."
