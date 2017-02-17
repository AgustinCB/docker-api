/**
 * Class representing a task
 */
declare class Task {
    private modem;
    readonly id: string | undefined;
    /**
     * Create a task
     * @param  {Modem}      modem     Modem to connect to the remote service
     * @param  {string}     id        Id of the task (optional)
     */
    constructor(modem: any, id?: any);
    /**
     * Get the list of tasks
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-tasks
     * @param  {Object}   opts  Query params in the request (optional)
     * @return {Promise}        Promise returning the result as a list of tasks
     */
    list(opts: any): Promise<{}>;
    /**
     * Get low-level information on a task
     * https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-task
     * The reason why this module isn't called inspect is because that interferes with the inspect utility of task.
     * @param  {Object}   opts  Query params in the request (optional)
     * @param  {String}   id    ID of the task to inspect, if it's not set, use the id of the object (optional)
     * @return {Promise}        Promise return the task
     */
    status(opts: any, id: any): Promise<{}>;
    private __processArguments(opts, id);
}
export default Task;
