const Docker = require('node-docker-api').Docker,
  fs = require('fs')

const docker = new Docker({ socketPath: '/var/run/docker.sock' })
let container

docker.container.create({
  Image: 'ubuntu',
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => container.export())
  .then((content) => {
    const file = fs.createWriteStream("container.tar");
    file.end(content)
  })
  .catch((error) => console.log(error))
