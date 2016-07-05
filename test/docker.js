import chai from 'chai'
import Docker from '../lib/docker'
import fs from 'fs'

const should = chai.should()

const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false

let docker
if (isSocket) {
  docker = new Docker()
} else {
  docker = new Docker({ socketPath: socket })
}

describe('#docker', function() {
  describe('#ping', function() {
    it('should ping server', function(done) {
      this.timeout(30000)

      docker.ping()
        .then((data) => {
          done()
        })
        .catch((err) => {
          should.not.exist(err)
          done()
        })
    })
  })
  describe('#version', function() {
    it('should retrieve version from server', function(done) {
      this.timeout(30000)

      docker.version()
        .then((data) => {
          data.Version.should.be.a("string")
          done()
        })
        .catch((err) => {
          should.not.exist(err)
          done()
        })
    })
  })
  describe('#info', function() {
    it('should retrieve info from server', function(done) {
      this.timeout(30000)

      docker.info()
        .then((data) => {
          data.ServerVersion.should.be.a("string")
          done()
        })
        .catch((err) => {
          should.not.exist(err)
          done()
        })
    })
  })
  describe('#auth', function() {
    it('should fail to auth', function(done) {
      this.timeout(30000)

      docker.auth({
        username: "AgustinCB",
        password:" AgustinIsAwesome"
      })
        .then((data) => {
          should.not.exist(data)
          done()
        })
        .catch((err) => {
          should.exist(err)
          done()
        })
    })
  })
})
