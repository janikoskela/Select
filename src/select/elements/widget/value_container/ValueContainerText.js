SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	var that = this;
	this.type = "span";
	this.className = "value-container-text";
	this.element;
	this.placeholder = userDefinedSettings.placeholder;

	this.render = function() {
		this.element = SELECT.UTILS.createElement(this.type, this.className);
		this.refresh();
		return this.element;
	}

	this.refresh = function() {
		var text = Facade.publish("NativeSelectBox").getSelectedOptionText();
		if (text === undefined || text === null && this.placeholder !== undefined)
			this.setText(this.placeholder);
		else if (text.length  === 0 && this.placeholder !== undefined)
			this.setText(this.placeholder);
		else
			this.setText(text);
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.element.innerHTML = this.placeholder;
	}

	this.setText = function(text) {
		this.text = text;
		this.element.innerHTML = text;
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);