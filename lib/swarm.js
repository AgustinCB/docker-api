'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _node = require('./node');

var _node2 = _interopRequireDefault(_node);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Class reprensenting a swarm
 */
var Swarm = function () {
  /**
   * Creates a new swarm
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the swarm (optional)
   */
  function Swarm(modem, id) {
    _classCallCheck(this, Swarm);

    this.modem = modem;
    this.id = id;
  }

  /**
   * Initialize a new swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/initialize-a-new-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new node
   */


  _createClass(Swarm, [{
    key: 'init',
    value: function init(opts) {
      var _this = this;

      var call = {
        path: '/swarm/init?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad parameter',
          406: 'node is already part of a swarm'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, nodeId) {
          if (err) return reject(err);
          var node = new _node2.default(_this.modem, nodeId);
          resolve(node);
        });
      });
    }

    /**
     * Get low-level information on a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-swarm
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */

  }, {
    key: 'status',
    value: function status(opts) {
      var _this2 = this;

      var call = {
        path: '/swarm?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such swarm',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var swarm = new Swarm(_this2.modem, conf.ID);
          resolve(Object.assign(swarm, conf));
        });
      });
    }

    /**
     * Join a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/join-an-existing-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */

  }, {
    key: 'join',
    value: function join(opts) {
      var _this3 = this;

      var call = {
        path: '/swarm/join?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad parameter',
          406: 'node is already part of a swarm'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }

    /**
     * Leave a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/leave-a-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */

  }, {
    key: 'leave',
    value: function leave(opts) {
      var _this4 = this;

      var call = {
        path: '/swarm/leave?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          406: 'node is not part of a swarm'
        }
      };

      return new Promise(function (resolve, reject) {
        _this4.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }

    /**
     * Update a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */

  }, {
    key: 'update',
    value: function update(opts) {
      var _this5 = this;

      var call = {
        path: '/swarm/update?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          400: 'bad parameter',
          406: 'node is already part of a swarm'
        }
      };

      return new Promise(function (resolve, reject) {
        _this5.modem.dial(call, function (err, res) {
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
      if (!id && this.id) {
        id = this.id;
      }
      if (!opts) opts = {};
      return [opts, id];
    }
  }]);

  return Swarm;
}();

exports.default = Swarm;