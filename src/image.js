'use strict'

/**
 * Class representing an image
 */
class Image {
  /**
   * Creates a new image
   * @param  {Modem}  modem Modem to connect to the remote service
   * @param  {string} id    Container id (optional)
   */
  constructor (modem, id) {
    this.modem = modem
    this.id = id
  }

  /**
   * Get the list of images
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-images
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of images
   */
  list (opts) {
    const call = {
      path: '/images/json?',
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        400: 'bad request',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, images) => {
        if (err) return reject(err)
        resolve(images.map((conf) => {
          const image = new Image(this.modem, conf.Id)
          return Object.assign(image, conf)
        }))
      })
    })
  }

  /**
   * Build image from dockerfile
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/build-image-from-a-dockerfile
   * @file   {File}     file  Dockerfile to build
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the resulting stream
   */
  build (file, opts) {
    const call = {
      path: '/build?',
      method: 'POST',
      options: opts,
      file: file,
      isStream: true,
      statusCodes: {
        200: true,
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
   * Create an image
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-an-image
   * @param  {Object}   auth  Authentication (optional)
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the resulting stream
   */
  create (auth, opts) {
    const call = {
      path: '/images/create?',
      method: 'POST',
      options: opts,
      isStream: true,
      authconfig: auth,
      statusCodes: {
        200: true,
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
   * Get low-level information on an image
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-an-image
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the image
   */
  status (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/images/${id}/json?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such image',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err)
        const image = new Image(this.modem, id)
        resolve(Object.assign(image, conf))
      })
    })
  }

  /**
   * History of the image
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-the-history-of-an-image
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the events in the history
   */
  history (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)

    const call = {
      path: `/images/${id}/history?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such image',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, events) => {
        if (err) return reject(err)
        resolve(events)
      })
    })
  }

  /**
   * Push an image to the registry
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/push-an-image-on-the-registry
   * @param  {Object}   auth  Authentication (optional)
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the resulting stream
   */
  push (auth, opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/images/${id}/push?`,
      method: 'POST',
      options: opts,
      isStream: true,
      authconfig: auth,
      statusCodes: {
        200: true,
        404: 'no such image',
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
   * Tag the image into the registry
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/tag-an-image-into-a-repository
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the image
   */
  tag (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/images/${id}/tag?`,
      method: 'POST',
      options: opts,
      statusCodes: {
        201: true,
        400: 'bad parameter',
        404: 'no such image',
        409: 'conflict',
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err)
        const image = new Image(this.modem, id)
        resolve(image)
      })
    }).then((image) => {
      return image.status()
    })
  }

  /**
   * Remove an image from the filesystem
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-an-image
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the result
   */
  remove (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/images/${id}?`,
      method: 'DELETE',
      options: opts,
      statusCodes: {
        200: true,
        404: 'no such image',
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
   * Search an image on Docker Hub
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/search-images
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the images
   */
  search (opts) {
    const call = {
      path: `/images/search?`,
      method: 'GET',
      options: opts,
      statusCodes: {
        200: true,
        500: 'server error'
      }
    }

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, images) => {
        if (err) return reject(err)
        resolve(images)
      })
    })
  }

  /**
   * Get an image in a tarball
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-a-tarball-containing-all-images-in-a-repository
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the image to get, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the stream with the tarball
   */
  get (opts, id) {
    [ opts, id ] = this.__processArguments(opts, id)
    const call = {
      path: `/images/${id}/get?`,
      method: 'GET',
      options: opts,
      isStream: true,
      statusCodes: {
        200: true,
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
   * Get all images in a tarball
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/get-a-tarball-containing-all-images
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the stream with the tarball
   */
  getAll (opts) {
    const call = {
      path: `/images/get?`,
      method: 'GET',
      options: opts,
      isStream: true,
      statusCodes: {
        200: true,
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
   * Load image from tarball
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/load-a-tarball-with-a-set-of-images-and-tags-into-docker
   * @file   {File}     file  Tarball to load
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the stream with the process
   */
  load (file, opts) {
    const call = {
      path: '/images/load?',
      method: 'POST',
      options: opts,
      file: file,
      isStream: true,
      statusCodes: {
        200: true,
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

export default Image
