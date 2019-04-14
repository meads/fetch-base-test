#!/bin/bash

echo "removing tsconfig.tsbuildinfo file from lib."
echo
rm lib/tsconfig.tsbuildinfo 2> /dev/null

echo "removing dist directory from lib."
echo
rm -rf lib/dist 2> /dev/null
