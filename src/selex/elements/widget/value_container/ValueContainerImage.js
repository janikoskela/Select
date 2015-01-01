SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage = function() {
	this.type = "img";
	this.imageUrl;
	this.element;

	this.render = function() {
		this.element = SELEX.UTILS.createElement(this.type);
		return this.element;
	}

	this.setImageUrl = function(imageUrl) {
		this.imageUrl = imageUrl;
		this.element.setAttribute("src", this.imageUrl);
	}

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.setStyle("display", "inline-block");
	}
};