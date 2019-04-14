#!/bin/bash

set -e

echo "building shared library."
echo

tsc --build lib/tsconfig.json
