#!/bin/bash

set -x

rm client/tsconfig.tsbuildinfo 2> /dev/null
rm server/tsconfig.tsbuildinfo 2> /dev/null
# rm model/tsconfig.tsbuildinfo 2> /dev/null
   
rm -rf client/dist server/dist 2> /dev/null
