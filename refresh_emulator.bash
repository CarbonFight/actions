#! /bin/bash

node import/generateData.js

gsutil rm -r gs://actions-dd2b5.appspot.com/backups
gcloud firestore export gs://actions-dd2b5.appspot.com/backups
gsutil -m cp -r gs://actions-dd2b5.appspot.com/backups/* ./dumps/
