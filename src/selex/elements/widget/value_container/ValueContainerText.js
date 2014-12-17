SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(params) {

	this.value;
	this.text;
	this.type = "span";
	this.className = "value-container-text";
	this.element;
	this.placeholder;
	this.defaultValue = params.defaultValue;
	this.placeholder = params.placeholder;

	this.render = function() {
		this.element = document.createElement(this.type, this.className);
    	this.element.innerHTML = this.text;
    	this.element.setDataAttribute("value", this.value);
    	if (this.defaultValue !== undefined) {
    		var option = SELEX.HELPERS.getOptionByValue(params.options, this.defaultValue);
    		if (option !== undefined) {
    			this.setValue(option.value);
    			this.setText(option.text);
    		}
    	}
    	else if (this.placeholder !== undefined) {
    		this.setPlaceholder(this.placeholder);
    	}
    	else if (params.options.length > 0) {
    		var firstOption = params.options[0];
    		this.setValue(firstOption.value);
    		this.setText(firstOption.text);
    	}

		return this.element;
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.element.innerHTML = this.placeholder;
	}

	this.setValue = function(value) {
		this.value = value;
		this.element.setDataAttribute("value", value);
	}

	this.setText = function(text) {
		this.text = text;
		this.element.innerHTML = text;
	}
};