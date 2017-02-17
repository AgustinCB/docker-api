/**
 * Class representing a volume
 */
declare class Volume {
    private modem;
    readonly id: string | undefined;
    /**
     * Create a volume
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the volume (optional)
     */
    constructor(modem: any, id?: any);
    /**
     * Get the list of volumes
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-volumes
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of volumes
     */
    list(opts: any): Promise<{}>;
    /**
     * Create a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new volume
     */
    create(opts: any): Promise<{}>;
    /**
     * Get low-level information on a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-volume
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the volume
     */
    status(opts: any, id: any): Promise<{}>;
    /**
     * Remove a volume from the filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts: any, id: any): Promise<{}>;
    /**
     * Prune volumes
     * https://docs.docker.com/engine/api/v1.25/#operation/VolumePrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts: any): Promise<{}>;
    __processArguments(opts: any, id: any): any[];
}
export default Volume;
