#! /bin/bash

docker pull ubuntu:latest
./node_modules/standard/bin/cmd.js src
./node_modules/.bin/ava --timeout 30000 test
exit $?
