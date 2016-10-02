import chai from 'chai'
import * as test_utils from './utils'
import Node from '../lib/node'
import Service from '../lib/service'
import Swarm from '../lib/swarm'
import Task from '../lib/task'

const should = chai.should()

let docker = test_utils.init()

describe("#swarm", function () {
  describe("#initSwarm", function () {
    it("should init swarm", function () {
      this.timeout(5000)

      return docker.swarm.init({
        "ListenAddr": "0.0.0.0:4500",
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
        .then((data) => {
          data.should.be.ok
        })
    })

    it("should inspect swarm", function () {
      return docker.swarm.status()
        .then((swarm) => {
          swarm.should.be.instanceof(Swarm)
        })
    })
  })

  describe("#services", function () {
    let service

    it("should create service", function () {
      this.timeout(5000)

      return docker.service.create({
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
        .then((s) => {
          s.should.be.instanceof(Service)
          service = s
        })
    })

    it("should list services", function () {
      this.timeout(5000)

      return docker.service.list()
        .then((services) => {
          services.should.be.a('array')
        })
    })

    it("should inspect service", function () {
      return service.status()
        .then((s) => {
          s.should.be.instanceof(Service)
        })
    })

    it("should update service", function () {
      return service.update({
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
      .then((s) => {
        s.should.be.instanceof(Service)
      })
    })

    it("should delete service", function () {
      this.timeout(5000)

      return service.remove()
    })
  })

  describe("#tasks", function () {
    let task

    describe("#listTasks", function () {
      it("should list tasks", function () {
        this.timeout(5000)

        return docker.task.list()
          .then((tasks) => {
            tasks.should.be.a('array')
            if (tasks.length > 0) {
              task = tasks[0]
            }
          })
      })

      if (task) {
        it("should inspect task", function () {
          return task.inspect(handler)
            .then((t) => {
              t.should.be.instanceof(Task)
            })
        })
      }
    })
  })

  describe("#nodes", function () {
    let node

    describe("#listNodes", function () {
      it("should list nodes", function () {
        this.timeout(5000)

        return docker.node.list()
          .then((nodes) => {
            nodes.should.be.an('array')
            node = nodes[0]
            node.should.be.instanceof(Node)
          })
      })

      it("should inspect node", function () {
        return node.status()
          .then((n) => {
            n.should.be.instanceof(Node)
          })
      })

      it("should remove node", function () {
        return node.remove()
          .catch((err) => {
            // error is [Error: (HTTP code 500) server error - rpc error: code = 9 desc = node xxxxxxxxxx is a cluster manager and is a member of the raft cluster. It must be demoted to worker before removal ] 
            err.should.not.be.null
            err.json.message.indexOf('code = 9').should.not.equal(-1)
          })
      })
    })
  })

  describe("#leaveSwarm", function () {
    it("should leave swarm", function () {
      this.timeout(5000)

      return docker.swarm.leave({
          'force': true
      })
    })
  })
})
