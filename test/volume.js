import chai from 'chai'
import fs from 'fs'
import * as test_utils from './utils'
import Volume from '../lib/volume'

const should = chai.should()

let docker = test_utils.init()

describe('#volume', function () {
  describe('#list', function () {
    it('should receive an array of volumes', function () {
      this.timeout(30000)
      return docker.volume.list()
        .then((volumes) => {
          volumes.should.be.an('array')
        })
    })
  })

  describe('#create', function () {
    it('should create an volume and remove it', function () {
      this.timeout(300000)
      return docker.volume.create({
          "Name": "tardis",
          "Labels": {
            "com.example.some-label": "some-value",
            "com.example.some-other-label": "some-other-value"
          },
          "Driver": "local"
        })
        .then((volume) => {
          volume.should.be.ok
          return volume.remove()
        })
    })
  })

  describe('#status', function () {
    it('should check status of an volume', function () {
      this.timeout(30000)
      return docker.volume.create({
          "Name": "tardis",
          "Labels": {
            "com.example.some-label": "some-value",
            "com.example.some-other-label": "some-other-value"
          },
          "Driver": "local"
        })
        .then((volume) => {
          volume.should.be.instanceof(Volume)
          return volume.status()
        })
        .then((volume) => {
          volume.should.be.ok
          return volume.remove()
        })
    })
  })
})
