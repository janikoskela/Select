SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage = function(Sandbox) {
	this.type = "img";
	this.imageUrl;
	this.element;

	this.render = function() {
		this.element = SELECT.UTILS.createElement(this.type);
		return this.element;
	}

	this.setImageUrl = function(imageUrl) {
		this.imageUrl = imageUrl;
		this.element.setAttribute("src", this.imageUrl);
	}

	this.show = function() {
		this.element.setStyle("display", "inline-block");
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);