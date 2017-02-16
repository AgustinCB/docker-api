/**
 * Docker class with all methods
 */
export declare class Docker {
    modem: any;
    container: any;
    image: any;
    volume: any;
    network: any;
    node: any;
    plugin: any;
    secret: any;
    service: any;
    swarm: any;
    task: any;
    /**
     * Creates the Docker object
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
    auth(opts: any): Promise<{}>;
    /**
     * Get system wide information about docker
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/display-system-wide-information
     * @return {Promise}        Promise returning the result
     */
    info(): Promise<{}>;
    /**
     * Get docker version information of server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/show-the-docker-version-information
     * @return {Promise}        Promise returning the result
     */
    version(): Promise<{}>;
    /**
     * Ping the docker server
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/ping-the-docker-server
     * @return {Promise}        Promise returning the result
     */
    ping(): Promise<{}>;
    /**
     * Get container events from docker, can be in real time via streaming or via polling (with since)
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/monitor-docker-s-events
     * @param  {Object}   opts  Options to send with the request (optional)
     * @return {Promise}        Promise returning the result
     */
    events(opts?: {}): Promise<{}>;
}
