## Class: Service
Create a service

### Service.list(opts) 

Get the list of services
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-services

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of services

### Service.create(opts) 

Create a service
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-service

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the new service

### Service.update(opts, id) 

Update a service
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-service

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the service to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the new service

### Service.status(opts, id) 

Get low-level information on a service
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-one-or-more-services
The reason why this module isn't called inspect is because that interferes with the inspect utility of service.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the service to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the service

### Service.remove(opts, id) 

Remove a service
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-service

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the service to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result



* * *










