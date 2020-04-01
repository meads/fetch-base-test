#!/bin/bash

./bin/clean-and-build.sh

echo "running server-side test"
node ./server/dist/script.js
echo 

