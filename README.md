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
  .then((container) => container.delete({ force: true }))
  .catch((error) => console.log(error))
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
  .catch((error) => console.log(error))
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
  .catch((error) => console.log(error))
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
  .catch((error) => console.log(error))
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
  .then((content) => {
    let file = fs.createWriteStream("container.tar");
    file.end(content)
  })
  .catch((error) => console.log(error))
```

### Manipulate file system in a container

``` js
const Docker = require('node-docker-api').Docker,
  fs = require('fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })
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
    let file = fs.createWriteStream("file.jpg");
    stream.pipe(file)
    return promisifyStream(stream)
  })
  .then(() => container.status())
  .then((container) => container.stop())
  .catch((error) => console.log(error))
```

### Execute commands and kill containers

``` js
const Docker = require('node-docker-api').Docker

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  console.log(stream);
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.create({ 
  Image: 'ubuntu', 
  Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  name: 'test'
})
  .then((container) => container.start())
  .then((_container) => {
    container = _container
    return container.exec.create({
      Cmd: [ "top" ]
    })
  })
  .then((exec) => {
    return exec.start()
  })
  .then((stream) => {
    stream.on('data', (info) => {
      console.log(info.toString())
      _container.kill()
    })
    stream.on('error', (err) => console.log(err))
  })
  .catch((error) => console.log(error))
```

### Build, inspect and remove an image

``` js
const Docker = require('node-docker-api').Docker,
  tar = require('tar-fs')

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

var tarStream = tar.pack('/path/to/Dockerfile')
docker.image.build(tarStream, {
  t: 'testimg'
})
  .then((stream) => promisifyStream(stream))
  .then(() => docker.image.status('testimg'))
  .then((image) => image.remove())
  .catch((error) => console.log(error))
```

### Pull and check history of an image

``` js
const Docker = require('node-docker-api').Docker

const promisifyStream = (stream) => new Promise((resolve, reject) => {
  stream.on('data', (d) => console.log(d.toString()))
  stream.on('end', resolve)
  stream.on('error', reject)
})

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

return docker.image.create({}, { fromImage: 'ubuntu', tag: 'latest' })
  .then((stream) => promisifyStream(stream))
  .then(() => docker.image.status('ubuntu'))
  .then((image) => image.history())
  .then((events) => console.log(events))
  .catch((error) => console.log(error))
```
