#! /bin/bash

docker pull ubuntu:latest
./node_modules/.bin/ava --timeout 30000 test
exit $?
