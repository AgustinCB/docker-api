import test from 'ava'
import fs from 'fs'
import { Docker } from '../lib/docker'
import { Volume } from '../lib/volume'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })

test('list', async t => {
  const volumes = await docker.volume.list()
  t.is(volumes.constructor, Array)
})

test('create', async t => {
  const volume = await docker.volume.create({
    "Name": "tardis1",
    "Labels": {
      "com.example.some-label": "some-value",
      "com.example.some-other-label": "some-other-value"
    },
    "Driver": "local"
  })

  t.is(volume.constructor, Volume)
  t.notThrows(volume.remove())
})

test('status', async t => {
  const volume = await docker.volume.create({
    "Name": "tardis2",
    "Labels": {
      "com.example.some-label": "some-value",
      "com.example.some-other-label": "some-other-value"
    },
    "Driver": "local"
  })
  const volumeStatus = await volume.status()
  t.is(volumeStatus.constructor, Volume)
  t.notThrows(volume.remove())
})

test.after('prune', async t => {
  t.truthy(await docker.volume.prune())
})
