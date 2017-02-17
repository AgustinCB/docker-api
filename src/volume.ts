'use strict'

/**
 * Class representing a volume
 */
class Volume {

  modem: any
  id: any

  /**
   * Create a volume
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the volume (optional)
   */
  constructor (modem, id?) {
    this.modem = modem
    this.id = id
  }

  /**
   * Get the list of volumes
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-volumes
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of volumes
   */
  list (opts) {
    const call = {
      path: '/volumes',
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
        if (!result.Volumes || !result.Volumes.length) return resolve([])
        resolve(result.Volumes.map((conf) => {
          const volume = new Volume(this.modem, conf.Name)
          return Object.assign(volume, conf)
        }))
      })
    })
  }

  /**
   * Create a volume
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-volume
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new volume
   */
  create (opts) {
    const call = {
      path: '/volumes/create?',
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const volume = new Volume(this.modem, conf.Name)
        resolve(Object.assign(volume, conf))
      })
    })
  }

  /**
   * Get low-level information on a volume
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-volume
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the volume
   */
  status (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/volumes/${id}?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such volume',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const volume = new Volume(this.modem, id)
        resolve(Object.assign(volume, conf))
      })
    })
  }

  /**
   * Remove a volume from the filesystem
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-volume
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the result
   */
  remove (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/volumes/${id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        204: true,
        404: 'no such volume',
        409: 'conflict',
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
   * Prune volumes
   * https://docs.docker.com/engine/api/v1.25/#operation/VolumePrune
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}          Promise returning the container
   */
  prune (opts) {
    const call = {
      path: `/volumes/prune`,
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

export default Volume
