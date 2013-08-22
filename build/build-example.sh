#!/bin/bash
#Build a the havok/build/example.profile
#Run this script from havok/build directory
#Will output a build to havok/../example

echo "Making release directory"
mkdir -p ../../example/

echo "Removing old example build"
rm -rf ../../example/*

node ./buildconfig.js load=havok/build/preprocess --profile ./profile/example.profile.js

node ./buildconfig.js load=build --profile ./profile/example.profile.preprocessed.js

echo "build example complete"