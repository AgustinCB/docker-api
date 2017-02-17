"use strict";

import Modem = require("docker-modem");

/**
 * Class representing a secret
 */
class Secret {

  private modem: Modem;
  public readonly id: string | undefined;

  /**
   * Create a secret
   * @param  {Modem}      modem     Modem to connect to the remote service
   * @param  {string}     id        Id of the secret (optional)
   */
  constructor (modem: Modem, id?: string) {
    this.modem = modem;
    this.id = id;
  }

  /**
   * Get the list of secrets
   * https://docs.docker.com/engine/api/v1.25/#operation/SecretList
   * @param  {Object}   opts  Query params in the request (optional)
   * @return {Promise}        Promise returning the result as a list of secrets
   */
  public list (opts?: any) {
    const call = {
      path: "/secrets",
      method: "GET",
      options: opts,
      statusCodes: {
        200: true,
        500: "server error"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, result: any) => {
        if (err) return reject(err);
        if (!result.Secrets || !result.Secrets.length) return resolve([]);
        resolve(result.Secrets.map((conf: any) => {
          const secret = new Secret(this.modem, conf.Name);
          return Object.assign(secret, conf);
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
  public create (opts?: any) {
    const call = {
      path: "/secrets/create?",
      method: "POST",
      options: opts,
      statusCodes: {
        201: true,
        406: "server error or node is not part of a swarm",
        409: "409 name conflicts with an existing object",
        500: "server error"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf: any) => {
        if (err) return reject(err);
        const secret = new Secret(this.modem, conf.Name);
        resolve(Object.assign(secret, conf));
      });
    });
  }

  /**
   * Get low-level information on a secret
   * https://docs.docker.com/engine/api/v1.25/#operation/SecretInspect
   * The reason why this module isn't called inspect is because that interferes with the inspect utility of node.
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the secret to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the secret
   */
  public status (opts?: any, id?: string) {
    [ opts, id ] = this.__processArguments(opts, id);

    const call = {
      path: `/secrets/${id}?`,
      method: "GET",
      options: opts,
      statusCodes: {
        200: true,
        404: "no such secret",
        406: "406 node is not part of a swarm",
        500: "server error"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, conf) => {
        if (err) return reject(err);
        const secret = new Secret(this.modem, id);
        resolve(Object.assign(secret, conf));
      });
    });
  }

  /**
   * Remove a secret
   * https://docs.docker.com/engine/api/v1.25/#operation/SecretDelete
   * @param  {Object}   opts  Query params in the request (optional)
   * @param  {String}   id    ID of the secret to inspect, if it's not set, use the id of the object (optional)
   * @return {Promise}        Promise return the result
   */
  public remove (opts?: any, id?: string) {
    [ opts, id ] = this.__processArguments(opts, id);
    const call = {
      path: `/secrets/${id}?`,
      method: "DELETE",
      options: opts,
      statusCodes: {
        204: true,
        404: "no such secret",
        500: "server error"
      }
    };

    return new Promise((resolve, reject) => {
      this.modem.dial(call, (err, res) => {
        if (err) return reject(err);
        resolve(res);
      });
    });
  }

  private __processArguments (opts?: any, id?: string): [any, string|undefined] {
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

export default Secret;
