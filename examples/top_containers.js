const Docker = require('node-docker-api').Docker

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

// List
docker.container.list()
   // Inspect
  .then((containers) => containers[0].status())
  .then((container) => container.top())
  .then((processes) => console.log(processes))
  .catch((error) => console.log(error))
