# docker-api

Docker Remote API driver for node.js. It uses the same modem than [dockerode](https://github.com/apocas/docker), but the implementation is promisified and with a different syntax.

Support for:

* **streams**
* **stream demux**
* **entities**
* **run**
* **tests**
* **promises**

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
