SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(userDefinedSettings, widgetSubWrapper) {

	this.type = "div";
	this.className = "value-container";
	this.widgetSubWrapper = widgetSubWrapper;
	this.element;
	this.valueContainerText;
	this.valueContainerImage;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);

		this.valueContainerImage = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage();
		var valueContainerImageElem = this.valueContainerImage.render();
		this.element.appendChild(valueContainerImageElem);
		var imageUrl = this.widgetSubWrapper.getNativeSelect().getSelectedOptionImageUrl();
		if (imageUrl === undefined || imageUrl === null)
			this.valueContainerImage.hide();
		else
			this.valueContainerImage.setImageUrl(imageUrl);
    	this.valueContainerText = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(userDefinedSettings, this);
    	var valueContainerTextElem = this.valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.refresh = function() {
		this.valueContainerText.refresh();
		var imageUrl = this.widgetSubWrapper.getNativeSelect().getSelectedOptionImageUrl();
		console.log(imageUrl)
		if (imageUrl !== undefined && imageUrl !== null) {
			this.valueContainerImage.setImageUrl(imageUrl);
			this.valueContainerImage.show();
		}
		else
			this.valueContainerImage.hide();
	}

	this.getWidgetSubWrapper = function() {
		return this.widgetSubWrapper;
	}

	this.getValueContainerText = function() {
		return this.valueContainerText;
	}
};