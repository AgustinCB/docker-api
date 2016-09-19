# Global





* * *

## Class: Volume
Create a volume


## Class: Volume
Create a volume

### Volume.list(opts) 

Get the list of volumes
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-volumes

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of volumes

### Volume.create(opts) 

Create an volume
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-volume

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the new volume

### Volume.status(opts, id) 

Get low-level information on a volume
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-volume
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the volume to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the volume

### Volume.remove(opts, id) 

Remove an volume from the filesystem
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-volume

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the volume to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result



* * *










