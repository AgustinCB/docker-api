#! /bin/bash

set -euo pipefail

docker pull ubuntu:latest
npm run lint
./node_modules/.bin/ava --timeout 30000 test
