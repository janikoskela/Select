SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(Sandbox) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "value-container";
	this.element;
	this.loadingText = userDefinedSettings.loadingText || "Loading";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);

        var valueContainerImage = Sandbox.subscribe("ValueContainerImage", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage(Sandbox));
		var valueContainerImageElem = valueContainerImage.render();
		this.element.appendChild(valueContainerImageElem);
		var imageUrl = Sandbox.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (SELECT.UTILS.isEmpty(imageUrl))
			valueContainerImage.hide();
		else
			valueContainerImage.setImageUrl(imageUrl);

    	var valueContainerText = Sandbox.subscribe("ValueContainerText", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(Sandbox));
    	var valueContainerTextElem = valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.refresh = function() {
		if (Sandbox.publish("Wrapper:getLoadingMode"))
			return;
		Sandbox.publish("ValueContainerText").refresh();
		var imageUrl = Sandbox.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (!SELECT.UTILS.isEmpty(imageUrl)) {
			Sandbox.publish("ValueContainerImage").setImageUrl(imageUrl);
			Sandbox.publish("ValueContainerImage").show();
		}
		else
			Sandbox.publish("ValueContainerImage").hide();	
	}

	this.enableLoadingMode = function() {
		Sandbox.publish("ValueContainerText").setText(this.loadingText);
		enableDotDotDotInterval();
	}

	function enableDotDotDotInterval() {
		var dots = ".";
		that.timeInterval = setInterval(function() {
			if (dots.length === 3)
				dots = ".";
			else
				dots += ".";
			Sandbox.publish("ValueContainerText").setText(that.loadingText + dots);
		}, 500);
	}

	this.disableLoadingMode = function() {
		clearInterval(this.timeInterval);
		Sandbox.publish("ValueContainerText").refresh();
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);