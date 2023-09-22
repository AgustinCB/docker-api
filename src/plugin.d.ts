/**
 * Class reprensenting a plugin
 */
declare class Plugin {
    modem: any;
    id: any;
    /**
     * Creates a new plugin
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the plugin (optional)
     */
    constructor(modem: any, id?: any);
    /**
     * Get the list of plugins
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-plugins
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of plugins
     */
    list(opts: any): Promise<{}>;
    /**
     * upgrade a plugin
     * https://docs.docker.com/engine/api/v1.26/#operation/PluginUpgrade
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new plugin
     */
    upgrade(opts: any): Promise<{}>;
    /**
     * Create a plugin
     * https://docs.docker.com/engine/api/v1.25/#operation/PluginCreate
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new plugin
     */
    create(opts: any): Promise<{}>;
    /**
     * install a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/install-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new plugin
     */
    install(opts: any): Promise<{}>;
    /**
     * Get low-level information on a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-plugin
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    status(opts: any, id: any): Promise<{}>;
    /**
     * Remove a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts: any, id: any): Promise<{}>;
    /**
     * push a plugin
     * https://docs.docker.com/engine/api/v1.26/#operation/PluginPush
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    push(opts: any, id: any): Promise<{}>;
    /**
     * Set a plugin configuration
     * https://docs.docker.com/engine/api/v1.25/#operation/PluginSet
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    set(opts: any, id: any): Promise<{}>;
    /**
     * Enable a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/enable-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    enable(opts: any, id: any): Promise<{}>;
    /**
     * Disable a plugin
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disable-a-plugin
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the plugin, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the plugin
     */
    disable(opts: any, id: any): Promise<{}>;
    __processArguments(opts: any, id?: any): any[];
}
export default Plugin;
