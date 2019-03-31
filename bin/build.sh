#!/bin/bash

set -ex

rm client/dist/* && tsc && browserify client/dist/index.js -o client/dist/main.js -d


