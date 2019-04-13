#!/bin/bash

set -ex

# run typescript build and browserify the client outFile
tsc --build && browserify client/dist/index.js -o client/dist/main.js -d
