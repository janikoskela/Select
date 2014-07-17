SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainer = function() {

	this.type = "div";
	this.className = "value-container";
	this.element;

	this.render = function() {
		this.element = document.createElement(this.type);
    	this.element.setClass(this.className);
		return this.element;
	}
}