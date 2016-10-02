'use strict'

/**
 * Class representing a service
 */
class Service {
  /**
   * Create a service
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the service (optional)
   */
  constructor (modem, id) {
    this.modem = modem
    this.id = id
  }

  /**
   * Get the list of services
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-services
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of services
   */
  list (opts) {
    const call = {
      path: '/services?',
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
        if (!result.Services || !result.Services.length) return resolve([])
        resolve(result.Services.map((conf) => {
          let service = new Service(this.modem, conf.ID)
          return Object.assign(service, conf)
        }))
      })
    })
  }

  /**
   * Create a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-service
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new service
   */
  create (opts) {
    const call = {
      path: '/services/create?',
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        406: 'node is not part of a swarm',
        409: 'name conflicts'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let service = new Service(this.modem, conf.ID)
        resolve(Object.assign(service, conf))
      })
    })
  }

  /**
   * Update a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-service
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the service to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the new service
   */
  update (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/services/${id}/update?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such service',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let service = new Service(this.modem, id)
        resolve(Object.assign(service, conf))
      })
    })
  }

  /**
   * Get low-level information on a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-one-or-more-services
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of service.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the service to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the service
   */
  status (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/services/${id}?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such service',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let service = new Service(this.modem, id)
        resolve(Object.assign(service, conf))
      })
    })
  }

  /**
   * Remove a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-service
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the service to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the result
   */
  remove (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/services/${id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such service',
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

  __processArguments (opts, id) {
    if (typeof opts === "string" && !id) {
      id = opts
    }
    if (!id && this.id) {
      id = this.id
    }
    if (!opts) opts = {}
    return [ opts, id ]
  }
}

export default Service
