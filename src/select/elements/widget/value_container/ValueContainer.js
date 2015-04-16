SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(Facade) {
	var that = this;
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "value-container";
	this.element;
	this.loadingText = userDefinedSettings.loadingText || "Loading";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);

        var valueContainerImage = Facade.subscribe("ValueContainerImage", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage(Facade));
		var valueContainerImageElem = valueContainerImage.render();
		this.element.appendChild(valueContainerImageElem);
		var imageUrl = Facade.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (SELECT.UTILS.isEmpty(imageUrl))
			valueContainerImage.hide();
		else
			valueContainerImage.setImageUrl(imageUrl);

    	var valueContainerText = Facade.subscribe("ValueContainerText", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(Facade));
    	var valueContainerTextElem = valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.getWidthByWidestOption = function(callback) {
		var options = Facade.publish("NativeSelectBox").getOptions();
		var origOption = Facade.publish("NativeSelectBox").getSelectedOption();
		var l = options.length;
		var widest = 0;
		for (var i = 0; i < l; i++) {
			var option = options[i];
			Facade.publish("NativeSelectBox").setSelectedOption(option.getValue());
			this.refresh();
			var elem = Facade.publish("Wrapper:getElement");
			var width = elem.offsetWidth;
			width += Facade.publish("ArrowContainer:getWidth");
			if (width > widest) {
				widest = width;
			}
		}
		Facade.publish("NativeSelectBox").setSelectedOption(origOption.value);
		this.refresh();
		return widest;
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

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);