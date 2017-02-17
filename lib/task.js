'use strict';
/**
 * Class representing a task
 */
class Task {
    /**
     * Create a task
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the task (optional)
     */
    constructor(modem, id) {
        this.modem = modem;
        this.id = id;
    }
    /**
     * Get the list of tasks
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-tasks
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of tasks
     */
    list(opts) {
        const call = {
            path: '/tasks?',
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, result) => {
                if (err)
                    return reject(err);
                if (!result.Tasks || !result.Tasks.length)
                    return resolve([]);
                resolve(result.Tasks.map((conf) => {
                    const task = new Task(this.modem, conf.ID);
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
    status(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/tasks/${id}?`,
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                404: 'no such task',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const task = new Task(this.modem, id);
                resolve(Object.assign(task, conf));
            });
        });
    }
    __processArguments(opts, id) {
        if (typeof opts === 'string' && !id) {
            id = opts;
        }
        if (!id && this.id) {
            id = this.id;
        }
        if (!opts)
            opts = {};
        return [opts, id];
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Task;
//# sourceMappingURL=task.js.map