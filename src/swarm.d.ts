import Modem = require('docker-modem');
import { Node } from './node';
/**
 * Class reprensenting a swarm
 */
export default class Swarm {
    modem: Modem;
    data: Object;
    /**
     * Creates a new swarm
     * @param  {Modem}      modem     Modem to connect to the remote service
     */
    constructor(modem: Modem);
    /**
     * Initialize a new swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/initialize-a-new-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new node
     */
    init(opts?: Object): Promise<Node>;
    /**
     * Get low-level information on a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-swarm
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */
    status(opts?: Object): Promise<Swarm>;
    /**
     * Join a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/join-an-existing-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    join(opts?: Object): Promise<String>;
    /**
     * Leave a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/leave-a-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */
    leave(opts?: Object): Promise<String>;
    /**
     * Update a swarm
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-swarm
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the swarm
     */
    update(opts?: Object): Promise<String>;
}
