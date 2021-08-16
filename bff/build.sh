#! /bin/bash

npm run build

rm -r dist/static
mv src/static dist/static