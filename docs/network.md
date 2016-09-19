## Class: Network
Creates a new network

### Network.list(opts) 

Get the list of networks
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-networks

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of networks

### Network.create(opts) 

Create an network
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-network

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the new network

### Network.status(opts, id) 

Get low-level information on a network
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-network
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the network to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the network

### Network.remove(opts, id) 

Remove a network
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-network

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the network to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result

### Network.connect(opts, id) 

Connect a container into the network
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/connect-a-container-to-a-network

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the network, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the network

### Network.disconnect(opts, id) 

Disonnect a container into the network
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disconnect-a-container-from-a-network

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the network, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the network



* * *










