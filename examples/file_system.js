'use strict'
const Docker = require('node-docker-api').Docker,
  fs = require('fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

const docker = new Docker({ socketPath: '/var/run/docker.sock' })
let container

docker.container.create({
  Image: 'ubuntu',
  Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ],
  name: 'test'
})
  .then((container) => container.start())
  .then((_container) => {
    container = _container
    return _container.fs.put('./file.tar', {
      path: 'root'
    })
  })
  .then((stream) => promisifyStream(stream))
  .then(() => container.fs.get({ path: '/var/log/dmesg' }))
  .then((stream) => {
    const file = fs.createWriteStream("file.jpg");
    stream.pipe(file)
    return promisifyStream(stream)
  })
  .then(() => container.status())
  .then((container) => container.stop())
  .catch((error) => console.log(error))
