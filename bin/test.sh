#!/bin/bash

echo "cleaning up build files."
./bin/clean.sh

echo "transpiling .ts files in client/ and server/ 'typescript projects'"
./bin/build.sh

echo "starting server."
node ./server/dist/main.js &

echo "sleeping a sec while node starts the process."
sleep 1

echo "starting a local http server in the client/ directory."
http-server ./client -c-1 -p 8081 -o
