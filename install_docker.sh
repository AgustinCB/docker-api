#!/bin/bash
set -euo pipefail

# argv[0]
DOCKER_VERSION=$1

service docker stop
apt-get -y --purge remove docker docker-engine docker.io

apt-get update
apt-get install -y apt-transport-https ca-certificates curl software-properties-common

# install gpg key for docker rpo
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
apt-key fingerprint 0EBFCD88

# enable docker repo
add-apt-repository \
  "deb [arch=amd64] https://download.docker.com/linux/ubuntu \
  $(lsb_release -cs) \
  stable"
apt-get update
apt-cache gencaches

# install package
apt-cache policy docker-ce
apt-get -y --force-yes install docker-ce=${DOCKER_VERSION}~ce-0~ubuntu
echo 'DOCKER_OPTS="-H unix:///var/run/docker.sock --pidfile=/var/run/docker.pid --experimental=true"' > /etc/default/docker
#cat /etc/default/docker

#service docker stop

#/usr/bin/dockerd -H unix:///var/run/docker.sock --pidfile=/var/run/docker.pid --experimental=true &

docker --version
