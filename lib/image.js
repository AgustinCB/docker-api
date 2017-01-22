'use strict';

/**
 * Class representing an image
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Image = function () {
  /**
   * Creates a new image
   * @param  {Modem}  modem Modem to connect to the remote service
   * @param  {string} id    Container id (optional)
   */
  function Image(modem, id) {
    _classCallCheck(this, Image);

    this.modem = modem;
    this.id = id;
  }

  /**
   * Get the list of images
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-images
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of images
   */


  _createClass(Image, [{
    key: 'list',
    value: function list(opts) {
      var _this = this;

      var call = {
        path: '/images/json?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad request',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, images) {
          if (err) return reject(err);
          resolve(images.map(function (conf) {
            var image = new Image(_this.modem, conf.Id);
            return Object.assign(image, conf);
          }));
        });
      });
    }

    /**
     * Build image from dockerfile
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/build-image-from-a-dockerfile
     * @file   {File}     file  Dockerfile to build
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the resulting stream
     */

  }, {
    key: 'build',
    value: function build(file, opts) {
      var _this2 = this;

      var call = {
        path: '/build?',
        method: 'POST',
        options: opts,
        file: file,
        isStream: true,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /**
     * Create an image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-an-image
     * @param  {Object}   auth  Authentication (optional)
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the resulting stream
     */

  }, {
    key: 'create',
    value: function create(auth, opts) {
      var _this3 = this;

      var call = {
        path: '/images/create?',
        method: 'POST',
        options: opts,
        isStream: true,
        authconfig: auth,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /**
     * Get low-level information on an image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-an-image
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the image
     */

  }, {
    key: 'status',
    value: function status(opts, id) {
      var _this4 = this;

      var _processArguments = this.__processArguments(opts, id);

      var _processArguments2 = _slicedToArray(_processArguments, 2);

      opts = _processArguments2[0];
      id = _processArguments2[1];


      var call = {
        path: '/images/' + id + '/json?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such image',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this4.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var image = new Image(_this4.modem, id);
          resolve(Object.assign(image, conf));
        });
      });
    }

    /**
     * History of the image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-the-history-of-an-image
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the events in the history
     */

  }, {
    key: 'history',
    value: function history(opts, id) {
      var _this5 = this;

      var _processArguments3 = this.__processArguments(opts, id);

      var _processArguments4 = _slicedToArray(_processArguments3, 2);

      opts = _processArguments4[0];
      id = _processArguments4[1];


      var call = {
        path: '/images/' + id + '/history?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such image',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this5.modem.dial(call, function (err, events) {
          if (err) return reject(err);
          resolve(events);
        });
      });
    }

    /**
     * Push an image to the registry
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/push-an-image-on-the-registry
     * @param  {Object}   auth  Authentication (optional)
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the resulting stream
     */

  }, {
    key: 'push',
    value: function push(auth, opts, id) {
      var _this6 = this;

      var _processArguments5 = this.__processArguments(opts, id);

      var _processArguments6 = _slicedToArray(_processArguments5, 2);

      opts = _processArguments6[0];
      id = _processArguments6[1];

      var call = {
        path: '/images/' + id + '/push?',
        method: 'POST',
        options: opts,
        isStream: true,
        authconfig: auth,
        statusCodes: {
          200: true,
          404: 'no such image',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this6.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /**
     * Tag the image into the registry
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/tag-an-image-into-a-repository
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the image
     */

  }, {
    key: 'tag',
    value: function tag(opts, id) {
      var _this7 = this;

      var _processArguments7 = this.__processArguments(opts, id);

      var _processArguments8 = _slicedToArray(_processArguments7, 2);

      opts = _processArguments8[0];
      id = _processArguments8[1];

      var call = {
        path: '/images/' + id + '/tag?',
        method: 'POST',
        options: opts,
        statusCodes: {
          201: true,
          400: 'bad parameter',
          404: 'no such image',
          409: 'conflict',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this7.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          var image = new Image(_this7.modem, id);
          resolve(image);
        });
      }).then(function (image) {
        return image.status();
      });
    }

    /**
     * Remove an image from the filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-an-image
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */

  }, {
    key: 'remove',
    value: function remove(opts, id) {
      var _this8 = this;

      var _processArguments9 = this.__processArguments(opts, id);

      var _processArguments10 = _slicedToArray(_processArguments9, 2);

      opts = _processArguments10[0];
      id = _processArguments10[1];

      var call = {
        path: '/images/' + id + '?',
        method: 'DELETE',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such image',
          409: 'conflict',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this8.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }

    /**
     * Search an image on Docker Hub
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/search-images
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the images
     */

  }, {
    key: 'search',
    value: function search(opts) {
      var _this9 = this;

      var call = {
        path: '/images/search?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this9.modem.dial(call, function (err, images) {
          if (err) return reject(err);
          resolve(images);
        });
      });
    }

    /**
     * Get an image in a tarball
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-a-tarball-containing-all-images-in-a-repository
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to get, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the stream with the tarball
     */

  }, {
    key: 'get',
    value: function get(opts, id) {
      var _this10 = this;

      var _processArguments11 = this.__processArguments(opts, id);

      var _processArguments12 = _slicedToArray(_processArguments11, 2);

      opts = _processArguments12[0];
      id = _processArguments12[1];

      var call = {
        path: '/images/' + id + '/get?',
        method: 'GET',
        options: opts,
        isStream: true,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this10.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /**
     * Get all images in a tarball
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/get-a-tarball-containing-all-images
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the stream with the tarball
     */

  }, {
    key: 'getAll',
    value: function getAll(opts) {
      var _this11 = this;

      var call = {
        path: '/images/get?',
        method: 'GET',
        options: opts,
        isStream: true,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this11.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /**
     * Load image from tarball
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/load-a-tarball-with-a-set-of-images-and-tags-into-docker
     * @file   {File}     file  Tarball to load
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the stream with the process
     */

  }, {
    key: 'load',
    value: function load(file, opts) {
      var _this12 = this;

      var call = {
        path: '/images/load?',
        method: 'POST',
        options: opts,
        file: file,
        isStream: true,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this12.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }
  }, {
    key: '__processArguments',
    value: function __processArguments(opts, id) {
      if (typeof opts === "string" && !id) {
        id = opts;
      }
      if (!id && this.id) {
        id = this.id;
      }
      if (!opts) opts = {};
      return [opts, id];
    }
  }]);

  return Image;
}();

exports.default = Image;