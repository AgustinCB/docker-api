import test from 'ava'
import fs from 'fs'
import Network from '../lib/network'
import { Docker } from '../lib/docker'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })

test('list', async t => {
  const networks = await docker.network.list()
  t.is(networks.constructor, Array)
})

test('create', async t => {
  const network = await docker.network.create({
    "Name": "test",
    "Driver": "bridge",
  })
  t.is(network.constructor, Network)
  t.notThrows(network.remove())
})

test('status', async t => {
  const network = await docker.network.create({
    "Name": "test",
    "Driver": "bridge",
  })
  t.is(network.constructor, Network)
  const networkStatus = await network.status()
  t.is(networkStatus.constructor, Network)
  t.notThrows(network.remove())
})
