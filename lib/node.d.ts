/**
 * Class representing a node
 */
declare class Node {
    private modem;
    readonly id: string | undefined;
    /**
     * Create a node
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the node (optional)
     */
    constructor(modem: any, id?: any);
    /**
     * Get the list of nodes
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-nodes
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of nodes
     */
    list(opts: any): Promise<{}>;
    /**
     * Update a node
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-node
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the node to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the new node
     */
    update(opts: any, id: any): Promise<{}>;
    /**
     * Get low-level information on a node
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-node
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the node to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the node
     */
    status(opts: any, id: any): Promise<{}>;
    /**
     * Remove a node
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-node
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the node to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts: any, id: any): Promise<{}>;
    private __processArguments(opts, id);
}
export default Node;
