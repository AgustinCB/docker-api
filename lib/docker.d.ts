import Modem = require('docker-modem');
import ContainerManager from './container';
import ImageManager from './image';
import VolumeManager from './volume';
import NetworkManager from './network';
import NodeManager from './node';
import PluginManager from './plugin';
import SecretManager from './secret';
import ServiceManager from './service';
import SwarmManager from './swarm';
import TaskManager from './task';
/**
 * Docker class with all methods
 */
export declare class Docker {
    modem: Modem;
    container: ContainerManager;
    image: ImageManager;
    volume: VolumeManager;
    network: NetworkManager;
    node: NodeManager;
    plugin: PluginManager;
    secret: SecretManager;
    service: ServiceManager;
    swarm: SwarmManager;
    task: TaskManager;
    /**
     * Creates the Docker Object
     * @param {Object}  opts Docker options
     */
    constructor(opts: any);
    /**
     * Validate credentials for a registry and get identity token,
     * if available, for accessing the registry without password
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/check-auth-configuration
     * @param  {Object}   opts  Auth options
     * @return {Promise}        Promise returning the result
     */
    auth(opts: Object): Promise<Object>;
    /**
     * Get system wide information about docker
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/display-system-wide-information
     * @return {Promise}        Promise returning the result
     */
    info(): Promise<Object>;
    /**
     * Get docker version information of server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/show-the-docker-version-information
     * @return {Promise}        Promise returning the result
     */
    version(): Promise<Object>;
    /**
     * Ping the docker server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/ping-the-docker-server
     * @return {Promise}        Promise returning the result
     */
    ping(): Promise<String>;
    /**
     * Get container events from docker, can be in real time via streaming or via polling (with since)
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/monitor-docker-s-events
     * @param  {Object}   opts  Options to send with the request (optional)
     * @return {Promise}        Promise returning the result
     */
    events(opts?: Object): Promise<Object>;
}
