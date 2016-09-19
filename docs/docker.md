# Global





* * *




## Class: Docker



## Class: Docker
Creates the Docker object

### Docker.auth(opts) 

Validate credentials for a registry and get identity token,
if available, for accessing the registry without password
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/check-auth-configuration

**Parameters**

**opts**: `Object`, Auth options

**Returns**: `Promise`, Promise returning the result

### Docker.info() 

Get system wide information about docker
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/display-system-wide-information

**Returns**: `Promise`, Promise returning the result

### Docker.version() 

Get docker version information of server
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/show-the-docker-version-information

**Returns**: `Promise`, Promise returning the result

### Docker.ping() 

Ping the docker server
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/ping-the-docker-server

**Returns**: `Promise`, Promise returning the result

### Docker.events(opts) 

Get container events from docker, can be in real time via streaming or via polling (with since)
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/monitor-docker-s-events

**Parameters**

**opts**: `Object`, Options to send with the request (optional)

**Returns**: `Promise`, Promise returning the result



* * *










