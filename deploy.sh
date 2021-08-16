#! /bin/bash

./buildFrontend.sh
cd bff
./build.sh
gcloud app deploy