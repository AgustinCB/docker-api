import fs from 'fs'
import { Docker } from '../lib/docker'

export function init() {
  const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
  const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false

  let docker
  if (isSocket) {
    docker = new Docker()
  } else {
    docker = new Docker({ socketPath: socket })
  }
  return docker
}
