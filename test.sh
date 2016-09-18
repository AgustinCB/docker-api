#! /bin/bash

./node_modules/standard/bin/cmd.js src
mkdir test_tmp
./node_modules/babel-cli/bin/babel.js test --presets babel-preset-es2015 --out-dir test_tmp
./node_modules/mocha/bin/mocha --require babel-core/register -R spec test_tmp
rm -fr test_tmp
