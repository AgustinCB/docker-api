"use strict";

import Node from "./node";
import Modem = require("docker-modem");

/**
 * Class reprensenting a swarm
 */
class Swarm {

  private modem: Modem;
  public readonly id: string | undefined;

  /**
   * Creates a new swarm
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the swarm (optional)
   */
  constructor (modem, id?) {
    this.modem = modem;
    this.id = id;
  }

  /**
   * Initialize a new swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/initialize-a-new-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the new node
   */
  public init (opts) {
    const call = {
      path: "/swarm/init?",
      method: "POST",
      options: opts,
      statusCodes: {
        200: true,
        400: "bad parameter",
        406: "node is already part of a swarm"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, nodeId) => {
        if (err) return reject(err);
        const node = new Node(this.modem, nodeId);
        resolve(node);
      });
    });
  }

  /**
   * Get low-level information on a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-swarm
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the swarm
   */
  public status (opts) {
    const call = {
      path: `/swarm?`,
      method: "GET",
      options: opts,
      statusCodes: {
        200: true,
        404: "no such swarm",
        500: "server error"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err);
        const swarm = new Swarm(this.modem, conf.ID);
        resolve(Object.assign(swarm, conf));
      });
    });
  }

  /**
   * Join a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/join-an-existing-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the result
   */
  public join (opts) {
    const call = {
      path: `/swarm/join?`,
      method: "POST",
      options: opts,
      statusCodes: {
        200: true,
        400: "bad parameter",
        406: "node is already part of a swarm"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  /**
   * Leave a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/leave-a-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the swarm
   */
  public leave (opts) {
    const call = {
      path: `/swarm/leave?`,
      method: "POST",
      options: opts,
      statusCodes: {
        200: true,
        406: "node is not part of a swarm"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  /**
   * Update a swarm
   * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-swarm
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise return the swarm
   */
  public update (opts) {
    const call = {
      path: `/swarm/update?`,
      method: "POST",
      options: opts,
      statusCodes: {
        200: true,
        400: "bad parameter",
        406: "node is already part of a swarm"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  private __processArguments (opts, id) {
    if (typeof opts === "string" && !id) {
      id = opts;
    }
    if (!id && this.id) {
      id = this.id;
    }
    if (!opts) opts = {};
    return [ opts, id ];
  }
}

export default Swarm;
