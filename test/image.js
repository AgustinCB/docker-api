import test from 'ava'
import fs from 'fs'
import { Image } from '../lib/image'
import { Docker } from '../lib/docker'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })
const testImage = 'ubuntu:latest'

test('list', async t => {
  const images = await docker.image.list()
  t.is(images.constructor, Array)
})

test('create', async t => {
  const stream = await docker.image.create({}, { fromImage: 'ubuntu' })
  t.truthy(stream.pipe)
})

test('status', async t => {
  const image = await docker.image.get(testImage).status()
  t.is(image.constructor, Image)
})

test('history', async t => {
  const history = await docker.image.get(testImage).history()
  t.is(history.constructor, Array)
})

test('tag', async t => {
  const image = await docker.image.get(testImage).tag({ tag: 'test', repo: 'root' })
  t.is(image.constructor, Image)
  t.not(image.data.RepoTags.indexOf('root:test'), -1)
})

test('search', async t => {
  const images = await docker.image.search({ term: 'ubuntu' })
  t.is(images.constructor, Array)
})

test('load', async t => {
  const stream = await docker.image.build(fs.createReadStream('./test/test.tar'))
  t.truthy(stream.pipe)
})

test('build', async t => {
  const result = await docker.image.build('./test/test.tar', { t: 'test' })
    .then((stream) => {
      t.truthy(stream.pipe)

      return new Promise((resolve, reject) => {
        const res = []
        stream.on('end',() => resolve(Buffer.concat(res).toString()))
        stream.on('data', (d) => res.push(d))
        stream.on('error', reject)
      })
    })
  const image = await docker.image.get('test').status()
  t.notThrows(image.remove())
})

test.after('prune', async t => {
  async function tryPrune(attempt = 5) {
    if (attempt > 0) {
      try {
        await docker.image.prune()
      } catch (e) {
        tryPrune(attempt - 1)
      }
    } else {
      t.truthy(await docker.image.prune())
    }
  }
  await tryPrune()
})
