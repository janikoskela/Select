SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenu = function() {
	this.type = "ul";
	this.className = "options-container";
	this.element;
	this.width = "100%";

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

	this.close = function() {
		this.element.hide();
	}

	this.open = function() {
		this.element.show();
	}

	this.createOptionElements = function(options) {

	}

	this.toggleVisibility = function() {
		if (this.element.isHidden())
			this.open();
		else
			this.close();
	}
}