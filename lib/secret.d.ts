import Modem = require('docker-modem');
/**
 * Class representing a secret
 */
export declare class Secret {
    modem: Modem;
    id: String;
    data: Object;
    /**
     * Create a secret
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the secret (optional)
     */
    constructor(modem: Modem, id: String);
    /**
     * Get low-level information on a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretInspect
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the secret
     */
    status(opts?: Object): Promise<Secret>;
    /**
     * Remove a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretDelete
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts?: Object): Promise<{}>;
}
export default class  {
    modem: Modem;
    /**
     * Create a secret
     * @param  {Modem}      modem     Modem to connect to the remote service
     */
    constructor(modem: Modem);
    /**
     * Get a Secret object
     * @param  {id}         string    ID of the secret
     * @return {Secret}
     */
    get(id: String): Secret;
    /**
     * Get the list of secrets
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretList
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of secrets
     */
    list(opts?: Object): Promise<Array<Secret>>;
    /**
     * Create a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretCreate
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new secret
     */
    create(opts?: Object): Promise<Secret>;
}
