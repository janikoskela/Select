SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenu = function(optionLimit) {
	this.type = "ul";
	this.className = "options-container";
	this.element;
	this.width = "100%";
	this.height = "100%";
	this.optionLimit = optionLimit;

	this.render = function() {
    	this.element = document.createElement(this.type);
    	this.element.setClass(this.className);
    	this.close();
    	return this.element;
	}

	this.getElement = function() {
		return this.element;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.setHeight = function(height) {
		this.height = height;
		this.element.setStyle("height", this.height);
	}

	this.close = function() {
		this.element.hide();
	}

	this.open = function() {
		this.element.show();
		var children = this.element.children;
		if (children.length > 0) {
			var h = children[0].offsetHeight;
			if (children.length < this.optionLimit)
				h *= children.length;
			else
				h *= this.optionLimit;
			h += "px";
			this.setHeight(h);
		}
	}

	this.toggleVisibility = function() {
		if (this.element.isHidden())
			this.open();
		else
			this.close();
	}
}