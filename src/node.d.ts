import Modem = require('docker-modem');
/**
 * Class representing a node
 */
export declare class Node {
    modem: Modem;
    id: string;
    data: Object;
    /**
     * Create a node
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the node (optional)
     */
    constructor(modem: Modem, id: string);
    /**
     * Update a node
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-node
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new node
     */
    update(opts?: Object): Promise<Node>;
    /**
     * Get low-level information on a node
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-node
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the node
     */
    status(opts?: Object): Promise<{}>;
    /**
     * Remove a node
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-node
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts: Object): Promise<{}>;
}
export default class  {
    modem: Modem;
    /**
     * Create a node
     * @param  {Modem}      modem     Modem to connect to the remote service
     */
    constructor(modem: Modem);
    /**
     * Get a Node Object
     * @param  {id}         string    ID of the secret
     * @return {Node}
     */
    get(id: string): Node;
    /**
     * Get the list of nodes
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-nodes
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of nodes
     */
    list(opts?: Object): Promise<Array<Node>>;
}
