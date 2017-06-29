'use strict'

const Docker = require('node-docker-api').Docker

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

return docker.image.create({}, { fromImage: 'ubuntu', tag: 'latest' })
  .then((stream) => promisifyStream(stream))
  .then(() => docker.image.get('ubuntu').status())
  .then((image) => image.history())
  .then((events) => console.log(events))
  .catch((error) => console.log(error))
