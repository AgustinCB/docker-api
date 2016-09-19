# Global





* * *

## Class: Image
Creates a new image


## Class: Image
Creates a new image

### Image.list(opts) 

Get the list of images
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-images

Deprecated: true

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of images

### Image.create(auth, opts) 

Create an image
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/create-an-image

**Parameters**

**auth**: `Object`, Authentication (optional)

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the resulting stream

### Image.status(opts, id) 

Get low-level information on an image
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-an-image
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the image to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the image

### Image.history(opts, id) 

History of the image
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-the-history-of-an-image

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the image to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the events in the history

### Image.push(auth, opts, id) 

Push an image to the registry
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/push-an-image-on-the-registry

**Parameters**

**auth**: `Object`, Authentication (optional)

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the image to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the resulting stream

### Image.tag(opts, id) 

Tag the image into the registry
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/tag-an-image-into-a-repository

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the image to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the image

### Image.remove(opts, id) 

Remove an image from the filesystem
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-an-image

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the image to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result

### Image.search(opts) 

Search an image on Docker Hub
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/search-images

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the images

### Image.get(opts, id) 

Get an image in a tarball
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/get-a-tarball-containing-all-images-in-a-repository

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the image to get, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the stream with the tarball

### Image.getAll(opts) 

Get all images in a tarball
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/get-a-tarball-containing-all-images

Deprecated: true

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the stream with the tarball



* * *







**Overview:** {File}     file  Tarball to load


