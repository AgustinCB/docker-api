'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ContainerFs = function () {
  function ContainerFs(modem, container) {
    _classCallCheck(this, ContainerFs);

    this.modem = modem;
    this.container = container;
  }

  /*
   * Get the info about the filesystem of the container
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/retrieving-information-about-files-and-folders-in-a-container
   *
   * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise returning the info about the filesystem
   */


  _createClass(ContainerFs, [{
    key: 'info',
    value: function info(id) {
      var _this = this;

      var _processArguments = this.__processArguments(id);

      var _processArguments2 = _slicedToArray(_processArguments, 2);

      _ = _processArguments2[0];
      id = _processArguments2[1];


      var call = {
        path: '/containers/' + id + '/archive',
        method: 'HEAD',
        options: opts,
        statusCodes: {
          200: true,
          404: 'bad request',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, info) {
          if (err) return reject(err);
          resolve(info);
        });
      });
    }

    /*
     * Get a tar archive of a resource in the filesystem of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-an-archive-of-a-filesystem-resource-in-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise returning the result as a stream to the tar file
     */

  }, {
    key: 'get',
    value: function get(opts, id) {
      var _this2 = this;

      var _processArguments3 = this.__processArguments(opts, id);

      var _processArguments4 = _slicedToArray(_processArguments3, 2);

      opts = _processArguments4[0];
      id = _processArguments4[1];


      var call = {
        path: '/containers/' + id + '/archive',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad request',
          404: 'no such container',
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

    /*
     * Put an extracted tar archive in the filesystem of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/extract-an-archive-of-files-or-folders-to-a-directory-in-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise returning the result as a stream to the tar file
     */

  }, {
    key: 'put',
    value: function put(opts, id) {
      var _this3 = this;

      var _processArguments5 = this.__processArguments(opts, id);

      var _processArguments6 = _slicedToArray(_processArguments5, 2);

      opts = _processArguments6[0];
      id = _processArguments6[1];


      var call = {
        path: '/containers/' + id + '/archive',
        method: 'PUT',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad request',
          403: 'permission denied',
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }
  }, {
    key: '__processArguments',
    value: function __processArguments(opts, id) {
      if (typeof opts === "string" && !id) {
        id = opts;
      }
      if (!opts && !id) {
        id = this.container.id;
      }
      return { opts: opts, id: id };
    }
  }]);

  return ContainerFs;
}();

var Container = function () {
  function Container(modem, id) {
    _classCallCheck(this, Container);

    this.modem = modem;
    this.id = id;
    this.fs = new ContainerFs(modem, this);
  }

  /*
   * Get the list of containers
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-containers
   *
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of containers
   */


  _createClass(Container, [{
    key: 'list',
    value: function list(opts) {
      var _this4 = this;

      var call = {
        path: '/containers/json',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad request',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this4.modem.dial(call, function (err, containers) {
          if (err) return reject(err);
          resolve(containers.map(function (conf) {
            var container = new Container(_this4.modem, conf.Id);
            return Object.assign(container, conf);
          }));
        });
      });
    }

    /*
     * Create a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new container
     */

  }, {
    key: 'create',
    value: function create(opts) {
      var _this5 = this;

      var call = {
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
      };

      return new Promise(function (resolve, reject) {
        _this5.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var container = new Container(_this5.modem, conf.Id);
          resolve(Object.assign(container, conf));
        });
      });
    }

    /*
     * Get low-level information on a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the new container
     */

  }, {
    key: 'inspect',
    value: function inspect(opts, id) {
      var _this6 = this;

      var _processArguments7 = this.__processArguments(opts, id);

      var _processArguments8 = _slicedToArray(_processArguments7, 2);

      opts = _processArguments8[0];
      id = _processArguments8[1];


      var call = {
        path: '/containers/' + id + '/json',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this6.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var container = new Container(_this6.modem, id);
          resolve(Object.assign(container, conf));
        });
      });
    }

    /*
     * Get list of processes (ps) inside a container. Not supported in Windows.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-processes-running-inside-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the list of processes
     */

  }, {
    key: 'top',
    value: function top(opts, id) {
      var _this7 = this;

      var _processArguments9 = this.__processArguments(opts, id);

      var _processArguments10 = _slicedToArray(_processArguments9, 2);

      opts = _processArguments10[0];
      id = _processArguments10[1];


      var call = {
        path: '/containers/' + id + '/top',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this7.modem.dial(call, function (err, processes) {
          if (err) return reject(err);
          resolve(processes);
        });
      });
    }

    /*
     * Get stdout and stderr logs from a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-container-logs
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise returning the concatenated logs
     */

  }, {
    key: 'logs',
    value: function logs(opts, id) {
      var _this8 = this;

      var _processArguments11 = this.__processArguments(opts, id);

      var _processArguments12 = _slicedToArray(_processArguments11, 2);

      opts = _processArguments12[0];
      id = _processArguments12[1];


      var call = {
        path: '/containers/' + id + '/logs',
        method: 'GET',
        options: opts,
        statusCodes: {
          101: true,
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this8.modem.dial(call, function (err, logs) {
          if (err) return reject(err);
          resolve(logs);
        });
      });
    }

    /*
     * Get changes on a container's filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-changes-on-a-container-s-filesystem
     *
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise returning the changes
     */

  }, {
    key: 'changes',
    value: function changes(id) {
      var _this9 = this;

      var _processArguments13 = this.__processArguments(id);

      var _processArguments14 = _slicedToArray(_processArguments13, 2);

      _ = _processArguments14[0];
      id = _processArguments14[1];


      var call = {
        path: '/containers/' + id + '/changes',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this9.modem.dial(call, function (err, changes) {
          if (err) return reject(err);
          resolve(changes);
        });
      });
    }

    /*
     * Export the content of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the content of the tar file as a stream or as a string
     */

  }, {
    key: 'export',
    value: function _export(opts, id) {
      var _this10 = this;

      var _processArguments15 = this.__processArguments(opts, id);

      var _processArguments16 = _slicedToArray(_processArguments15, 2);

      opts = _processArguments16[0];
      id = _processArguments16[1];


      var call = {
        path: '/containers/' + id + '/export',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this10.modem.dial(call, function (err, tarStream) {
          if (err) return reject(err);
          if (opts.stream) return resolve(tarStream);

          var res = [];
          tarStream.on('data', function (chunk) {
            res.push(chunk.toString());
          });

          tarStream.on('end', function () {
            resolve(res.join(''));
          });
        });
      });
    }

    /*
     * Get the stats of a container, either by a live stream or the current state
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the stats, in a stream or string
     */

  }, {
    key: 'stats',
    value: function stats(opts, id) {
      var _this11 = this;

      var _processArguments17 = this.__processArguments(opts, id);

      var _processArguments18 = _slicedToArray(_processArguments17, 2);

      opts = _processArguments18[0];
      id = _processArguments18[1];


      var call = {
        path: '/containers/' + id + '/export',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this11.modem.dial(call, function (err, stats) {
          if (err) return reject(err);
          resolve(stats);
        });
      });
    }

    /*
     * Resize the TTY for a container. You must restart the container to make the resize take effect.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/resize-a-container-tty
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'resize',
    value: function resize(opts, id) {
      var _this12 = this;

      var _processArguments19 = this.__processArguments(opts, id);

      var _processArguments20 = _slicedToArray(_processArguments19, 2);

      opts = _processArguments20[0];
      id = _processArguments20[1];


      var call = {
        path: '/containers/' + id + '/resize',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this12.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }

    /*
     * Start a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/start-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'start',
    value: function start(opts, id) {
      var _this13 = this;

      var _processArguments21 = this.__processArguments(opts, id);

      var _processArguments22 = _slicedToArray(_processArguments21, 2);

      opts = _processArguments22[0];
      id = _processArguments22[1];


      var call = {
        path: '/containers/' + id + '/start',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          304: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this13.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Stop a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/stop-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'stop',
    value: function stop(opts, id) {
      var _this14 = this;

      var _processArguments23 = this.__processArguments(opts, id);

      var _processArguments24 = _slicedToArray(_processArguments23, 2);

      opts = _processArguments24[0];
      id = _processArguments24[1];


      var call = {
        path: '/containers/' + id + '/stop',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          304: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this14.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Restart a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/restart-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'restart',
    value: function restart(opts, id) {
      var _this15 = this;

      var _processArguments25 = this.__processArguments(opts, id);

      var _processArguments26 = _slicedToArray(_processArguments25, 2);

      opts = _processArguments26[0];
      id = _processArguments26[1];


      var call = {
        path: '/containers/' + id + '/restart',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this15.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Kill a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/kill-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'kill',
    value: function kill(opts, id) {
      var _this16 = this;

      var _processArguments27 = this.__processArguments(opts, id);

      var _processArguments28 = _slicedToArray(_processArguments27, 2);

      opts = _processArguments28[0];
      id = _processArguments28[1];


      var call = {
        path: '/containers/' + id + '/kill',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this16.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Update configuration a container.
     * Docs says you can do it for more than one, but doesn't exaplin how, so let's leave it in only one
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'update',
    value: function update(opts, id) {
      var _this17 = this;

      var _processArguments29 = this.__processArguments(opts, id);

      var _processArguments30 = _slicedToArray(_processArguments29, 2);

      opts = _processArguments30[0];
      id = _processArguments30[1];


      var call = {
        path: '/containers/' + id + '/update',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad request',
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this17.modem.dial(call, function (err, warnings) {
          if (err) return reject(err);
          resolve(warnings);
        });
      });
    }

    /*
     * Rename a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/rename-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'rename',
    value: function rename(opts, id) {
      var _this18 = this;

      var _processArguments31 = this.__processArguments(opts, id);

      var _processArguments32 = _slicedToArray(_processArguments31, 2);

      opts = _processArguments32[0];
      id = _processArguments32[1];


      var call = {
        path: '/containers/' + id + '/rename',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such container',
          409: 'name already taken',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this18.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Pause a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/pause-a-container
     *
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'pause',
    value: function pause(id) {
      var _this19 = this;

      var _processArguments33 = this.__processArguments(id);

      var _processArguments34 = _slicedToArray(_processArguments33, 2);

      _ = _processArguments34[0];
      id = _processArguments34[1];


      var call = {
        path: '/containers/' + id + '/pause',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this19.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Unpause a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/unpause-a-container
     *
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'unpause',
    value: function unpause(id) {
      var _this20 = this;

      var _processArguments35 = this.__processArguments(id);

      var _processArguments36 = _slicedToArray(_processArguments35, 2);

      _ = _processArguments36[0];
      id = _processArguments36[1];


      var call = {
        path: '/containers/' + id + '/unpause',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this20.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }

    /*
     * Attach to a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'attach',
    value: function attach(opts, id) {
      var _this21 = this;

      var _processArguments37 = this.__processArguments(opts, id);

      var _processArguments38 = _slicedToArray(_processArguments37, 2);

      opts = _processArguments38[0];
      id = _processArguments38[1];


      var call = {
        path: '/containers/' + id + '/attach',
        method: 'POST',
        options: opts,
        statusCodes: {
          101: true,
          200: true,
          400: 'bad request',
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this21.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /*
     * Attach to a container using websocket.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container-websocket
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'wsattach',
    value: function wsattach(opts, id) {
      var _this22 = this;

      var _processArguments39 = this.__processArguments(opts, id);

      var _processArguments40 = _slicedToArray(_processArguments39, 2);

      opts = _processArguments40[0];
      id = _processArguments40[1];


      var call = {
        path: '/containers/' + id + '/attach/ws',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad request',
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this22.modem.dial(call, function (err, stream) {
          if (err) return reject(err);
          resolve(stream);
        });
      });
    }

    /*
     * Block until a container stops, returning exit code
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/wait-a-container
     *
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'wait',
    value: function wait(id) {
      var _this23 = this;

      var _processArguments41 = this.__processArguments(id);

      var _processArguments42 = _slicedToArray(_processArguments41, 2);

      _ = _processArguments42[0];
      id = _processArguments42[1];


      var call = {
        path: '/containers/' + id + '/wait',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this23.modem.dial(call, function (err, code) {
          if (err) return reject(err);
          resolve(code);
        });
      });
    }

    /*
     * Remove a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-container
     *
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */

  }, {
    key: 'delete',
    value: function _delete(opts, id) {
      var _this24 = this;

      var _processArguments43 = this.__processArguments(opts, id);

      var _processArguments44 = _slicedToArray(_processArguments43, 2);

      opts = _processArguments44[0];
      id = _processArguments44[1];


      var call = {
        path: '/containers/' + id,
        method: 'DELETE',
        options: opts,
        statusCodes: {
          204: true,
          400: 'bad request',
          404: 'no such container',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this24.modem.dial(call, function (err) {
          if (err) return reject(err);
          resolve();
        });
      });
    }
  }, {
    key: '__processArguments',
    value: function __processArguments(opts, id) {
      if (typeof opts === "string" && !id) {
        id = opts;
      }
      if (!opts && !id) {
        id = this.id;
      }
      return { opts: opts, id: id };
    }
  }]);

  return Container;
}();

exports.default = Container;