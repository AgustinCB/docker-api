'use strict';

/**
 * Class representing a volume
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Volume = function () {
  /**
   * Create a volume
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the volume (optional)
   */
  function Volume(modem, id) {
    _classCallCheck(this, Volume);

    this.modem = modem;
    this.id = id;
  }

  /**
   * Get the list of volumes
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-volumes
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of volumes
   */


  _createClass(Volume, [{
    key: 'list',
    value: function list(opts) {
      var _this = this;

      var call = {
        path: '/volumes',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this.modem.dial(call, function (err, result) {
          if (err) return reject(err);
          if (!result.Volumes || !result.Volumes.length) return resolve([]);
          resolve(result.Volumes.map(function (conf) {
            var volume = new Volume(_this.modem, conf.Name);
            return Object.assign(volume, conf);
          }));
        });
      });
    }

    /**
     * Create an volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new volume
     */

  }, {
    key: 'create',
    value: function create(opts) {
      var _this2 = this;

      var call = {
        path: '/volumes/create?',
        method: 'POST',
        options: opts,
        statusCodes: {
          201: true,
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var volume = new Volume(_this2.modem, conf.Name);
          resolve(Object.assign(volume, conf));
        });
      });
    }

    /**
     * Get low-level information on a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-volume
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the volume
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
        path: '/volumes/' + id + '?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such volume',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this3.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var volume = new Volume(_this3.modem, id);
          resolve(Object.assign(volume, conf));
        });
      });
    }

    /**
     * Remove an volume from the filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
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
        path: '/volumes/' + id + '?',
        method: 'DELETE',
        options: opts,
        statusCodes: {
          204: true,
          404: 'no such volume',
          409: 'conflict',
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

  return Volume;
}();

exports.default = Volume;