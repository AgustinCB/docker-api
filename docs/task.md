## Class: Task
Create a task

### Task.list(opts) 

Get the list of tasks
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-tasks

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of tasks

### Task.status(opts, id) 

Get low-level information on a task
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-task
The reason why this module isn't called inspect is because that interferes with the inspect utility of task.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the task to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the task



* * *










