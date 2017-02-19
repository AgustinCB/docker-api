import test from 'ava'
import fs from 'fs'
import { Container } from '../lib/container'
import { Image } from '../lib/image'
import {default as MemoryStream} from 'memorystream'
import { Docker } from '../lib/docker'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })

const createContainer = (name, extra) =>
  docker.container.create(Object.assign({ Image: 'ubuntu', name: containerNames.get(name) }, extra))
const containerNames = new Map([
  [ 'create', 'docker_api_test_create' ],
  [ 'inspect', 'docker_api_test_inspect' ],
  [ 'top', 'docker_api_test_top' ],
  [ 'logs', 'docker_api_test_logs' ],
  [ 'changes', 'docker_api_test_changes' ],
  [ 'export', 'docker_api_test_export' ],
  [ 'stats', 'docker_api_test_stats' ],
  [ 'resize', 'docker_api_test_resize' ],
  [ 'prune', 'docker_api_test_prune' ],
  [ 'start', 'docker_api_test_start' ],
  [ 'stop', 'docker_api_test_stop' ],
  [ 'restart', 'docker_api_test_restart' ],
  [ 'kill', 'docker_api_test_kill' ],
  [ 'update', 'docker_api_test_update' ],
  [ 'rename', 'docker_api_test_rename' ],
  [ 'rename_prev', 'docker_api_test_rename_prev' ],
  [ 'pause', 'docker_api_test_pause' ],
  [ 'attach', 'docker_api_test_attach' ],
  [ 'commit', 'docker_api_test_commit' ],
  [ 'exec', 'docker_api_test_exec' ],
  [ 'inspect_exec', 'docker_api_test_inspect_exec' ],
  [ 'get_archive', 'docker_api_test_get_archive' ],
  [ 'put_archive', 'docker_api_test_put_archive' ],
  [ 'info_archive', 'docker_api_test_info_archive' ]
])

test('list', async t => {
  const containers = await docker.container.list()
  t.is(containers.constructor, Array)
})

test('should create a container', async t => {
  const container = await createContainer('create')
  t.is(container.constructor, Container)
})

test('inspect', async t => {
  const container = await createContainer('inspect')
  const containerStatus = await container.status()
  t.is(containerStatus.constructor, Container)
})

test('top', async t => {
  const container = await createContainer('top', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const processes = await container.top()
  t.is(processes.Processes.constructor, Array)
})

test('log', async t => {
  const container = await createContainer('logs', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const logs = await container.logs({ stdout: 1, follow: true })
  t.truthy(logs.pipe)
})

test('changes', async t => {
  const container = await createContainer('changes', {
    Cmd: [ '/bin/bash', '-c', 'echo "xfoo" > foo.txt' ], 
  })
  await container.start()
  const changes = await container.changes()
  t.is(changes.constructor, Array)
})

test('export', async t => {
  const container = await createContainer('export')
  const result = container.export({ stream: false })
  t.truthy(result)
})

test('stats', async t => {
  const container = await createContainer('stats', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const stats = await container.stats()
  t.truthy(stats.pipe)
})

test('resize', async t => {
  const container = await createContainer('resize', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const result = await container.stats({
    h: process.stdout.rows,
    w: process.stdout.columns
  })
  t.truthy(result.pipe)
})

test('prune', async t => {
  const container = await createContainer('prune')
  t.notThrows(docker.container.prune())
})

test('start', async t => {
  const container = await createContainer('start', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  const result = await container.start()
  t.is(result.constructor, Container)
})

test('stop', async t => {
  const container = await createContainer('stop', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  await container.stop()
  const containerStatus = await container.status()
  t.is(containerStatus.data.State.Status, 'exited')
})

test('restart', async t => {
  const container = await createContainer('restart', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  await container.restart()
  const containerStatus = await container.status()
  t.is(containerStatus.data.State.Status, 'running')
})

test('kill', async t => {
  const container = await createContainer('kill', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  await container.kill()
  const containerStatus = await container.status()
  t.is(containerStatus.data.State.Status, 'exited')
})

test('update', async t => {
  const container = await createContainer('update', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.update({ 'CpuShares': 512 })
  const containerStatus = await container.status()
  t.is(containerStatus.data.HostConfig.CpuShares, 512)
})

test('rename', async t => {
  const container = await createContainer('rename_prev', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.rename({ 'name': containerNames.get('rename') })
  const containerStatus = await container.status()
  t.is(containerStatus.data.Name, '/' + containerNames.get('rename'))
})

test('pause', async t => {
  const container = await createContainer('pause', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  await container.pause()
  const containerStatus = await container.status()
  t.is(containerStatus.data.State.Status, 'paused')
  await container.unpause()
  const containerStatus2 = await container.status()
  t.is(containerStatus2.data.State.Status, 'running')
})

test('commit', async t => {
  const container = await createContainer('commit', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const image = await container.commit({ comment: 'commit test' })
  t.is(image.constructor, Image)
})

test('exec', async t => {
  const container = await createContainer('exec', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const exec = await container.exec.create({
    Cmd: [ "top" ]
  })
  const stream = await exec.start()
  t.truthy(stream.pipe)
})

test('exec-status', async t => {
  const container = await createContainer('inspect_exec', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  await container.start()
  const exec = await container.exec.create({
    Cmd: [ "top" ]
  })
  const execStatus = await exec.status()
  t.is(exec.constructor, execStatus.constructor)
})

test('attach', async t => {
  const container = await createContainer('attach', {
    'AttachStdin': false,
    'AttachStdout': true,
    'AttachStderr': true,
    'Tty': false,
    'OpenStdin': false,
    'StdinOnce': false,
    'Env': null,
    'Cmd': ['/bin/bash', '-c', 'uptime'],
    'Dns': ['8.8.8.8', '8.8.4.4'],
    'Image': 'ubuntu',
  })
  const result = await container.attach({
    stream: true,
    stdout: true,
    stderr: true
  })
  const stream = result[0]
  t.truthy(stream)

  await container.start()
  const code = await container.wait()
  t.is(code.StatusCode.constructor, Number)
})

test('get-archive', async t => {
  const container = await createContainer('get_archive', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  const data = await container.fs.get({ path: '/var/log/dmesg' })
  t.truthy(data)
})

test('put-archive', async t => {
  const container = await createContainer('put_archive', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  const data = await container.fs.put('./test/test.tar', {
    path: '/root'
  })
  t.truthy(data)
})

test('inspect-archive', async t => {
  const container = await createContainer('info_archive', {
    Cmd: [ '/bin/bash', '-c', 'tail -f /var/log/dmesg' ], 
  })
  const data = await container.fs.info({ path: '/var/log/dmesg' })
  t.truthy(data)
})

test.after.always('cleanup', async t => {
  const promises = Array.from(containerNames.values()).map((name) =>
    docker.container.get(name).stop()
      .then((container) => {
        return container.delete({ force: true })
      })
      .catch((err) => console.log(err))
  )
  t.notThrows(Promise.all(promises))
})
