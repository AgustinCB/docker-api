import test from 'ava'
import fs from 'fs'
import { Docker } from '../lib/docker'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })

test('ping', async t => {
  t.is(await docker.ping(), "OK")
})

test('version', async t => {
  const data = await docker.version()
  t.truthy(data)
  t.is(data.Version.constructor, String)
})

test('info', async t => {
  const data = await docker.info()
  t.truthy(data)
  t.is(data.ServerVersion.constructor, String)
})

test('auth', async t => {
  t.throws(docker.auth({
    username: "AgustinCB",
    password: "AgustinIsAwesome"
  }))
})

test('events', async t => {
  const data = await docker.events({
    since: ((new Date().getTime() / 1000) - 60).toFixed(0)
  })
  t.truthy(data)
})
