const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.create({
  Image: 'ubuntu',
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => container.stop())
  .then((container) => container.restart())
  .then((container) => container.delete({ force: true }))
  .catch((error) => console.log(error))
