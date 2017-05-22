import test from 'ava'
import fs from 'fs'
import { Node } from '../lib/node'
import { Secret } from '../lib/secret'
import { Service } from '../lib/service'
import Swarm from '../lib/swarm'
import { Task } from '../lib/task'
import { Docker } from '../lib/docker'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })

const createService = _ =>
  docker.service.create({
    "Name": "redis-" + Date.now(),
    "TaskTemplate": {
      "ContainerSpec": {
        "Image": "redis"
      },
      "Resources": {
        "Limits": {},
        "Reservations": {}
      },
      "RestartPolicy": {},
      "Placement": {}
    },
    "Mode": {
      "Replicated": {
        "Replicas": 1
      }
    },
    "UpdateConfig": {
      "Parallelism": 1
    },
    "EndpointSpec": {
      "ExposedPorts": [{
        "Protocol": "tcp",
        "Port": 6379
      }]
    }
  })

test.before(async t => {
  const node = await docker.swarm.init({
    "ListenAddr": "127.0.0.1:4500",
    "AdvertiseAddr": "127.0.0.1:4500",
    "ForceNewCluster": true,
    "Spec": {
      "AcceptancePolicy": {
        "Policies": [{
          "Role": "MANAGER",
          "Autoaccept": false
        }, {
          "Role": "WORKER",
          "Autoaccept": true
        }]
      },
      "Orchestration": {},
      "Raft": {},
      "Dispatcher": {},
      "CAConfig": {}
    }
  })
  t.is(node.constructor, Node)
})

test.after('cleanup', t => {
  docker.swarm.leave({ 'force': true })
})

test('inspect', async t => {
  const swarm = await docker.swarm.status()
  t.is(swarm.constructor, Swarm)
})

test('create-service', async t => {
  const service = await createService()
  t.is(service.constructor, Service)
})

test('list-services', async t => {
  const service = await createService()
  const services = await docker.service.list()
  t.is(services.constructor, Array)
  t.not(services.length, 0)
})

test('inspect-service', async t => {
  const service = await (await createService()).status()
  t.is(service.constructor, Service)
})

test('update-service', async t => {
  const service = await (await createService()).status()
  const data = service.data.Spec
  data.version = service.data.Version.Index
  const res = await service.update(data)
  t.is(res.constructor, Service)
})

test('delete-service', async t => {
  const service = await (await createService()).status()
  t.notThrows(service.remove())
})

test('logs-service', async t => {
  const res = await (await createService()).logs({stdout: true})
  t.truthy(res.pipe)
})
      

test('list-tasks', async t => {
  const tasks = await docker.task.list()
  t.is(tasks.constructor, Array)
})
  
test('list-nodes', async t => {
  const nodes = await docker.node.list()
  t.is(nodes.constructor, Array)
  t.is(nodes[0].constructor, Node)
})

test('inspect-node', async t => {
  const nodes = await docker.node.list()
  const node = await nodes[0].status()
  t.is(node.constructor, Node)
})

test('remove-node', async t => {
  const nodes = await docker.node.list()
  const node = await nodes[0].status()
  t.throws(node.remove())
})

test('list-secret', async t => {
  const secrets = await docker.secret.list()
  t.is(secrets.constructor, Array)
})

test('create-secret', async t => {
  const secret = await docker.secret.create({
		"Name": "app-key.crt",
		"Labels": {
			"foo": "bar"
		},
		"Data": "VEhJUyBJUyBOT1QgQSBSRUFMIENFUlRJRklDQVRFCg=="
	})

  t.is(secret.constructor, Secret)
  t.notThrows(secret.remove())
})

test('status-secret', async t => {
  const secret = await docker.secret.create({
		"Name": "app-key1.crt",
		"Data": "VEhJUyBJUyBOT1QgQSBSRUFMIENFUlRJRklDQVRFCg=="
	})
	const secretStatus = await secret.status()

  t.is(secretStatus.constructor, Secret)
  t.notThrows(secret.remove())
})
