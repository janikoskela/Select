SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function() {

	this.type = "div";
	this.element;
	this.className = "arrow-container";

	this.render = function() {
		this.element = document.createElement(this.type);
		this.element.setClass(this.className);
		return this.element;
	}

	this.getElement = function() {
		return this.element;
	}
};