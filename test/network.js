import chai from 'chai'
import fs from 'fs'
import * as test_utils from './utils'
import Network from '../lib/network'

const should = chai.should()

let docker = test_utils.init()

describe('#network', function () {
  describe('#list', function () {
    it('should receive an array of networks', function () {
      this.timeout(30000)
      return docker.network.list()
        .then((networks) => {
          networks.should.be.an('array')
        })
    })
  })

  describe('#create', function () {
    it('should create an network and remove it', function () {
      this.timeout(300000)
      return docker.network.create({
          "Name": "test",
          "Driver": "bridge",
        })
        .then((network) => {
          network.should.be.ok
          return network.remove()
        })
    })
  })

  describe('#status', function () {
    it('should check status of an network', function () {
      this.timeout(30000)
      return docker.network.create({
          "Name": "test",
          "Driver": "bridge",
        })
        .then((network) => {
          network.should.be.instanceof(Network)
          return network.status()
        })
        .then((network) => {
          network.should.be.ok
          return network.remove()
        })
    })
  })
})
