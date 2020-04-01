#!/bin/bash

./bin/clean-and-build.sh

echo "running server-side test"
node ./server/dist/script.js
echo 

echo "sleeping a few seconds while node tests run."
sleep 3
echo



echo "Ok now running the client side tests"
echo


echo "starting server."
node ./server/dist/main.js &
echo

echo "sleeping a sec while node starts the process."
sleep 1
echo

echo "starting a local http server in the client/ directory."
http-server ./client -c-1 -p 8081 -o
