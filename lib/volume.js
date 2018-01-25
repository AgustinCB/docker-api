'use strict';
/**
 * Class representing a volume
 */
class Volume {
    /**
     * Create a volume
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the volume (optional)
     */
    constructor(modem, id) {
        this.data = {};
        this.modem = modem;
        this.id = id;
    }
    /**
     * Get low-level information on a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-volume
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the volume
     */
    status(opts) {
        const call = {
            path: `/volumes/${this.id}?`,
            method: 'GET',
            options: opts,
            statusCodes: {
                200: true,
                404: 'no such volume',
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const volume = new Volume(this.modem, this.id);
                volume.data = conf;
                resolve(volume);
            });
        });
    }
    /**
     * Remove a volume from the filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the volume to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts) {
        const call = {
            path: `/volumes/${this.id}?`,
            method: 'DELETE',
            options: opts,
            statusCodes: {
                204: true,
                404: 'no such volume',
                409: 'conflict',
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
exports.Volume = Volume;
class default_1 {
    /**
     * Create a volume
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the volume (optional)
     */
    constructor(modem) {
        this.modem = modem;
    }
    /**
     * Get a Volume Object
     * @param  {id}         String    ID of the secret
     * @return {Volume}
     */
    get(id) {
        return new Volume(this.modem, id);
    }
    /**
     * Get the list of volumes
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-volumes
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of volumes
     */
    list(opts) {
        const call = {
            path: '/volumes',
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
                if (!result.Volumes || !result.Volumes.length)
                    return resolve([]);
                resolve(result.Volumes.map((conf) => {
                    const volume = new Volume(this.modem, conf.Name);
                    volume.data = conf;
                    return volume;
                }));
            });
        });
    }
    /**
     * Create a volume
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-volume
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new volume
     */
    create(opts) {
        const call = {
            path: '/volumes/create?',
            method: 'POST',
            options: opts,
            statusCodes: {
                201: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, conf) => {
                if (err)
                    return reject(err);
                const volume = new Volume(this.modem, conf.Name);
                volume.data;
                resolve(volume);
            });
        });
    }
    /**
     * Prune volumes
     * https://docs.docker.com/engine/api/v1.25/#operation/VolumePrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts) {
        const call = {
            path: `/volumes/prune`,
            method: 'POST',
            options: opts,
            statusCodes: {
                200: true,
                500: 'server error'
            }
        };
        return new Promise((resolve, reject) => {
            this.modem.dial(call, (err, res) => {
                if (err)
                    return reject(err);
                resolve(res);
            });
        });
    }
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
//# sourceMappingURL=volume.js.map