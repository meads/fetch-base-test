#!/bin/bash 

set -e

echo "starting server."
node ./server/main.js &

echo "sleeping a sec."
sleep 1

echo "building; starting a local http server in the client/ directory..."
./bin/build.sh && http-server ./client -c-1 -p 8081 -o
