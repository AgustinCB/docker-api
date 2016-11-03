import fs from 'fs'
import { Docker } from '../lib/docker'

export function init() {
  const socket = process.env.DOCKER_SOCKET || '/var/run/docker.sock'
  const isSocket = fs.existsSync(socket) ? fs.statSync(socket).isSocket() : false

  return isSocket?
    new Docker() :
    new Docker({ socketPath: socket })
}
