const Docker = require('node-docker-api').Docker,
  tar = require('tar-fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

const docker = new Docker({ socketPath: '/var/run/docker.sock' })

var tarStream = tar.pack('/path/to/Dockerfile')
docker.image.build(tarStream, {
  t: 'testimg'
})
  .then((stream) => promisifyStream(stream))
  .then(() => docker.image.get('testimg').status())
  .then((image) => image.remove())
  .catch((error) => console.log(error))
