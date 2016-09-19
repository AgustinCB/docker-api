'use strict';

/**
 * Class reprensenting a network
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Network = function () {
  /**
   * Creates a new network
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the network (optional)
   */
  function Network(modem, id) {
    _classCallCheck(this, Network);

    this.modem = modem;
    this.id = id;
  }

  /**
   * Get the list of networks
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-networks
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of networks
   */


  _createClass(Network, [{
    key: 'list',
    value: function list(opts) {
      var _this = this;

      var call = {
        path: '/networks',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, networks) {
          if (err) return reject(err);
          if (!networks || !networks.length) return resolve([]);
          resolve(networks.map(function (conf) {
            var network = new Network(_this.modem, conf.Id);
            return Object.assign(network, conf);
          }));
        });
      });
    }

    /**
     * Create an network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new network
     */

  }, {
    key: 'create',
    value: function create(opts) {
      var _this2 = this;

      var call = {
        path: '/networks/create?',
        method: 'POST',
        options: opts,
        statusCodes: {
          201: true,
          404: 'plugin not found',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var network = new Network(_this2.modem, conf.Id);
          resolve(Object.assign(network, conf));
        });
      });
    }

    /**
     * Get low-level information on a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-network
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the network
     */

  }, {
    key: 'status',
    value: function status(opts, id) {
      var _this3 = this;

      var _processArguments = this.__processArguments(opts, id);

      var _processArguments2 = _slicedToArray(_processArguments, 2);

      opts = _processArguments2[0];
      id = _processArguments2[1];


      var call = {
        path: '/networks/' + id + '?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such network',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var network = new Network(_this3.modem, id);
          resolve(Object.assign(network, conf));
        });
      });
    }

    /**
     * Remove a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */

  }, {
    key: 'remove',
    value: function remove(opts, id) {
      var _this4 = this;

      var _processArguments3 = this.__processArguments(opts, id);

      var _processArguments4 = _slicedToArray(_processArguments3, 2);

      opts = _processArguments4[0];
      id = _processArguments4[1];

      var call = {
        path: '/networks/' + id + '?',
        method: 'DELETE',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such network',
          500: 'server error'
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
     * Connect a container into the network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/connect-a-container-to-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the network
     */

  }, {
    key: 'connect',
    value: function connect(opts, id) {
      var _this5 = this;

      var call = {
        path: '/networks/' + id + '/connect?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          403: 'operation not supported for swarm scoped network',
          404: 'network or container not found',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this5.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var network = new Network(_this5.modem, conf.Id);
          resolve(Object.assign(network, conf));
        });
      });
    }

    /**
     * Disonnect a container into the network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disconnect-a-container-from-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the network
     */

  }, {
    key: 'disconnect',
    value: function disconnect(opts, id) {
      var _this6 = this;

      var call = {
        path: '/networks/' + id + '/disconnect?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          403: 'operation not supported for swarm scoped network',
          404: 'network or container not found',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this6.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var network = new Network(_this6.modem, conf.Id);
          resolve(Object.assign(network, conf));
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

  return Network;
}();

exports.default = Network;