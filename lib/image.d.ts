/// <reference types="node" />
import Modem = require('docker-modem');
import fs = require('fs');
/**
 * Class representing an image
 */
export declare class Image {
    modem: Modem;
    id: string;
    data: Object;
    /**
     * Creates a new image
     * @param  {Modem}  modem Modem to connect to the remote service
     * @param  {string} id    Container id
     */
    constructor(modem: Modem, id: string);
    /**
     * Get low-level information on an image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-an-image
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the image
     */
    status(opts?: Object): Promise<Image>;
    /**
     * History of the image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-the-history-of-an-image
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the image to inspect, if it's not set, use the id of the Object (optional)
     * @return {Promise}        Promise return the events in the history
     */
    history(opts?: Object): Promise<Array<Object>>;
    /**
     * Push an image to the registry
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/push-an-image-on-the-registry
     * @param  {Object}   auth  Authentication (optional)
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the resulting stream
     */
    push(auth?: Object, opts?: Object): Promise<Object>;
    /**
     * Tag the image into the registry
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/tag-an-image-into-a-repository
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the image
     */
    tag(opts?: Object): Promise<Image>;
    /**
     * Remove an image from the filesystem
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-an-image
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the result
     */
    remove(opts?: Object): Promise<Array<Object>>;
    /**
     * Get an image in a tarball
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-a-tarball-containing-all-images-in-a-repository
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the stream with the tarball
     */
    get(opts?: Object): Promise<Object>;
}
export default class  {
    modem: Modem;
    constructor(modem: Modem);
    /**
     * Get a Image Object
     * @param  {id}         string    ID of the secret
     * @return {Image}
     */
    get(id: string): Image;
    /**
     * Search an image on Docker Hub
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/search-images
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the images
     */
    search(opts?: Object): Promise<Array<Object>>;
    /**
     * Get the list of images
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-images
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of images
     */
    list(opts?: Object): Promise<Array<Image>>;
    /**
     * Build image from dockerfile
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/build-image-from-a-dockerfile
     * @file   {File}     file  Dockerfile to build
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {Object}   auth  Registry Auth Config, see linked engine documentation for details (optional)
     * @return {Promise}        Promise return the resulting stream
     */
    build(file: fs.ReadStream, opts?: Object, auth?: Object): Promise<Object>;
    /**
     * Create an image
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-an-image
     * @param  {Object}   auth  Authentication (optional)
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the resulting stream
     */
    create(auth: Object, opts?: Object): Promise<Object>;
    /**
     * Get all images in a tarball
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/get-a-tarball-containing-all-images
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the stream with the tarball
     */
    getAll(opts?: Object): Promise<Object>;
    /**
     * Load image from tarball
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/load-a-tarball-with-a-set-of-images-and-tags-into-docker
     * @file   {File}     file  Tarball to load
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise return the stream with the process
     */
    load(file: fs.ReadStream, opts?: Object): Promise<Object>;
    /**
     * Prune images
     * https://docs.docker.com/engine/api/v1.25/#operation/ImagePrune
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}          Promise returning the container
     */
    prune(opts?: Object): Promise<String>;
}
