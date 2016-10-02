# docker-api
[![travis-ci](https://travis-ci.org/AgustinCB/docker-api.png?branch=master)](https://travis-ci.org/AgustinCB/docker-api)

Docker Remote API driver for node.js. It uses the same modem than [dockerode](https://github.com/apocas/docker), but the interface is promisified and with a different syntax.

Support for:

* **streams**
* **stream demux**
* **entities**
* **run**
* **tests**
* **promises**
* **full es6 support**

The current status of the package is in beta state. This module covers the full [API reference](https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24), including experimental stuff such as plugins.

Check the [reference](https://github.com/AgustinCB/docker-api/tree/master/docs) and the [tests](https://github.com/AgustinCB/docker-api/tree/master/test) for full examples.

## Installation

`npm install node-docke-api`

## Usage

### Create, start, stop, restart and remove a container

``` js
const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.create({ 
  Image: 'ubuntu', 
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => container.stop())
  .then((container) => container.restart())
  .then((container) => container.remove({ force: true }))
```

### List, inspect and top containers

``` js
const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

// List
docker.container.list()
   // Inspect
  .then((containers) => containers[0].status())
  .then((container) => container.top())
  .then((processes) => console.log(processes))
```

### List, inspect and stat containers

``` js
const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

// List
docker.container.list()
   // Inspect
  .then((containers) => containers[0].status())
  .then((container) => container.stats())
  .then((stats) => {
    stats.on('data', (stat) => console.log('Stats: ',stat))
    stats.on('error', (err) => console.log('Error: ', err))
  })
```

### Get logs of a container

```js
const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })
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
```

### Export a container

``` js
const Docker = require('node-docker-api').Docker,
  fs = require('fs')

let docker = new Docker({ socketPath: '/var/run/docker.sock' })
let container

docker.container.create({ 
  Image: 'ubuntu', 
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => container.export())
  .then((stream) => {
    let file = fs.createWriteStream("container.tar");
    stream.pipe(file)
  })
```

### Manipulate file system in a container

``` js
const Docker = require('node-docker-api').Docker,
  fs = require('fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.create({ 
  Image: 'ubuntu', 
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => container.fs.put('file.txt', {
    path: '/root'
  }))
  .then((stream) => promisifyStream(stream))
  .then(() => container.fs.get('/root/file.txt'))
  .then((stream) => {
    let file = fs.createWriteStream("file.jpg");
    stream.pipe(file)
    return promisifyStream(stream)
  })
  .then(() => docker.container.status({ id: 'test' }))
  .then((container) => container.stop())
```

### Execute commands and kill containers

``` js
const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.create({ 
  Image: 'ubuntu', 
  name: 'test'
})
  .then((container) => container.start())
  .then((_container) => {
    container = _container
    return container.exec.create({
      Cmd: [ "top" ]
    })
  })
  .then((stream) => promisifyStream(stream))
  .then((exec) => {
    return exec.start()
  })
  .then((stream) => {
    stream.on('data', (info) => {
      console.log(info)
      _container.kill()
    })
    stream.on('error', (err) => console.log(err))
  })
```

### Build, inspect and remove an image

``` js
const Docker = require('node-docker-api').Docker,
  tar = require('tar-fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

var tarStream = tar.pack('/path/to/Dockerfile')
docker.image.build(tarStream, {
  'testimg'
})
  .then((stream) => promisifyStream(stream))
  .then(() => docker.image.status('testimg'))
  .then((image) => image.remove())
  
```

### Pull and check history of an image

``` js
const Docker = require('node-docker-api').Docker

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

return docker.image.create({ fromImage: 'ubuntu' })
  .then((stream) => promisifyStream(stream))
  .then(() => docker.image.status('ubuntu'))
  .then((image) => image.history())
  .then((events) => console.log(events))
```
