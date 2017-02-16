/**
 * Class representing a secret
 */
declare class Secret {
    modem: any;
    id: any;
    /**
     * Create a secret
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the secret (optional)
     */
    constructor(modem: any, id: any);
    /**
     * Get the list of secrets
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretList
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of secrets
     */
    list(opts: any): Promise<{}>;
    /**
     * Create a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretCreate
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new secret
     */
    create(opts: any): Promise<{}>;
    /**
     * Get low-level information on a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretInspect
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the secret to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the secret
     */
    status(opts: any, id: any): Promise<{}>;
    /**
     * Remove a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretDelete
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the secret to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts: any, id: any): Promise<{}>;
    __processArguments(opts: any, id: any): any[];
}
export default Secret;
