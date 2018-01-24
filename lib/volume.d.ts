import Modem = require('docker-modem');
/**
 * Class representing a volume
 */
export declare class Volume {
    modem: Modem;
    id: string;
    data: object;
    /**
     * Create a volume
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the volume (optional)
     */
    constructor(modem: Modem, id: string);
    /**
     * Get low-level information on a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-volume
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the volume
     */
    status(opts?: object): Promise<Volume>;
    /**
     * Remove a volume from the filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts?: object): Promise<{}>;
}
export default class  {
    modem: Modem;
    /**
     * Create a volume
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the volume (optional)
     */
    constructor(modem: Modem);
    /**
     * Get a Volume object
     * @param  {id}         String    ID of the secret
     * @return {Volume}
     */
    get(id: string): Volume;
    /**
     * Get the list of volumes
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-volumes
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of volumes
     */
    list(opts?: object): Promise<Array<Volume>>;
    /**
     * Create a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new volume
     */
    create(opts?: object): Promise<Volume>;
    /**
     * Prune volumes
     * https://docs.docker.com/engine/api/v1.25/#operation/VolumePrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts?: object): Promise<Object>;
}
