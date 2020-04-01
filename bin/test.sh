#!/bin/bash

echo "removing tsconfig.tsbuildinfo file from lib."
echo
rm lib/tsconfig.tsbuildinfo 2> /dev/null

echo "removing dist directory from lib."
echo
rm -rf lib/dist 2> /dev/null


echo "removing tsconfig.tsbuildinfo files from client and server"
echo
rm client/tsconfig.tsbuildinfo 2> /dev/null
rm server/tsconfig.tsbuildinfo 2> /dev/null

echo "removing dist directories from client and server"
echo
rm -rf client/dist server/dist 2> /dev/null


echo "building shared library."
echo
tsc --build lib/tsconfig.json

echo "running tsc build and browserify'ing the client outFile"
tsc --build && browserify client/dist/index.js -o client/dist/main.js -d
echo


echo "starting server."
node ./server/dist/main.js &
echo

echo "sleeping a sec while node starts the process."
sleep 1
echo

echo "starting a local http server in the client/ directory."
http-server ./client -c-1 -p 8081 -o
