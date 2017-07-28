const Docker = require('node-docker-api').Docker

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

// List
docker.container.list()
   // Inspect
  .then((containers) => containers[0].status())
  .then((container) => container.stats())
  .then((stats) => {
    stats.on('data', (stat) => console.log('Stats: ', stat.toString()))
    stats.on('error', (err) => console.log('Error: ', err))
  })
  .catch((error) => console.log(error))
