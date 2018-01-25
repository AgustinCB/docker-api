'use strict';
/**
 * Class representing a secret
 */
class Secret {
    /**
     * Create a secret
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the secret (optional)
     */
    constructor(modem, id) {
        this.data = {};
        this.modem = modem;
        this.id = id;
    }
    /**
     * Get low-level information on a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretInspect
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the secret
     */
    status(opts) {
        const call = {
            path: `/secrets/${this.id}?`,
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                404: 'no such secret',
                406: '406 node is not part of a swarm',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const secret = new Secret(this.modem, this.id);
                secret.data = conf;
                resolve(secret);
            });
        });
    }
    /**
     * Remove a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretDelete
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts) {
        const call = {
            path: `/secrets/${this.id}?`,
            method: 'DELETE',
            options: opts,
            statusCodes: {
                204: true,
                404: 'no such secret',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err) => {
                if (err)
                    return reject(err);
                resolve();
            });
        });
    }
}
exports.Secret = Secret;
class default_1 {
    /**
     * Create a secret
     * @param  {Modem}      modem     Modem to connect to the remote service
     */
    constructor(modem) {
        this.modem = modem;
    }
    /**
     * Get a Secret Object
     * @param  {id}         string    ID of the secret
     * @return {Secret}
     */
    get(id) {
        return new Secret(this.modem, id);
    }
    /**
     * Get the list of secrets
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretList
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of secrets
     */
    list(opts) {
        const call = {
            path: '/secrets',
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, result) => {
                if (err)
                    return reject(err);
                if (!result.Secrets || !result.Secrets.length)
                    return resolve([]);
                resolve(result.Secrets.map((conf) => {
                    const secret = new Secret(this.modem, conf.Name);
                    secret.data = conf;
                    return secret;
                }));
            });
        });
    }
    /**
     * Create a secret
     * https://docs.docker.com/engine/api/v1.25/#operation/SecretCreate
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new secret
     */
    create(opts) {
        const call = {
            path: '/secrets/create?',
            method: 'POST',
            options: opts,
            statusCodes: {
                201: true,
                406: 'server error or node is not part of a swarm',
                409: '409 name conflicts with an existing Object',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const secret = new Secret(this.modem, conf.ID);
                secret.data = conf;
                resolve(secret);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=secret.js.map