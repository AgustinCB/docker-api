# Global





* * *

## Class: Exec
Create an execution


## Class: Exec
Create an execution

### Exec.create(opts, id) 

Create an exec instance in a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to get info, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the new exec instance

### Exec.start(opts, id) 

Start an exec instance
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-start

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the exec instance to start, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the stream to the execution

### Exec.resize(opts, id) 

Resize an exec instance
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-resize

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the exec instance to resize, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result

### Exec.status(opts, id) 

Get status of an exec instance
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/exec-inspect
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the exec instance to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the exec instance


## Class: ContainerFs
Create an container filesystem object


## Class: ContainerFs
Create an container filesystem object

### ContainerFs.info(opts, id) 

Get the info about the filesystem of the container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/retrieving-information-about-files-and-folders-in-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to get info, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the info about the filesystem

### ContainerFs.get(opts, id) 

Get a tar archive of a resource in the filesystem of a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-an-archive-of-a-filesystem-resource-in-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to get an archive, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the result as a stream to the tar file

### ContainerFs.put(opts, id) 

Put an extracted tar archive in the filesystem of a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/extract-an-archive-of-files-or-folders-to-a-directory-in-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to put the archive, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the result


## Class: Container
Create an container object


## Class: Container
Create an container object

### Container.list(opts) 

Get the list of containers
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-containers

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of containers

### Container.create(opts) 

Create a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the new container

### Container.status(opts, id) 

Get low-level information on a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-container
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the container

### Container.top(opts, id) 

Get list of processes (ps) inside a container. Not supported in Windows.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-processes-running-inside-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to get top processes, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the list of processes

### Container.logs(opts, id) 

Get stdout and stderr logs from a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-container-logs

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to get logs, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the concatenated logs

### Container.changes(id) 

Get changes on a container's filesystem
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-changes-on-a-container-s-filesystem

**Parameters**

**id**: `String`, ID of the container to inspect changes, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the changes

### Container.export(opts, id) 

Export the content of a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to export, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the content of the tar file as a stream or as a string

### Container.stats(opts, id) 

Get the stats of a container, either by a live stream or the current state
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/export-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to get stats, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the stats, in a stream or string

### Container.resize(opts, id) 

Resize the TTY for a container. You must restart the container to make the resize take effect.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/resize-a-container-tty

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to resize, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the response

### Container.start(opts, id) 

Start a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/start-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to start, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.stop(opts, id) 

Stop a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/stop-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to stop, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.restart(opts, id) 

Restart a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/restart-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to restart, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.kill(opts, id) 

Kill a container
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/kill-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to kill, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.update(opts, id) 

Update configuration a container.
Docs says you can do it for more than one, but doesn't exaplin how, so let's leave it in only one
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/update-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to update, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.rename(opts, id) 

Rename a container.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/rename-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to rename, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.pause(id) 

Pause a container.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/pause-a-container

**Parameters**

**id**: `String`, ID of the container to pause, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.unpause(id) 

Unpause a container.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/unpause-a-container

**Parameters**

**id**: `String`, ID of the container to resume, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.attach(opts, id) 

Attach to a container.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to attach, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container

### Container.wsattach(opts, id) 

Attach to a container using websocket.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/attach-to-a-container-websocket

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to attach, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the stream and the container

### Container.wait(id) 

Block until a container stops, returning exit code
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/wait-a-container

**Parameters**

**id**: `String`, ID of the container to wait, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the exit code

### Container.delete(opts, id) 

Remove a container.
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-container

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to remove, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning nothing

### Container.commit(opts, id) 

Commit container into an image
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-a-new-image-from-a-container-s-changes

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the container to commit, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise returning the container



* * *










