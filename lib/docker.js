'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Docker = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dockerModem = require('docker-modem');

var _dockerModem2 = _interopRequireDefault(_dockerModem);

var _container = require('./container');

var _container2 = _interopRequireDefault(_container);

var _image = require('./image');

var _image2 = _interopRequireDefault(_image);

var _volume = require('./volume');

var _volume2 = _interopRequireDefault(_volume);

var _network = require('./network');

var _network2 = _interopRequireDefault(_network);

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

var _plugin = require('./plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _swarm = require('./swarm');

var _swarm2 = _interopRequireDefault(_swarm);

var _service = require('./service');

var _service2 = _interopRequireDefault(_service);

var _task = require('./task');

var _task2 = _interopRequireDefault(_task);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 
 * Docker class with all methods 
 */
var Docker = exports.Docker = function () {
  /**
   * Creates the Docker object
   * @param {Object}  opts Docker options
   */
  function Docker(opts) {
    _classCallCheck(this, Docker);

    this.modem = new _dockerModem2.default(opts);

    this.container = new _container2.default(this.modem);
    this.image = new _image2.default(this.modem);
    this.volume = new _volume2.default(this.modem);
    this.network = new _network2.default(this.modem);
    this.node = new _node2.default(this.modem);
    this.plugin = new _plugin2.default(this.modem);
    this.swarm = new _swarm2.default(this.modem);
    this.service = new _service2.default(this.modem);
    this.task = new _task2.default(this.modem);
  }

  /**
   * Validate credentials for a registry and get identity token,
   * if available, for accessing the registry without password
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/check-auth-configuration
   * @param  {Object}   opts  Auth options
   * @return {Promise}        Promise returning the result
   */


  _createClass(Docker, [{
    key: 'auth',
    value: function auth(opts) {
      var _this = this;

      var call = {
        path: '/auth?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          204: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, data) {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }

    /**
     * Get system wide information about docker
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/display-system-wide-information
     * @return {Promise}        Promise returning the result
     */

  }, {
    key: 'info',
    value: function info() {
      var _this2 = this;

      var call = {
        path: '/info?',
        method: 'GET',
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, data) {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }

    /**
     * Get docker version information of server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/show-the-docker-version-information
     * @return {Promise}        Promise returning the result
     */

  }, {
    key: 'version',
    value: function version() {
      var _this3 = this;

      var call = {
        path: '/version?',
        method: 'GET',
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, data) {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }

    /**
     * Ping the docker server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/ping-the-docker-server
     * @return {Promise}        Promise returning the result
     */

  }, {
    key: 'ping',
    value: function ping() {
      var _this4 = this;

      var call = {
        path: '/_ping?',
        method: 'GET',
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this4.modem.dial(call, function (err, data) {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }

    /**
     * Get container events from docker, can be in real time via streaming or via polling (with since)
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/monitor-docker-s-events
     * @param  {Object}   opts  Options to send with the request (optional)
     * @return {Promise}        Promise returning the result
     */

  }, {
    key: 'events',
    value: function events() {
      var _this5 = this;

      var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

      var call = {
        path: '/events?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this5.modem.dial(call, function (err, data) {
          if (err) return reject(err);
          resolve(data);
        });
      });
    }
  }]);

  return Docker;
}();