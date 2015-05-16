SELECT.SANDBOX.Sandbox = function() {
	this.subscribe = function(name, instance) {
		this[name] = instance;
		return instance;
	}

	this.publish = function(name, args) {
		var parts = name.split(":");
		if (parts.length > 1) {
			var instance = this[parts[0]];
			var result = SELECT.UTILS.callFunc(instance, parts[1], args);
			if (result === undefined)
				return instance;
			return result;
		}
		return this[name];
	}
};