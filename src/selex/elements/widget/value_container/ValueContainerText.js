SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(params) {

	this.value;
	this.text;
	this.type = "span";
	this.className = "value-container-text";
	this.element;
	this.placeholder;

	this.render = function() {
		this.element = document.createElement(this.type);
    	this.element.setClass(this.className);
    	this.element.innerHTML = this.text;
    	this.element.setAttribute("data-value", this.value);
		return this.element;
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.element.innerHTML = this.placeholder;
	}

	this.setValue = function(value) {
		this.value = value;
		this.element.setAttribute("data-value", value);
	}

	this.setText = function(text) {
		this.text = text;
		this.element.innerHTML = text;
	}
};