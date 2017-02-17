/// <reference types="docker-modem" />
import Modem = require("docker-modem");
/**
 * Class representing a service
 */
declare class Service {
    private modem;
    readonly id: string | undefined;
    /**
     * Create a service
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the service (optional)
     */
    constructor(modem: Modem, id?: string);
    /**
     * Get the list of services
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-services
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of services
     */
    list(opts?: any): Promise<{}>;
    /**
     * Create a service
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-service
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new service
     */
    create(opts?: any): Promise<{}>;
    /**
     * Update a service
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-service
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the service to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the new service
     */
    update(opts: any, id?: string): Promise<{}>;
    /**
     * Get low-level information on a service
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-one-or-more-services
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of service.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the service to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the service
     */
    status(opts: any, id?: string): Promise<{}>;
    /**
     * Remove a service
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-service
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the service to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts: any, id?: string): Promise<{}>;
    private __processArguments(opts, id?);
}
export default Service;
