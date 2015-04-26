SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage = function(Sandbox) {
	this.type = "img";
	this.imageUrl;
	this.element;
	var loaded = false;

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
		if (!loaded) {
			var width = Sandbox.publish("Wrapper:getWidth");
			width += this.getWidth();
			Sandbox.publish("Wrapper:setWidth", width);
			loaded = true;
		}
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);