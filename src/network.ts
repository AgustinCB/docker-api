'use strict'

/**
 * Class reprensenting a network
 */
class Network {

  modem: any
  id: any

  /**
   * Creates a new network
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the network (optional)
   */
  constructor (modem, id?) {
    this.modem = modem
    this.id = id
  }

  /**
   * Get the list of networks
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-networks
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of networks
   */
  list (opts) {
    const call = {
      path: '/networks?',
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, networks) => {
        if (err) return reject(err)
        if (!networks || !networks.length) return resolve([])
        resolve(networks.map((conf) => {
          const network = new Network(this.modem, conf.Id)
          return Object.assign(network, conf)
        }))
      })
    })
  }

  /**
   * Create a network
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-network
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new network
   */
  create (opts) {
    const call = {
      path: '/networks/create?',
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        404: 'plugin not found',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const network = new Network(this.modem, conf.Id)
        resolve(Object.assign(network, conf))
      })
    })
  }

  /**
   * Prune network
   * https://docs.docker.com/engine/api/v1.25/#operation/NetworkPrune
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}          Promise returning the container
   */
  prune (opts) {
    const call = {
      path: `/networks/prune`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  /**
   * Get low-level information on a network
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-network
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the network to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the network
   */
  status (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/networks/${id}?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such network',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const network = new Network(this.modem, id)
        resolve(Object.assign(network, conf))
      })
    })
  }

  /**
   * Remove a network
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-network
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the network to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the result
   */
  remove (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/networks/${id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        204: true,
        404: 'no such network',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err)
        resolve(res)
      })
    })
  }

  /**
   * Connect a container into the network
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/connect-a-container-to-a-network
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the network, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the network
   */
  connect (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/networks/${id}/connect?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        403: 'operation not supported for swarm scoped network',
        404: 'network or container not found',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const network = new Network(this.modem, id)
        resolve(network)
      })
    })
  }

  /**
   * Disonnect a container into the network
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disconnect-a-container-from-a-network
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the network, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the network
   */
  disconnect (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/networks/${id}/disconnect?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        403: 'operation not supported for swarm scoped network',
        404: 'network or container not found',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const network = new Network(this.modem, id)
        resolve(network)
      })
    })
  }

  __processArguments (opts, id) {
    if (typeof opts === 'string' && !id) {
      id = opts
    }
    if (!id && this.id) {
      id = this.id
    }
    if (!opts) opts = {}
    return [ opts, id ]
  }
}

export default Network
