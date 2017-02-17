/// <reference types="docker-modem" />
import Modem = require("docker-modem");
/**
 * Class reprensenting a network
 */
declare class Network {
    private modem;
    readonly id: string | undefined;
    /**
     * Creates a new network
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the network (optional)
     */
    constructor(modem: Modem, id?: string);
    /**
     * Get the list of networks
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-networks
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of networks
     */
    list(opts?: any): Promise<{}>;
    /**
     * Create a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new network
     */
    create(opts?: any): Promise<{}>;
    /**
     * Prune network
     * https://docs.docker.com/engine/api/v1.25/#operation/NetworkPrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts?: any): Promise<{}>;
    /**
     * Get low-level information on a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-network
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the network
     */
    status(opts?: any, id?: string): Promise<{}>;
    /**
     * Remove a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts?: any, id?: string): Promise<{}>;
    /**
     * Connect a container into the network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/connect-a-container-to-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the network
     */
    connect(opts?: any, id?: string): Promise<{}>;
    /**
     * Disonnect a container into the network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disconnect-a-container-from-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the network, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the network
     */
    disconnect(opts?: any, id?: string): Promise<{}>;
    private __processArguments(opts?, id?);
}
export default Network;
