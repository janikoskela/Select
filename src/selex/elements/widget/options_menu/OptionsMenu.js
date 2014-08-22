SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(optionLimit) {
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

	this.getListElements = function() {
		return this.element.childNodes;
	}

	this.getSelectedChild = function() {
		var children = this.element.children;
		for (var key in children) {
			var child = children[key];
			if (typeof child === "object") {
				if (child.hasClass("selected"))
					return child;
			}
		}
	}

	this.getHoveredChild = function() {
		var children = this.element.children;
		for (var key in children) {
			var child = children[key];
			if (typeof child === "object") {
				if (child.hasClass("hovered"))
					return child;
			}
		}
	}

	this.clearChildHovers = function() {
		for (var i = 0; i < this.element.children.length; i++) {
			this.element.children[i].removeClass("hovered");
		}
	}

	this.setChildHovered = function(child) {
		child.addClass("hovered");
	}

	this.setChildSelected = function(child) {
		child.addClass("selected");
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

	this.isClosed = function() {
		return this.element.isHidden();
	}

	this.open = function() {
		this.element.show();
		var children = this.element.children;
		if (children.length > 0) {
			var h = children[0].offsetHeight;
			if (this.optionLimit === undefined || children.length < this.optionLimit)
				h *= children.length;
			else
				h *= this.optionLimit;
			h++; //so that element does not become scrollable in case visible options are not limited
			h += "px";
			if (this.optionLimit !== undefined)
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