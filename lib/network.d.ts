import Modem = require('docker-modem');
/**
 * Class reprensenting a network
 */
export declare class Network {
    modem: Modem;
    id: string;
    data: object;
    /**
     * Creates a new network
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the network (optional)
     */
    constructor(modem: Modem, id: string);
    /**
     * Get low-level information on a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-network
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the network
     */
    status(opts?: object): Promise<{}>;
    /**
     * Remove a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts?: object): Promise<{}>;
    /**
     * Connect a container into the network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/connect-a-container-to-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the network
     */
    connect(opts?: object): Promise<{}>;
    /**
     * Disonnect a container into the network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disconnect-a-container-from-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the network
     */
    disconnect(opts?: object): Promise<Network>;
}
export default class  {
    modem: Modem;
    constructor(modem: Modem);
    /**
     * Get a Network object
     * @param  {id}         string    ID of the secret
     * @return {Network}
     */
    get(id: string): Network;
    /**
     * Get the list of networks
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-networks
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of networks
     */
    list(opts?: object): Promise<Array<Network>>;
    /**
     * Create a network
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-network
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new network
     */
    create(opts?: object): Promise<Network>;
    /**
     * Prune network
     * https://docs.docker.com/engine/api/v1.25/#operation/NetworkPrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts?: object): Promise<Object>;
}
