import chai from 'chai'
import fs from 'fs'
import * as test_utils from './utils'
import Image from '../lib/image'

const should = chai.should()

let docker = test_utils.init()
let testImage = 'ubuntu:latest'

describe('#image', function () {
  describe('#list', function () {
    it('should receive an array of images', function () {
      this.timeout(30000)
      return docker.image.list()
        .then((images) => {
          images.should.be.an('array')
        })
    })
  })

  describe('#build', function () {
    it('should build an image from file and remove it', function () {
      this.timeout(300000)
      return docker.image.build('./test/test.tar', { t: 'test' })
        .then((stream) => {
          stream.pipe.should.be.ok

          return new Promise((resolve, reject) => {
            let res = []
            stream.on('end',() => resolve(Buffer.concat(res).toString()))
            stream.on('data', (d) => res.push(d))
            stream.on('error', reject)
          })
        })
        .then((result) => {
          return docker.image.status('test')
        })
        .then((image) => {
          return image.remove()
        })
    })
  })

  describe('#create', function () {
    it('should create an image from another', function () {
      this.timeout(300000)
      return docker.image.create({}, { fromImage: 'ubuntu' })
        .then((stream) => {
          stream.pipe.should.be.ok
        })
        
    })
  })

  describe('#status', function () {
    it('should check status of an image', function () {
      this.timeout(30000)
      return docker.image.status(testImage)
        .then((image) => {
          image.should.be.instanceof(Image)
        })
    })
  })

  describe('#history', function () {
    it('should return history of an image', function () {
      this.timeout(30000)
      return docker.image.history(testImage)
        .then((data) => {
          data.should.be.an('array')
        })
    })
  })

  describe('#tag', function () {
    it('should tag an image', function () {
      this.timeout(30000)
      return docker.image.tag({ tag: 'test', repo: 'root' }, testImage)
        .then((image) => {
          image.should.be.instanceof(Image)
          return image.status()
        })
        .then((image) => {
          image.RepoTags.indexOf('root:test').should.not.be.equal(-1)
        })
    })
  })

  describe('#search', function () {
    it('should search an image in docker hub', function () {
      this.timeout(300000)
      return docker.image.search({ term: 'ubuntu' })
        .then((results) => {
          results.should.be.an('array')
        })
        
    })
  })

  describe('#load', function () {
    it('should load an image from file', function () {
      this.timeout(300000)
      return docker.image.build(fs.createReadStream('./test/test.tar'))
        .then((stream) => {
          stream.pipe.should.be.ok
        })
    })
  })
})
