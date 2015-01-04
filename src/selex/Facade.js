SELEX.Facade = function() {
	this.subscribe = function(name, instance) {
		this[name] = instance;
		return instance;
	}

	this.publish = function(name, args) {
		var parts = name.split(":");
		if (parts.length > 1) {
			var instance = this[parts[0]];
			if (instance !== undefined) {
				var func = instance[parts[1]];
				return func(args);
			}
		}
		return this[name];
	}
};