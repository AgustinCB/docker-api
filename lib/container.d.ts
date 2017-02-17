/**
 * Class representing a container
 */
declare class Container {
    private modem;
    readonly id: string | undefined;
    private fs;
    private exec;
    private Warnings;
    /**
     * Create an container object
     * @param  {Modem}  modem Modem to connect to the remote service
     * @param  {string} id    Container id (optional)
     */
    constructor(modem: any, id?: any);
    /**
     * Get the list of containers
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-containers
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of containers
     */
    list(opts: any): Promise<{}>;
    /**
     * Create a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new container
     */
    create(opts: any): Promise<{}>;
    /**
     * Get low-level information on a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-container
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the container
     */
    status(opts: any, id: any): Promise<{}>;
    /**
     * Get list of processes (ps) inside a container. Not supported in Windows.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-processes-running-inside-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to get top processes, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the list of processes
     */
    top(opts: any, id: any): Promise<{}>;
    /**
     * Get stdout and stderr logs from a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-container-logs
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the container to get logs, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise returning the concatenated logs
     */
    logs(opts: any, id: any): Promise<{}>;
    /**
     * Get changes on a container's filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-changes-on-a-container-s-filesystem
     * @param  {String}   id    ID of the container to inspect changes, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise returning the changes
     */
    changes(id: any): Promise<{}>;
    /**
     * Export the content of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to export, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the content of the tar file as a stream or as a string
     */
    export(opts: any, id: any): Promise<{}>;
    /**
     * Get the stats of a container, either by a live stream or the current state
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to get stats, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the stats, in a stream or string
     */
    stats(opts: any, id: any): Promise<{}>;
    /**
     * Resize the TTY for a container. You must restart the container to make the resize take effect.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/resize-a-container-tty
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to resize, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the response
     */
    resize(opts: any, id: any): Promise<{}>;
    /**
     * Prune a container
     * https://docs.docker.com/engine/api/v1.25/#operation/ContainerPrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts: any): Promise<{}>;
    /**
     * Start a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/start-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to start, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    start(opts: any, id: any): Promise<{}>;
    /**
     * Stop a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/stop-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to stop, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    stop(opts: any, id: any): Promise<{}>;
    /**
     * Restart a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/restart-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to restart, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    restart(opts: any, id: any): Promise<{}>;
    /**
     * Kill a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/kill-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to kill, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    kill(opts: any, id: any): Promise<{}>;
    /**
     * Update configuration a container.
     * Docs says you can do it for more than one, but doesn't exaplin how, so let's leave it in only one
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to update, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    update(opts: any, id: any): Promise<{}>;
    /**
     * Rename a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/rename-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to rename, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    rename(opts: any, id: any): Promise<{}>;
    /**
     * Pause a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/pause-a-container
     * @param  {String}   id      ID of the container to pause, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    pause(id: any): Promise<{}>;
    /**
     * Unpause a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/unpause-a-container
     * @param  {String}   id      ID of the container to resume, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    unpause(id: any): Promise<{}>;
    /**
     * Attach to a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to attach, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    attach(opts: any, id: any): Promise<{}>;
    /**
     * Attach to a container using websocket.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container-websocket
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to attach, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the stream and the container
     */
    wsattach(opts: any, id: any): Promise<{}>;
    /**
     * Block until a container stops, returning exit code
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/wait-a-container
     * @param  {String}   id      ID of the container to wait, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the exit code
     */
    wait(id: any): Promise<{}>;
    /**
     * Remove a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id      ID of the container to remove, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning nothing
     */
    delete(opts: any, id: any): Promise<{}>;
    /**
     * Commit container into an image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-new-image-from-a-container-s-changes
     * @param  {Object}   opts    Query params in the request (optional)
     * @param  {String}   id      ID of the container to commit, if it's not set, use the id of the object (optional)
     * @return {Promise}          Promise returning the container
     */
    commit(opts: any, id: any): Promise<{}>;
    private __processArguments(opts, id?);
}
export default Container;
