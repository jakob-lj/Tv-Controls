#! /bin/bash

./buildFrontend.sh
cd bff
./build.sh
gcloud app deploy --project tv-control-323115 