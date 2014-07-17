SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainerText = function(value, text) {

	this.value = value;
	this.text = text;
	this.type = "span";
	this.className = "value-container-text";
	this.element;

	this.render = function() {
		this.element = document.createElement(this.type);
    	this.element.setClass(this.className);
    	this.element.innerHTML = this.text;
    	this.element.setAttribute("value", this.value);
		return this.element;
	}

	this.setValue = function(value) {
		this.element.setAttribute("value", value);
	}

	this.setText = function(text) {
		this.element.innerHTML = text;
	}
}