SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(userDefinedSettings, widgetSubWrapper) {

	this.type = "div";
	this.className = "value-container";
	this.widgetSubWrapper = widgetSubWrapper;
	this.element;
	this.valueContainerText;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.valueContainerText = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(userDefinedSettings, this);
    	var valueContainerTextElem = this.valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.getWidgetSubWrapper = function() {
		return this.widgetSubWrapper;
	}

	this.getValueContainerText = function() {
		return this.valueContainerText;
	}
};