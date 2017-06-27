#!/bin/bash
set -euo pipefail

# argv[0]
DOCKER_VERSION=$1

service docker stop
apt-get -y --purge remove docker-engine

# install gpg key for docker rpo
apt-key adv --keyserver hkp://p80.pool.sks-keyservers.net:80 --recv 58118E89F3A912897C070ADBF76221572C52609D

# enable docker repo
echo 'deb "https://apt.dockerproject.org/repo" ubuntu-trusty main' >> /etc/apt/sources.list.d/docker-main.list
apt-get update -o Dir::Etc::sourcelist='sources.list.d/docker-main.list' -o Dir::Etc::sourceparts='-' -o APT::Get::List-Cleanup='0'
apt-cache gencaches

# install package
apt-get -y --force-yes install docker-engine=${DOCKER_VERSION}-0~ubuntu-trusty
echo 'DOCKER_OPTS="-H unix:///var/run/docker.sock --pidfile=/var/run/docker.pid --experimental=true"' > /etc/default/docker
cat /etc/default/docker

service docker stop

/usr/bin/dockerd -H unix:///var/run/docker.sock --pidfile=/var/run/docker.pid --experimental=true &

docker --version
