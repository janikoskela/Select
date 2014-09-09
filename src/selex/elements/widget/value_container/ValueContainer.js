SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(params) {

	this.type = "div";
	this.className = "value-container";
	this.element;
	this.valueContainerText;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
    	this.element.setClass(this.className);

    	this.valueContainerText = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(params);
    	var valueContainerTextElem = this.valueContainerText.render();

    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}
};