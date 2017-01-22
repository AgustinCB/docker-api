import test from 'ava'
import fs from 'fs'
import Node from '../lib/node'
import Service from '../lib/service'
import Swarm from '../lib/swarm'
import Task from '../lib/task'
import { Docker } from '../lib/docker'

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false
const docker = isSocket
  ? new Docker()
  : new Docker({ socketPath: socket })

const setupNode = async t => {
  const node = await docker.swarm.init({
    "ListenAddr": "127.0.0.1:4500",
    "AdvertiseAddr": "127.0.0.1:4500",
    "ForceNewCluster": false,
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
}

test('init', setupNode)

test('inspect', async t => {
  await setupNode(t)
  const swarm = await docker.swarm.status()
  t.is(swarm.constructor, Swarm)
})

let service

test('create-service', async t => {
  await setupNode(t)
  service = await docker.service.create({
    "Name": "redis",
    "TaskTemplate": {
      "ContainerSpec": {
        "Image": "redis"
      }
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
  console.log('asd', service)
  t.is(service.constructor, Service)
})

test('list-services', async t => {
  const services = await docker.service.list()
  t.is(services.constructor, Array)
})

test('inspect-service', async t => {
  const _service = await service.status()
  t.is(_service.constructor, Service)
})

test('update-service', async t => {
  const _service = await service.update({
    "version": 12,
    "Name": "redis",
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
  t.is(_service.constructor, Service)
})

test('remove-service', async t => {
  console.log(service)
  t.notThrows(service.remove())
})

let task

test('list-tasks', async t => {
  const tasks = await docker.task.list()
  t.is(tasks.constructor, Array)
  if (tasks.length > 0) {
    task = tasks[0]
  }
})

if (task) {
  test("inspect-task", async t => {
    const _task = await task.status()
    t.is(_task.constructor, Task)
  })
}

let node

test('list-nodes', async t => {
  const nodes = await docker.node.list()
  t.is(nodes.constructor, Array)
  node = nodes[0]
  t.is(node.constructor, Node)
})

test('status-node', async t => {
  const _node = await node.status()
  t.is(_node.constructor, Node)
})

test ('remove-node', async t => {
  // error is [Error: (HTTP code 500) server error - rpc error: code = 9 desc = node xxxxxxxxxx is a cluster manager and is a member of the raft cluster. It must be demoted to worker before removal ] 
  t.throws(node.remove())
})

test('leave-swarm', async t => {
  t.notThrows(docker.swarm.leave({
    'force': true
  }))
})

