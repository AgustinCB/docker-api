'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Container = function () {
  function Container(modem, id) {
    _classCallCheck(this, Container);

    this.modem = modem;
    this.id = id;
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
      var _this = this;

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
        _this.modem.dial(call, function (err, containers) {
          if (err) return reject(err);
          resolve(containers.map(function (conf) {
            var container = new Container(_this.modem, conf.Id);
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
      var _this2 = this;

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
        _this2.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var container = new Container(_this2.modem, conf.Id);
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
      var _this3 = this;

      var _processArguments = this.__processArguments(opts, id);

      var _processArguments2 = _slicedToArray(_processArguments, 2);

      opts = _processArguments2[0];
      id = _processArguments2[1];


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
        _this3.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var container = new Container(_this3.modem, id);
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
      var _this4 = this;

      var _processArguments3 = this.__processArguments(opts, id);

      var _processArguments4 = _slicedToArray(_processArguments3, 2);

      opts = _processArguments4[0];
      id = _processArguments4[1];


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
        _this4.modem.dial(call, function (err, processes) {
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
      var _this5 = this;

      var _processArguments5 = this.__processArguments(opts, id);

      var _processArguments6 = _slicedToArray(_processArguments5, 2);

      opts = _processArguments6[0];
      id = _processArguments6[1];


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
        _this5.modem.dial(call, function (err, logs) {
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
      var _this6 = this;

      var _processArguments7 = this.__processArguments(id);

      var _processArguments8 = _slicedToArray(_processArguments7, 2);

      _ = _processArguments8[0];
      id = _processArguments8[1];


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
        _this6.modem.dial(call, function (err, changes) {
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
      var _this7 = this;

      var _processArguments9 = this.__processArguments(opts, id);

      var _processArguments10 = _slicedToArray(_processArguments9, 2);

      opts = _processArguments10[0];
      id = _processArguments10[1];


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
        _this7.modem.dial(call, function (err, tarStream) {
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
      var _this8 = this;

      var _processArguments11 = this.__processArguments(opts, id);

      var _processArguments12 = _slicedToArray(_processArguments11, 2);

      opts = _processArguments12[0];
      id = _processArguments12[1];


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
        _this8.modem.dial(call, function (err, stats) {
          if (err) return reject(err);
          resolve(stats);
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