## Class: Swarm
Creates a new swarm

### Swarm.init(opts) 

Initialize a new swarm
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/initialize-a-new-swarm

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the new node

### Swarm.status(opts) 

Get low-level information on a swarm
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-swarm
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the swarm

### Swarm.join(opts) 

Join a swarm
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/join-an-existing-swarm

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the result

### Swarm.leave(opts) 

Leave a swarm
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/leave-a-swarm

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the swarm

### Swarm.update(opts) 

Update a swarm
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-swarm

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the swarm



* * *










