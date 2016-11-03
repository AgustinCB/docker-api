import chai from 'chai'
import * as test_utils from './utils'

const should = chai.should()

const docker = test_utils.init()

describe('#docker', function() {
  describe('#ping', function() {
    it('should ping server', function () {
      this.timeout(30000)

      return docker.ping()
    })
  })
  describe('#version', function() {
    it('should retrieve version from server', function () {
      this.timeout(30000)

      return docker.version()
        .then((data) => {
          data.Version.should.be.a("string")
        })
    })
  })
  describe('#info', function() {
    it('should retrieve info from server', function () {
      this.timeout(30000)

      return docker.info()
        .then((data) => {
          data.ServerVersion.should.be.a("string")
        })
    })
  })
  describe('#auth', function () {
    it('should fail to auth', function () {
      this.timeout(30000)

      return docker.auth({
        username: "AgustinCB",
        password:" AgustinIsAwesome"
      })
        .then((data) => {
          should.not.exist(data)
        })
        .catch((err) => {
          err.should.be.ok
        })
    })
  })
})
