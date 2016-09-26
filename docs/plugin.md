## Class: Plugin
Creates a new plugin

### Plugin.list(opts) 

Get the list of plugins
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/list-plugins

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise returning the result as a list of plugins

### Plugin.install(opts) 

install a plugin
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/install-a-plugin

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**Returns**: `Promise`, Promise return the new plugin

### Plugin.status(opts, id) 

Get low-level information on a plugin
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/inspect-a-plugin
The reason why this module isn't called inspect is because that interferes with the inspect utility of node.

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the plugin to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the plugin

### Plugin.remove(opts, id) 

Remove a plugin
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/remove-a-plugin

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the plugin to inspect, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the result

### Plugin.enable(opts, id) 

Enable a plugin
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/enable-a-plugin

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the plugin, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the plugin

### Plugin.disconnect(opts, id) 

Disable a plugin
https://docs.docker.com/engine/reference/api/docker_remote_api_v1.24/#/disable-a-plugin

**Parameters**

**opts**: `Object`, Query params in the request (optional)

**id**: `String`, ID of the plugin, if it's not set, use the id of the object (optional)

**Returns**: `Promise`, Promise return the plugin



* * *










