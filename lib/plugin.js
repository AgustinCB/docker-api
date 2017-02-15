'use strict';

/**
 * Class reprensenting a plugin
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function () {
  /**
   * Creates a new plugin
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the plugin (optional)
   */
  function Plugin(modem, id) {
    _classCallCheck(this, Plugin);

    this.modem = modem;
    this.id = id;
  }

  /**
   * Get the list of plugins
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-plugins
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of plugins
   */


  _createClass(Plugin, [{
    key: 'list',
    value: function list(opts) {
      var _this = this;

      var call = {
        path: '/plugins?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, plugins) {
          if (err) return reject(err);
          if (!plugins || !plugins.length) return resolve([]);
          resolve(plugins.map(function (conf) {
            var plugin = new Plugin(_this.modem, conf.Id);
            return Object.assign(plugin, conf);
          }));
        });
      });
    }

    /**
     * upgrade a plugin
     * https://docs.docker.com/engine/api/v1.26/#operation/PluginUpgrade
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new plugin
     */

  }, {
    key: 'upgrade',
    value: function upgrade(opts) {
      var _this2 = this;

      var _processArguments = this.__processArguments(opts, id);

      var _processArguments2 = _slicedToArray(_processArguments, 2);

      opts = _processArguments2[0];
      id = _processArguments2[1];


      var call = {
        path: '/plugins/' + id + '/upgrade?',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'plugin not installed',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this2.modem, opts.name);
          resolve(plugin);
        });
      });
    }

    /**
     * Create a plugin
     * https://docs.docker.com/engine/api/v1.25/#operation/PluginCreate
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new plugin
     */

  }, {
    key: 'create',
    value: function create(opts) {
      var _this3 = this;

      var call = {
        path: '/plugins/create?',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this3.modem, opts.name);
          resolve(plugin);
        });
      });
    }

    /**
     * install a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/install-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new plugin
     */

  }, {
    key: 'install',
    value: function install(opts) {
      var _this4 = this;

      var call = {
        path: '/plugins/pull?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this4.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this4.modem, opts.name);
          resolve(plugin);
        });
      });
    }

    /**
     * Get low-level information on a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-plugin
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the plugin
     */

  }, {
    key: 'status',
    value: function status(opts, id) {
      var _this5 = this;

      var _processArguments3 = this.__processArguments(opts, id);

      var _processArguments4 = _slicedToArray(_processArguments3, 2);

      opts = _processArguments4[0];
      id = _processArguments4[1];


      var call = {
        path: '/plugins/' + id + '?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such plugin',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this5.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this5.modem, id);
          resolve(Object.assign(plugin, conf));
        });
      });
    }

    /**
     * Remove a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */

  }, {
    key: 'remove',
    value: function remove(opts, id) {
      var _this6 = this;

      var _processArguments5 = this.__processArguments(opts, id);

      var _processArguments6 = _slicedToArray(_processArguments5, 2);

      opts = _processArguments6[0];
      id = _processArguments6[1];

      var call = {
        path: '/plugins/' + id + '?',
        method: 'DELETE',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such plugin',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this6.modem.dial(call, function (err, res) {
          if (err) return reject(err);
          resolve(res);
        });
      });
    }

    /**
     * push a plugin
     * https://docs.docker.com/engine/api/v1.26/#operation/PluginPush
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the plugin
     */

  }, {
    key: 'push',
    value: function push(opts, id) {
      var _this7 = this;

      var _processArguments7 = this.__processArguments(opts, id);

      var _processArguments8 = _slicedToArray(_processArguments7, 2);

      opts = _processArguments8[0];
      id = _processArguments8[1];


      var call = {
        path: '/plugins/' + id + '/push?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          404: 'plugin not found',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this7.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this7.modem, id);
          resolve(plugin);
        });
      });
    }

    /**
     * Set a plugin configuration
     * https://docs.docker.com/engine/api/v1.25/#operation/PluginSet
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the plugin
     */

  }, {
    key: 'set',
    value: function set(opts, id) {
      var _this8 = this;

      var _processArguments9 = this.__processArguments(opts, id);

      var _processArguments10 = _slicedToArray(_processArguments9, 2);

      opts = _processArguments10[0];
      id = _processArguments10[1];


      var call = {
        path: '/plugins/' + id + '/set?',
        method: 'POST',
        options: opts,
        statusCodes: {
          204: true,
          404: 'plugin not found',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this8.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this8.modem, id);
          resolve(plugin);
        });
      });
    }

    /**
     * Enable a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/enable-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the plugin
     */

  }, {
    key: 'enable',
    value: function enable(opts, id) {
      var _this9 = this;

      var _processArguments11 = this.__processArguments(opts, id);

      var _processArguments12 = _slicedToArray(_processArguments11, 2);

      opts = _processArguments12[0];
      id = _processArguments12[1];


      var call = {
        path: '/plugins/' + id + '/enable?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this9.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this9.modem, id);
          resolve(plugin);
        });
      });
    }

    /**
     * Disable a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disable-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the plugin
     */

  }, {
    key: 'disable',
    value: function disable(opts, id) {
      var _this10 = this;

      var _processArguments13 = this.__processArguments(opts, id);

      var _processArguments14 = _slicedToArray(_processArguments13, 2);

      opts = _processArguments14[0];
      id = _processArguments14[1];


      var call = {
        path: '/plugins/' + id + '/disable?',
        method: 'POST',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this10.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var plugin = new Plugin(_this10.modem, id);
          resolve(plugin);
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

  return Plugin;
}();

exports.default = Plugin;