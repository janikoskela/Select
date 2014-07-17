SELEX.ELEMENTS.NativeSelectBox = function() {

	this.type = "select";
	this.width = "100%";

	this.render = function() {
		this.element = document.createElement(this.type);
		return this.element;
	}

	this.getElement = function() {
		return this.element;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.show();
	}

}