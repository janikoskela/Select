SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(userDefinedSettings, valueContainer) {
	var that = this;
	this.type = "span";
	this.className = "value-container-text";
	this.valueContainer = valueContainer;
	this.element;
	this.placeholder = userDefinedSettings.placeholder;
	this.text = this.valueContainer.getWidgetSubWrapper().getWidgetWrapper().getWrapper().getNativeSelect().getSelectedOptionText();

	this.render = function() {
		this.element = SELEX.UTILS.createElement(this.type, this.className);
		if (this.text === undefined || this.text === null)
			this.setText(this.placeholder);
		else if (this.text.length  === 0)
			this.setText(this.placeholder);
		else
			this.setText(this.text);
		return this.element;
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