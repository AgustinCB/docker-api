/// <reference types="node" />
import Modem = require('docker-modem');
import { Image } from './image';
import fs = require('fs');
/**
 * Class representing container execution
 */
export declare class Exec {
    modem: Modem;
    container: Container;
    id: string;
    data: Object;
    /**
     * Create an execution
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {Container}  container Container that owns the execution (optional)
     * @param  {string}     id        Id of the execution
     */
    constructor(modem: Modem, container: Container, id: string);
    /**
     * Create an exec instance in a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new exec instance
     */
    create(opts?: Object): Promise<Exec>;
    /**
     * Start an exec instance
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-start
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the stream to the execution
     */
    start(opts?: any): Promise<Object>;
    /**
     * Resize an exec instance
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-resize
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    resize(opts?: Object): Promise<{}>;
    /**
     * Get status of an exec instance
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-inspect
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the exec instance
     */
    status(opts?: Object): Promise<Exec>;
}
/**
 * Class representing container execution management
 */
export declare class ExecManager {
    modem: Modem;
    container: Container;
    /**
     * Create an execution
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {Container}  container Container that owns the execution (optional)
     * @param  {string}     id        Id of the execution
     */
    constructor(modem: Modem, container: Container);
    /**
     * Get a Exec Object
     * @param  {id}         string    ID of the exec
     * @return {Exec}
     */
    get(id: string): Exec;
    /**
     * Create an exec instance in a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new exec instance
     */
    create(opts?: Object): Promise<Exec>;
}
/**
 * Class representing container filesystem
 */
export declare class ContainerFs {
    modem: Modem;
    container: Container;
    /**
     * Create an container filesystem Object
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {Container}  container Container that owns the filesystem (optional)
     */
    constructor(modem: Modem, container: Container);
    /**
     * Get the info about the filesystem of the container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/retrieving-information-about-files-and-folders-in-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the info about the filesystem
     */
    info(opts?: Object): Promise<String>;
    /**
     * Get a tar archive of a resource in the filesystem of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-an-archive-of-a-filesystem-resource-in-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a stream to the tar file
     */
    get(opts?: any): Promise<Object>;
    /**
     * Put an extracted tar archive in the filesystem of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/extract-an-archive-of-files-or-folders-to-a-directory-in-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result
     */
    put(file: fs.ReadStream, opts?: Object): Promise<Object>;
}
/**
 * Class representing a container
 */
export declare class Container {
    modem: Modem;
    id: string;
    fs: ContainerFs;
    exec: ExecManager;
    Warnings: Array<String>;
    data: Object;
    /**
     * Create an container Object
     * @param  {Modem}  modem Modem to connect to the remote service
     * @param  {string} id    Container id
     */
    constructor(modem: Modem, id: string);
    /**
     * Get low-level information on a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-container
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the container
     */
    status(opts?: Object): Promise<Container>;
    /**
     * Get list of processes (ps) inside a container. Not supported in Windows.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-processes-running-inside-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the list of processes
     */
    top(opts?: Object): Promise<Array<Object>>;
    /**
     * Get stdout and stderr logs from a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-container-logs
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the concatenated logs
     */
    logs(opts?: Object): Promise<Object>;
    /**
     * Get changes on a container's filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-changes-on-a-container-s-filesystem
     * @return {Promise}        Promise returning the changes
     */
    changes(): Promise<Array<Object>>;
    /**
     * Export the content of a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the content of the tar file as a stream or as a string
     */
    export(opts?: any): Promise<Object>;
    /**
     * Get the stats of a container, either by a live stream or the current state
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the stats, in a stream or string
     */
    stats(opts?: Object): Promise<Object>;
    /**
     * Resize the TTY for a container. You must restart the container to make the resize take effect.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/resize-a-container-tty
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the response
     */
    resize(opts?: Object): Promise<Object>;
    /**
     * Start a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/start-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    start(opts?: Object): Promise<Container>;
    /**
     * Stop a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/stop-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    stop(opts?: Object): Promise<Container>;
    /**
     * Restart a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/restart-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    restart(opts?: Object): Promise<Container>;
    /**
     * Kill a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/kill-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    kill(opts?: Object): Promise<Container>;
    /**
     * Update configuration a container.
     * Docs says you can do it for more than one, but doesn't exaplin how, so let's leave it in only one
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    update(opts?: Object): Promise<Container>;
    /**
     * Rename a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/rename-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    rename(opts: Object): Promise<Container>;
    /**
     * Pause a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/pause-a-container
     * @return {Promise}          Promise returning the container
     */
    pause(): Promise<Container>;
    /**
     * Unpause a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/unpause-a-container
     * @return {Promise}          Promise returning the container
     */
    unpause(): Promise<Container>;
    /**
     * Attach to a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    attach(opts?: any): Promise<Array<Object>>;
    /**
     * Attach to a container using websocket.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container-websocket
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the stream and the container
     */
    wsattach(opts?: Object): Promise<Array<Object>>;
    /**
     * Block until a container stops, returning exit code
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/wait-a-container
     * @return {Promise}          Promise returning the exit code
     */
    wait(): Promise<Number>;
    /**
     * Remove a container.
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning nothing
     */
    delete(opts?: Object): Promise<{}>;
    /**
     * Commit container into an image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-new-image-from-a-container-s-changes
     * @param  {Object}   opts    Query params in the request (optional)
     * @return {Promise}          Promise returning the new image
     */
    commit(opts?: any): Promise<Image>;
}
export default class  {
    modem: Modem;
    constructor(modem: Modem);
    /**
     * Get a Container Object
     * @param  {id}         string    ID of the container
     * @return {Container}
     */
    get(id: string): Container;
    /**
     * Get the list of containers
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-containers
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of containers
     */
    list(opts?: Object): Promise<Array<Container>>;
    /**
     * Create a container
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the new container
     */
    create(opts?: Object): Promise<Container>;
    /**
     * Prune a container
     * https://docs.docker.com/engine/api/v1.25/#operation/ContainerPrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts?: Object): Promise<Object>;
}
