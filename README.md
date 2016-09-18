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

The current status of the package is in development. From the [API reference](https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24), there's full support and test for sections 3.1, 3.2, 3.3 and 3.4.

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
