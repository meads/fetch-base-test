#!/bin/bash

set -ex


# if [[ "$(ls -A client/dist)" ]]; then
#     rm client/dist/*
# fi
tsc && browserify client/dist/index.js -o client/dist/main.js -d
