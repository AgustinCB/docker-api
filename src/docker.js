'use strict'

import { default as Modem } from 'docker-modem'
import Container from './container'
import Image from './image'
import Volume from './volume'
import Network from './network'
import Node from './node'
import Swarm from './swarm'
import Service from './service'
import Task from './task'

export class Docker {
  constructor (opts) {
    this.modem = new Modem(opts)

    this.container = new Container(this.modem)
    this.image = new Image(this.modem)
    this.volume = new Volume(this.modem)
    this.network = new Network(this.modem)
    this.node = new Node(this.modem)
    this.swarm = new Swarm(this.modem)
    this.service = new Service(this.modem)
    this.task = new Task(this.modem)
  }

  /*
   * Validate credentials for a registry and get identity token,
   * if available, for accessing the registry without password
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/check-auth-configuration
   *
   * @param  {Object}   opts  Auth options
   * @return {Promise}        Promise returning the result
   */
  auth (opts) {
    const call = {
      path: '/auth',
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        204: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  /*
   * Get system wide information about docker
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/display-system-wide-information
   *
   * @return {Promise}        Promise returning the result
   */
  info () {
    const call = {
      path: '/info',
      method: 'GET',
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  /*
   * Get docker version information of server
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/show-the-docker-version-information
   *
   * @return {Promise}        Promise returning the result
   */
  version () {
    const call = {
      path: '/version',
      method: 'GET',
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  /*
   * Ping the docker server
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/ping-the-docker-server
   *
   * @return {Promise}        Promise returning the result
   */
  ping () {
    const call = {
      path: '/_ping',
      method: 'GET',
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }

  /*
   * Get container events from docker, can be in real time via streaming or via polling (with since)
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/monitor-docker-s-events
   *
   * @param  {Object}   opts  Options to send with the request (optional)
   * @return {Promise}        Promise returning the result
   */
  events (opts = {}) {
    const call = {
      path: '/events?',
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, data) => {
        if (err) return reject(err)
        resolve(data)
      })
    })
  }
}
