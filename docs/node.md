## Class: Node
Create a node

### Node.list(opts) 

Get the list of nodes
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-nodes

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of nodes

### Node.update(opts, id) 

Update a node
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-node

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the node to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the new node

### Node.status(opts, id) 

Get low-level information on a node
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-node
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the node to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the node

### Node.remove(opts, id) 

Remove a node
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-node

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the node to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result



* * *










