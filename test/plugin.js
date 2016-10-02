import chai from 'chai'
import fs from 'fs'
import * as test_utils from './utils'
import Plugin from '../lib/plugin'


const should = chai.should()

let docker = test_utils.init()

describe('#plugin', function () {
  /* Docker plugins support is experimental for now */
  return
  describe('#list', function () {
    it('should receive an array of plugins', function () {
      this.timeout(30000)
      return docker.plugin.list()
        .then((plugins) => {
          plugins.should.be.an('array')
        })
    })
  })

  describe('#install', function () {
    it('should install an plugin and uninstall it', function () {
      this.timeout(300000)
      return docker.plugin.install({
          "name": "tiborvass/no-remove:latest"
        })
        .then((plugin) => {
          plugin.should.be.ok
          return plugin.remove()
        })
    })
  })

  describe('#status', function () {
    it('should check status of a plugin', function () {
      this.timeout(30000)
      return docker.plugin.install({
          "name": "tiborvass/no-remove:latest"
        })
        .then((plugin) => {
          plugin.should.be.instanceof(Plugin)
          return plugin.status()
        })
        .then((plugin) => {
          plugin.should.be.instanceof(Plugin)
          return plugin.remove()
        })
    })
  })

  describe('#enable', function () {
    it('should check enable and disable a plugin', function () {
      this.timeout(30000)
      return docker.plugin.install({
          "name": "tiborvass/no-remove:latest"
        })
        .then((plugin) => {
          plugin.should.be.instanceof(Plugin)
          return plugin.enable()
        })
        .then((plugin) => {
          plugin.should.be.instanceof(Plugin)
          return plugin.disable()
        })
        .then((plugin) => {
          plugin.should.be.instanceof(Plugin)
          return plugin.remove()
        })
    })
  })
})
