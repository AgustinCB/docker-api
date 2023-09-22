docker pull ubuntu:latest
echo Not linting as there is no tslint for win
"./node_modules/.bin/ava" --timeout 30000 test
