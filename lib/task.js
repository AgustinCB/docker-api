'use strict';

/**
 * Class representing a task
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Task = function () {
  /**
   * Create a task
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the task (optional)
   */
  function Task(modem, id) {
    _classCallCheck(this, Task);

    this.modem = modem;
    this.id = id;
  }

  /**
   * Get the list of tasks
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-tasks
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of tasks
   */


  _createClass(Task, [{
    key: 'list',
    value: function list(opts) {
      var _this = this;

      var call = {
        path: '/tasks?',
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
          if (!result.Tasks || !result.Tasks.length) return resolve([]);
          resolve(result.Tasks.map(function (conf) {
            var task = new Task(_this.modem, conf.ID);
            return Object.assign(task, conf);
          }));
        });
      });
    }

    /**
     * Get low-level information on a task
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-task
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of task.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the task to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the task
     */

  }, {
    key: 'status',
    value: function status(opts, id) {
      var _this2 = this;

      var _processArguments = this.__processArguments(opts, id);

      var _processArguments2 = _slicedToArray(_processArguments, 2);

      opts = _processArguments2[0];
      id = _processArguments2[1];


      var call = {
        path: '/tasks/' + id + '?',
        method: 'GET',
        options: opts,
        statusCodes: {
          200: true,
          404: 'no such task',
          500: 'server error'
        }
      };

      return new Promise(function (resolve, reject) {
        _this2.modem.dial(call, function (err, conf) {
          if (err) return reject(err);
          var task = new Task(_this2.modem, id);
          resolve(Object.assign(task, conf));
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

  return Task;
}();

exports.default = Task;