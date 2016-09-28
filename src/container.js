'use strict'

import Image from './image'

/**
 * Class representing container execution
 */

class Exec {
  /** 
   * Create an execution
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {Container}  container Container that owns the execution (optional)
   * @param  {string}     id        Id of the execution (optional)
   */
  constructor (modem, container, id) {
    this.modem = modem
    this.container = container
    this.id = id
  }

  /**
   * Create an exec instance in a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to get info, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the new exec instance
   */
  create (opts, id) {
    [ opts, id ] = this.__processContainerArguments(opts, id)

    const call = {
      path: `/containers/${id}/exec?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        201: true,
        404: 'no such container',
        409: 'container is paused',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let exec = new Exec(this.modem, this.container, conf.Id)
        resolve(Object.assign(exec, conf))
      })
    })
  }

  /**
   * Start an exec instance
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-start
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the exec instance to start, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the stream to the execution
   */
  start (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/exec/${id}/start`,
      method: 'POST',
      options: opts,
      isStream: true,
      hijack: opts.hijack,
      openStdin: opts.stdin,
      statusCodes: {
        200: true,
        404: 'no such exec instance',
        409: 'container is paused'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, stream) => {
        if (err) return reject(err)
        resolve(stream)
      })
    })
  }

  /**
   * Resize an exec instance
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-resize
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the exec instance to resize, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the result
   */
  resize (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/exec/${id}/resize?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        404: 'no such exec instance'
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
   * Get status of an exec instance
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-inspect
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the exec instance to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the exec instance
   */
  status (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/exec/${id}/json?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such exec instance',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        let exec = new Exec(this.modem, this.container, conf.Id)
        resolve(Object.assign(exec, conf))
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
    if (!opts) {
      opts = {}
    }
    return [ opts, id ]
  }

  __processContainerArguments (opts, id) {
    if (typeof opts === "string" && !id) {
      id = opts
    }
    if (!id && this.container.id) {
      id = this.container.id
    }
    return [ opts, id ]
  }
}

/**
 * Class representing container filesystem
 */
class ContainerFs {
  /** 
   * Create an container filesystem object
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {Container}  container Container that owns the filesystem (optional)
   */
  constructor (modem, container) {
    this.modem = modem
    this.container = container
  }

  /**
   * Get the info about the filesystem of the container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/retrieving-information-about-files-and-folders-in-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to get info, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the info about the filesystem
   */
  info (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/archive?`,
      method: 'HEAD',
      isStream: true,
      options: opts,
      statusCodes: {
        200: true,
        404: 'bad request',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, info) => {
        if (err) return reject(err)
        resolve(info)
      })
    })
  }

  /**
   * Get a tar archive of a resource in the filesystem of a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-an-archive-of-a-filesystem-resource-in-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to get an archive, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the result as a stream to the tar file
   */
  get (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/archive?path=${opts.path}&`,
      method: 'GET',
      isStream: true,
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad request',
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, stream) => {
        if (err) return reject(err)
        resolve(stream)
      })
    })
  }

  /**
   * Put an extracted tar archive in the filesystem of a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/extract-an-archive-of-files-or-folders-to-a-directory-in-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to put the archive, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the result
   */
  put (file, opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/archive?`,
      method: 'PUT',
      options: opts,
      isStream: true,
      file: file,
      statusCodes: {
        200: true,
        400: 'bad request',
        403: 'permission denied',
        404: 'no such container',
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
    if (!id && this.container.id) {
      id = this.container.id
    }
    if (!opts) {
      opts = {}
    }
    return [ opts, id ]
  }
}

/**
 * Class representing a container
 */
class Container {
  /** 
   * Create an container object
   * @param  {Modem}  modem Modem to connect to the remote service
   * @param  {string} id    Container id (optional)
   */
  constructor (modem, id) {
    this.modem = modem
    this.id = id
    this.fs = new ContainerFs(modem, this)
    this.exec = new Exec(modem, this)
  }

  /**
   * Get the list of containers
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-containers
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

  /**
   * Create a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new container
   */
  create (opts) {
    const call = {
      path: '/containers/create?',
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        201: true,
        400: 'bad request',
        404: 'no such image',
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

  /**
   * Get low-level information on a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-container
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the container
   */
  status (opts, id) {
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

  /**
   * Get list of processes (ps) inside a container. Not supported in Windows.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-processes-running-inside-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to get top processes, if it's not set, use the id of the object (optional)
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

  /**
   * Get stdout and stderr logs from a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-container-logs
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the container to get logs, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the concatenated logs
   */
  logs (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/logs?`,
      method: 'GET',
      options: opts,
      isStream: true,
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

  /**
   * Get changes on a container's filesystem
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-changes-on-a-container-s-filesystem
   * @param  {String}   id    ID of the container to inspect changes, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the changes
   */
  changes (id) {
    [ , id ] = this.__processArguments(id)

    const call = {
      path: `/containers/${id}/changes`,
      method: 'GET',
      options: {},
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

  /**
   * Export the content of a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to export, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the content of the tar file as a stream or as a string
   */
  export (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/export`,
      method: 'GET',
      options: opts,
      isStream: !!opts.stream,
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, tarStream) => {
        if (err) return reject(err)
        if (!opts.stream) return resolve(tarStream)
        
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

  /**
   * Get the stats of a container, either by a live stream or the current state
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to get stats, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the stats, in a stream or string
   */
  stats (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/stats`,
      method: 'GET',
      options: opts,
      isStream: true,
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

  /**
   * Resize the TTY for a container. You must restart the container to make the resize take effect.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/resize-a-container-tty
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to resize, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the response
   */
  resize (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/resize`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such container',
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
   * Start a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/start-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to start, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  start (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/start`,
      method: 'POST',
      options: opts,
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : (new Container(this.modem, id)))
      })
    })
  }

  /**
   * Stop a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/stop-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to stop, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  stop (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/stop`,
      method: 'POST',
      options: opts,
      statusCodes: {
        204: true,
        304: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : new Container(this.modem, id))
      })
    })
  }

  /**
   * Restart a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/restart-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to restart, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  restart (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/restart`,
      method: 'POST',
      options: opts,
      statusCodes: {
        204: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : new Container(this.modem, id))
      })
    })
  }

  /**
   * Kill a container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/kill-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to kill, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  kill (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/kill?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        204: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : new Container(this.modem, id))
      })
    })
  }

  /**
   * Update configuration a container.
   * Docs says you can do it for more than one, but doesn't exaplin how, so let's leave it in only one
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to update, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  update (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/update`,
      method: 'POST',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad request',
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, warnings) => {
        let container = this.id ? this : new Container(this.modem, id)
        container.Warnings = warnings
        if (err) return reject(err)
        resolve(container)
      })
    })
  }

  /**
   * Rename a container.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/rename-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to rename, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  rename (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/rename?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        204: true,
        404: 'no such container',
        409: 'name already taken',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : new Container(this.modem, id))
      })
    })
  }

  /**
   * Pause a container.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/pause-a-container
   * @param  {String}   id      ID of the container to pause, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  pause (id) {
    [ , id ] = this.__processArguments(id)

    const call = {
      path: `/containers/${id}/pause`,
      method: 'POST',
      options: {},
      statusCodes: {
        204: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : new Container(this.modem, id))
      })
    })
  }

  /**
   * Unpause a container.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/unpause-a-container
   * @param  {String}   id      ID of the container to resume, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  unpause (id) {
    [ , id ] = this.__processArguments(id)

    const call = {
      path: `/containers/${id}/unpause`,
      method: 'POST',
      options: {},
      statusCodes: {
        204: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err) => {
        if (err) return reject(err)
        resolve(this.id ? this : new Container(this.modem, id))
      })
    })
  }

  /**
   * Attach to a container.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to attach, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  attach (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/attach`,
      method: 'POST',
      isStream: true,
      openStdin: opts.stdin,
      options: opts,
      statusCodes: {
        101: true,
        200: true,
        400: 'bad request',
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, stream) => {
        if (err) return reject(err)
        resolve([ stream, this.id ? this : new Container(this.modem, id) ])
      })
    })
  }

  /**
   * Attach to a container using websocket.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container-websocket
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to attach, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the stream and the container 
   */
  wsattach (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}/attach/ws`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad request',
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, stream) => {
        if (err) return reject(err)
        resolve([ stream, this.id ? this : new Container(this.modem, id) ])
      })
    })
  }

  /**
   * Block until a container stops, returning exit code
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/wait-a-container
   * @param  {String}   id      ID of the container to wait, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the exit code
   */
  wait (id) {
    [ , id ] = this.__processArguments(id)

    const call = {
      path: `/containers/${id}/wait`,
      method: 'POST',
      options: {},
      statusCodes: {
        200: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, code) => {
        if (err) return reject(err)
        resolve(code)
      })
    })
  }

  /**
   * Remove a container.
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-container
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id      ID of the container to remove, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning nothing
   */
  delete (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/containers/${id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        204: true,
        400: 'bad request',
        404: 'no such container',
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

  /**
   * Commit container into an image
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-new-image-from-a-container-s-changes
   * @param  {Object}   opts    Query params in the request (optional)
   * @param  {String}   id      ID of the container to commit, if it's not set, use the id of the object (optional)
   * @return {Promise}          Promise returning the container
   */
  commit (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    opts.container = this.id

    const call = {
      path: `/commit?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        404: 'no such container',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err)
        resolve(new Image(this.modem, res.Id.replace("sha256:", "")))
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
    if (!opts) {
      opts = {}
    }
    return [ opts, id ]
  }
}

export default Container
