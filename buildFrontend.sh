#! /bin/bash

rm -r bff/src/static/

cd frontend
npm run build
cp -r build/ ../bff/src/static 