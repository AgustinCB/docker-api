/// <reference types="docker-modem" />
import Modem = require("docker-modem");
/**
 * Class reprensenting a swarm
 */
declare class Swarm {
    private modem;
    readonly id: string | undefined;
    /**
     * Creates a new swarm
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the swarm (optional)
     */
    constructor(modem: Modem, id?: string);
    /**
     * Initialize a new swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/initialize-a-new-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new node
     */
    init(opts?: any): Promise<{}>;
    /**
     * Get low-level information on a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-swarm
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */
    status(opts?: any): Promise<{}>;
    /**
     * Join a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/join-an-existing-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    join(opts?: any): Promise<{}>;
    /**
     * Leave a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/leave-a-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */
    leave(opts?: any): Promise<{}>;
    /**
     * Update a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */
    update(opts?: any): Promise<{}>;
    private __processArguments(opts?, id?);
}
export default Swarm;
