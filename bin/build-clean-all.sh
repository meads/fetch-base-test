#!/bin/bash

echo "cleaning up lib build files."
./bin/clean-lib.sh

echo "cleaning up client and server build files."
./bin/clean.sh

echo "transpiling .ts files in lib project"
./bin/build-lib.sh

echo "transpiling .ts files in client/ and server/ 'typescript projects'"
./bin/build.sh
