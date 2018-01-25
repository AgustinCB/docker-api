'use strict'

import Modem = require('docker-modem')
import { Node } from './node'

/**
 * Class reprensenting a swarm
 */
export default class Swarm {
  modem: Modem
  data: Object = {}

  /**
   * Creates a new swarm
   * @param  {Modem}      modem     Modem to connect to the remote service
   */
  constructor (modem: Modem) {
    this.modem = modem
  }

  /**
   * Initialize a new swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/initialize-a-new-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new node
   */
  init (opts?: Object): Promise<Node> {
    const call = {
      path: '/swarm/init?',
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad parameter',
        406: 'node is already part of a swarm'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, nodeId) => {
        if (err) return reject(err)
        const node = new Node(this.modem, nodeId)
        resolve(node)
      })
    })
  }

  /**
   * Get low-level information on a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-swarm
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the swarm
   */
  status (opts?: Object): Promise<Swarm> {
    const call = {
      path: `/swarm?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such swarm',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const swarm = new Swarm(this.modem)
        swarm.data = conf
        resolve(swarm)
      })
    })
  }

  /**
   * Join a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/join-an-existing-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the result
   */
  join (opts?: Object): Promise<String> {
    const call = {
      path: `/swarm/join?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad parameter',
        406: 'node is already part of a swarm'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, id: string) => {
        if (err) return reject(err)
        resolve(id)
      })
    })
  }

  /**
   * Leave a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/leave-a-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the swarm
   */
  leave (opts?: Object): Promise<String> {
    const call = {
      path: `/swarm/leave?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        406: 'node is not part of a swarm'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res: string) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  /**
   * Update a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the swarm
   */
  update (opts?: Object): Promise<String> {
    const call = {
      path: `/swarm/update?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad parameter',
        406: 'node is already part of a swarm'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res: string) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }
}
