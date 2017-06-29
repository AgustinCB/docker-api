const Docker = require('node-docker-api').Docker

const docker = new Docker({ socketPath: '/var/run/docker.sock' })
let container

docker.container.create({
  Image: 'ubuntu',
  name: 'test'
})
  .then((container) => container.logs({
    follow: true,
    stdout: true,
    stderr: true
  }))
  .then((stream) => {
    stream.on('data', (info) => console.log(info))
    stream.on('error', (err) => console.log(err))
  })
  .catch((error) => console.log(error))
