'use strict'

import Modem = require('docker-modem')

/**
 * Class representing a node
 */
export class Node {
  modem: Modem
  id: string
  data: Object = {}

  /**
   * Create a node
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the node (optional)
   */
  constructor (modem: Modem, id: string) {
    this.modem = modem
    this.id = id
  }

  /**
   * Update a node
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-node
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new node
   */
  update (opts?: Object): Promise<Node> {
    const call = {
      path: `/nodes/${this.id}/update?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such node',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const node = new Node(this.modem, this.id)
        node.data = conf
        resolve(node)
      })
    })
  }

  /**
   * Get low-level information on a node
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-node
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the node
   */
  status (opts?: Object) {
    const call = {
      path: `/nodes/${this.id}?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such node',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const node = new Node(this.modem, this.id)
        node.data = conf
        resolve(node)
      })
    })
  }

  /**
   * Remove a node
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-node
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the result
   */
  remove (opts: Object): Promise<{}> {
    const call = {
      path: `/nodes/${this.id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        204: true,
        404: 'no such node',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  }
}

export default class {
  modem: Modem

  /**
   * Create a node
   * @param  {Modem}      modem     Modem to connect to the remote service
   */
  constructor (modem: Modem) {
    this.modem = modem
  }

  /**
   * Get a Node Object
   * @param  {id}         string    ID of the secret
   * @return {Node}
   */
  get (id: string): Node {
    return new Node(this.modem, id)
  }

  /**
   * Get the list of nodes
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-nodes
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of nodes
   */
  list (opts?: Object): Promise<Array<Node>> {
    const call = {
      path: '/nodes?',
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, result) => {
        if (err) return reject(err)
        if (!result || !result.length) return resolve([])
        resolve(result.map((conf) => {
          const node = new Node(this.modem, conf.ID)
          node.data = conf
          return node
        }))
      })
    })
  }
}
