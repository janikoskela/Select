SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(Facade) {
	var that = this;
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "value-container";
	this.element;
	this.loadingText = userDefinedSettings.loadingText || "Loading";

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);

        var valueContainerImage = Facade.subscribe("ValueContainerImage", new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage(Facade));
		var valueContainerImageElem = valueContainerImage.render();
		this.element.appendChild(valueContainerImageElem);
		var imageUrl = Facade.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (imageUrl === undefined || imageUrl === null)
			valueContainerImage.hide();
		else
			valueContainerImage.setImageUrl(imageUrl);

    	var valueContainerText = Facade.subscribe("ValueContainerText", new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(Facade));
    	var valueContainerTextElem = valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.refresh = function() {
		Facade.publish("ValueContainerText").refresh();
		var imageUrl = Facade.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (imageUrl !== undefined && imageUrl !== null) {
			Facade.publish("ValueContainerImage").setImageUrl(imageUrl);
			Facade.publish("ValueContainerImage").show();
		}
		else
			Facade.publish("ValueContainerImage").hide();	
	}

	this.enableLoadingMode = function() {
		Facade.publish("ValueContainerText").setText(this.loadingText);
		enableDotDotDotInterval();
	}

	function enableDotDotDotInterval() {
		var dots = ".";
		that.timeInterval = setInterval(function() {
			if (dots.length === 3)
				dots = ".";
			else
				dots += ".";
			Facade.publish("ValueContainerText").setText(that.loadingText + dots);
		}, 500);
	}

	this.disableLoadingMode = function() {
		clearInterval(this.timeInterval);
		Facade.publish("ValueContainerText").refresh();
	}
};

SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer.prototype = Object.create(SELEX.ELEMENTS.Element.prototype);