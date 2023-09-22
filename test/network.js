import test from 'ava'
import fs from 'fs'
import { Network } from '../src/network'
import { Docker } from '../src/docker'
import {platform} from "process"


const socket = process.env.DOCKER_SOCKET || platform == "win32" ? '\\\\.\\pipe\\docker_engine': '/var/run/docker.sock'
const docker = new Docker({ socketPath: socket })

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

test.after('prune', async t => {
  async function tryPrune(attempt = 5) {
    if (attempt > 0) {
      try {
        await docker.network.prune()
      } catch (e) {
        tryPrune(attempt - 1)
      }
    } else {
      t.truthy(await docker.network.prune())
    }
  }
  await tryPrune()
})
