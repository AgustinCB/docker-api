'use strict'

import Modem = require('docker-modem')

/**
 * Class representing a service
 */
export class Service {
  modem: Modem
  id: string
  data: Object = {}

  /**
   * Create a service
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the service (optional)
   */
  constructor (modem: Modem, id: string) {
    this.modem = modem
    this.id = id
  }

  /**
   * Update a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-service
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {Object}   auth  Authentication (optional)
   * @return {Promise}        Promise return the new service
   */
  update (opts?: Object, auth?: Object): Promise<Service> {
    const call = {
      path: `/services/${this.id}/update?`,
      method: 'POST',
      options: opts,
      authconfig: auth,
      statusCodes: {
        200: true,
        404: 'no such service',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const service = new Service(this.modem, this.id)
        service.data = conf
        resolve(service)
      })
    })
  }

  /**
   * Get low-level information on a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-one-or-more-services
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of service.
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the service
   */
  status (opts?: Object): Promise<Service> {
    const call = {
      path: `/services/${this.id}?`,
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
        const service = new Service(this.modem, this.id)
        service.data = conf
        resolve(service)
      })
    })
  }

  /**
   * Remove a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-service
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the result
   */
  remove (opts?: Object): Promise<String> {
    const call = {
      path: `/services/${this.id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such service',
        500: 'server error'
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
   * Logs of a service
   * https://docs.docker.com/engine/api/v1.27/#operation/ServiceLogs
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the result
   */
  logs (opts?: Object): Promise<String> {
    const call = {
      path: `/services/${this.id}/logs?`,
      method: 'GET',
      options: opts,
      isStream: true,
      statusCodes: {
        101: true,
        200: true,
        404: 'no such service',
        500: 'server error',
        501: 'use --experimental to see this',
        503: 'node is not part of a swarm'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, logs) => {
        if (err) return reject(err)
        resolve(logs)
      })
    })
  }
}

export default class {
  modem: Modem

  /**
   * Create a service
   * @param  {Modem}      modem     Modem to connect to the remote service
   */
  constructor (modem: Modem) {
    this.modem = modem
  }

  /**
   * Get a Service Object
   * @param  {id}         string    ID of the secret
   * @return {Network}
   */
  get (id: string): Service {
    return new Service(this.modem, id)
  }

  /**
   * Create a service
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-service
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {Object}   auth  Authentication (optional)
   * @return {Promise}        Promise return the new service
   */
  create (opts?: Object, auth?: Object): Promise<Service> {
    const call = {
      path: '/services/create?',
      method: 'POST',
      options: opts,
      authconfig: auth,
      statusCodes: {
        201: true,
        406: 'node is not part of a swarm',
        409: 'name conflicts'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const service = new Service(this.modem, conf.ID)
        service.data = conf
        resolve(service)
      })
    })
  }

  /**
   * Get the list of services
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-services
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of services
   */
  list (opts?: Object): Promise<Array<Service>> {
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
        resolve(result.map((conf) => {
          const service = new Service(this.modem, conf.ID)
          service.data = conf
          return service
        }))
      })
    })
  }
}
