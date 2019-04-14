#!/bin/bash

set -e

echo "removing tsconfig.tsbuildinfo files from client and server"
echo
rm client/tsconfig.tsbuildinfo 2> /dev/null
rm server/tsconfig.tsbuildinfo 2> /dev/null

echo "removing dist directories from client and server"
echo
rm -rf client/dist server/dist 2> /dev/null
