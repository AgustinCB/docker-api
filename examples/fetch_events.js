'use strict'

const Docker = require('node-docker-api').Docker,
    fs = require('fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
    stream.on('data', (d) => console.log(d.toString()))
    stream.on('end', resolve)
    stream.on('error', reject)
})

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.events({
    since: ((new Date().getTime() / 1000) - 60).toFixed(0)
})
  .then((stream) => promisifyStream(stream))
  .catch((error) => console.log(error))
