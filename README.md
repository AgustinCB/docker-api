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

Check the [reference](https://github.com/AgustinCB/docker-api/tree/master/docs).

## Installation

`npm install node-docke-api`

## Usage

Check tests for a more general usage. 

``` js
const Docker = require('node-docker-api').Docker

let docker = new Docker({ socketPath: '/var/run/docker.sock' })

docker.container.create({ 
  Image: 'ubuntu', 
  name: 'test'
})
  .then((container) => container.start())
  .then((container) => container.fs.put('file.txt'), {
    path: '/root'
  })
  .then((container) => container.stop())
```
