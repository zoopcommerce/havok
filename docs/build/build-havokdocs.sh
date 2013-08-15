#!/bin/bash
#Build a havok layer for the havok docs to use
#Run this script from this directory

echo "Making temp directory"
mkdir -p ./temp/

echo "Removing old build"
rm -rf ./temp/*

node buildconfig.js load=havok/build/preprocess --profile havokdocs.profile.js

node buildconfig.js load=build --profile havokdocs.profile.preprocessed.js

#echo >> ./temp/dojo/dojo.js
#echo >> ./temp/havok/nls/havok_en-us.js
#cat ./temp/dojo/dojo.js ./temp/havok/nls/havok_en-us.js ./temp/havok/havok.js > ./src/js/havok.js

echo "Havok layer complete"