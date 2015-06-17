SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage = function(Sandbox) {
	this.type = "img";
	this.imageUrl;
	this.element;
	this.loaded = false;

	this.render = function() {
		this.element = SELECT.UTILS.createElement(this.type);
		this.element.addEventListener("load", this.onLoad.bind(this), false);
		return this.element;
	}

	this.setImageUrl = function(imageUrl) {
		this.imageUrl = imageUrl;
		this.element.setAttribute("src", this.imageUrl);
	}

	this.show = function() {
		this.element.setStyle("display", "inline-block");
	}

	this.onLoad = function() {
		if (!this.loaded) {
			if (Sandbox.publish("Wrapper").isWidthDefinedByUser)
				return;
			var width = Sandbox.publish("Wrapper:getWidth");
			width += this.getOuterWidth();
			Sandbox.publish("Wrapper:setWidth", width);
			this.loaded = true;
		}
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);