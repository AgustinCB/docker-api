'use strict';
/**
 * Class reprensenting a plugin
 */
class Plugin {
    /**
     * Creates a new plugin
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the plugin (optional)
     */
    constructor(modem, id) {
        this.modem = modem;
        this.id = id;
    }
    /**
     * Get the list of plugins
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-plugins
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of plugins
     */
    list(opts) {
        const call = {
            path: '/plugins?',
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, plugins) => {
                if (err)
                    return reject(err);
                if (!plugins || !plugins.length)
                    return resolve([]);
                resolve(plugins.map((conf) => {
                    const plugin = new Plugin(this.modem, conf.Id);
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
    upgrade(opts) {
        let id;
        [opts, id] = this.__processArguments(opts);
        const call = {
            path: `/plugins/${id}/upgrade?`,
            method: 'POST',
            options: opts,
            statusCodes: {
                204: true,
                404: 'plugin not installed',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, opts.name);
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
    create(opts) {
        const call = {
            path: '/plugins/create?',
            method: 'POST',
            options: opts,
            statusCodes: {
                204: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, opts.name);
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
    install(opts) {
        const call = {
            path: '/plugins/pull?',
            method: 'POST',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, opts.name);
                resolve(plugin);
            });
        });
    }
    /**
     * Get low-level information on a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-plugin
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    status(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/plugins/${id}?`,
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                404: 'no such plugin',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, id);
                resolve(Object.assign(plugin, conf));
            });
        });
    }
    /**
     * Remove a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/plugins/${id}?`,
            method: 'DELETE',
            options: opts,
            statusCodes: {
                200: true,
                404: 'no such plugin',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    }
    /**
     * push a plugin
     * https://docs.docker.com/engine/api/v1.26/#operation/PluginPush
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    push(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/plugins/${id}/push?`,
            method: 'POST',
            options: opts,
            statusCodes: {
                200: true,
                404: 'plugin not found',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, id);
                resolve(plugin);
            });
        });
    }
    /**
     * Set a plugin configuration
     * https://docs.docker.com/engine/api/v1.25/#operation/PluginSet
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    set(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/plugins/${id}/set?`,
            method: 'POST',
            options: opts,
            statusCodes: {
                204: true,
                404: 'plugin not found',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, id);
                resolve(plugin);
            });
        });
    }
    /**
     * Enable a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/enable-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    enable(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/plugins/${id}/enable?`,
            method: 'POST',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, id);
                resolve(plugin);
            });
        });
    }
    /**
     * Disable a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disable-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    disable(opts, id) {
        [opts, id] = this.__processArguments(opts, id);
        const call = {
            path: `/plugins/${id}/disable?`,
            method: 'POST',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const plugin = new Plugin(this.modem, id);
                resolve(plugin);
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
exports.default = Plugin;
//# sourceMappingURL=plugin.js.map