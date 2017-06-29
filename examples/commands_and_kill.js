'use strict'
const Docker = require('node-docker-api').Docker

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

const docker = new Docker({ socketPath: '/var/run/docker.sock' })
let _container

docker.container.create({
  Image: 'ubuntu',
  Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ],
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => {
    _container = container
    return container.exec.create({
      AttachStdout: true,
      AttachStderr: true,
      Cmd: [ 'echo', 'test' ]
    })
  })
  .then((exec) => {
    return exec.start({ Detach: false })
  })
  .then((stream) => promisifyStream(stream))
  .then(() => _container.kill())
  .catch((error) => console.log(error))
