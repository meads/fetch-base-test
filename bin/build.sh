#!/bin/bash

echo "running tsc build and browserify'ing the client outFile"
tsc --build && browserify client/dist/index.js -o client/dist/main.js -d
