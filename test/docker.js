import chai from 'chai'
import Docker from '../lib/docker'
import fs from 'fs'

chai.should()

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
        .then(() => {
          done()
        })
        .catch((err) => {
          expect(err).to.be.null
        })
    })
  })
})
