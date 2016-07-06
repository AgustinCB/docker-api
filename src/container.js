'use strict'

export default class Container {
  constructor (modem, id) {
    this.modem = modem
    this.id = id
  }

  /*
   * Get the list of containers
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-containers
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of containers
   */
  list (opts) {
    const call = {
      path: '/containers/json',
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad request',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, containers) => {
        if (err) return reject(err)
        resolve(containers.map((conf) => {
          let container = new Container(this.modem, conf.Id)
          return Object.assign(container, conf)
        }))
      })
    })
  }

  /*
   * Create a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new container
   */
  create (opts) {
    const call = {
      path: '/containers/json',
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad request',
        404: 'no such container',
        406: 'impossible to attach',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let container = new Container(this.modem, conf.Id)
        resolve(Object.assign(container, conf))
      })
    })
  }

  /*
   * Get low-level information on a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-container
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the new container
   */
  inspect (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/json`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let container = new Container(this.modem, id)
        resolve(Object.assign(container, conf))
      })
    })
  }

  /*
   * Get list of processes (ps) inside a container. Not supported in Windows.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-processes-running-inside-a-container
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the list of processes
   */
  top (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/top`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, processes) => {
        if (err) return reject(err)
        resolve(processes)
      })
    })
  }

  /*
   * Get stdout and stderr logs from a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-container-logs
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the concatenated logs
   */
  logs (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/logs`,
      method: 'GET',
      options: opts,
      statusCodes: {
        101: true,
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, logs) => {
        if (err) return reject(err)
        resolve(logs)
      })
    })
  }

  /*
   * Get changes on a container's filesystem
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-changes-on-a-container-s-filesystem
   *
   * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the changes
   */
  changes (id) {
    [ _, id ] = this.__processArguments(id)

    const call = {
      path: `/containers/${id}/changes`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, changes) => {
        if (err) return reject(err)
        resolve(changes)
      })
    })
  }

  /*
   * Export the content of a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the content of the tar file as a stream or as a string
   */
  export (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/export`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, tarStream) => {
        if (err) return reject(err)
        if (opts.stream) return resolve(tarStream)
        
        let res = []
        tarStream.on('data', (chunk) => {
          res.push(chunk.toString())
        })
        
        tarStream.on('end', () => {
          resolve(res.join(''))
        })
      })
    })
  }

  /*
   * Get the stats of a container, either by a live stream or the current state
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the stats, in a stream or string
   */
  stats (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/export`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, stats) => {
        if (err) return reject(err)
        resolve(stats)
      })
    })
  }

  __processArguments (opts, id) {
    if (typeof opts === "string" && !id) {
      id = opts
    }
    if (!opts && !id) {
      id = this.id
    }
    return { opts, id }
  }
}
