#!/bin/bash
#Build the havok.js and havok.css distributable
#Run this script from havok/build directory

echo "build dist complete"

echo "Making temp directory"
mkdir -p ../temp/

echo "Removing old build"
rm -rf ../temp/*

node ./buildconfig.js load=havok/build/preprocess --profile ./profile/dist.profile.js

node ./buildconfig.js load=build --profile ./profile/dist.profile.preprocessed.js

cp ../temp/havok/havok.js ../dist
cp ../temp/havok/havok.css ../dist

rm -rf ../temp/*
rmdir ../temp

echo "build havok dist complete"