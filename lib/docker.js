'use strict';
const Modem = require("docker-modem");
const container_1 = require("./container");
const image_1 = require("./image");
const volume_1 = require("./volume");
const network_1 = require("./network");
const node_1 = require("./node");
const plugin_1 = require("./plugin");
const secret_1 = require("./secret");
const service_1 = require("./service");
const swarm_1 = require("./swarm");
const task_1 = require("./task");
/**
 * Docker class with all methods
 */
class Docker {
    /**
     * Creates the Docker Object
     * @param {Object}  opts Docker options
     */
    constructor(opts) {
        this.modem = new Modem(opts);
        this.container = new container_1.default(this.modem);
        this.image = new image_1.default(this.modem);
        this.volume = new volume_1.default(this.modem);
        this.network = new network_1.default(this.modem);
        this.node = new node_1.default(this.modem);
        this.plugin = new plugin_1.default(this.modem);
        this.secret = new secret_1.default(this.modem);
        this.service = new service_1.default(this.modem);
        this.swarm = new swarm_1.default(this.modem);
        this.task = new task_1.default(this.modem);
    }
    /**
     * Validate credentials for a registry and get identity token,
     * if available, for accessing the registry without password
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/check-auth-configuration
     * @param  {Object}   opts  Auth options
     * @return {Promise}        Promise returning the result
     */
    auth(opts) {
        const call = {
            path: '/auth?',
            method: 'POST',
            options: opts,
            statusCodes: {
                200: true,
                204: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
    /**
     * Get system wide information about docker
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/display-system-wide-information
     * @return {Promise}        Promise returning the result
     */
    info() {
        const call = {
            path: '/info?',
            method: 'GET',
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
    /**
     * Get docker version information of server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/show-the-docker-version-information
     * @return {Promise}        Promise returning the result
     */
    version() {
        const call = {
            path: '/version?',
            method: 'GET',
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
    /**
     * Ping the docker server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/ping-the-docker-server
     * @return {Promise}        Promise returning the result
     */
    ping() {
        const call = {
            path: '/_ping?',
            method: 'GET',
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, data) => {
                if (err)
                    return reject(err);
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
    events(opts = {}) {
        const call = {
            path: '/events?',
            method: 'GET',
            options: opts,
            isStream: true,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, data) => {
                if (err)
                    return reject(err);
                resolve(data);
            });
        });
    }
}
exports.Docker = Docker;
//# sourceMappingURL=docker.js.map