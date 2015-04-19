SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage = function(Sandbox, imageUrl) {
	this.type = "img";
	this.imageUrl = imageUrl;
	this.element;

	this.render = function() {
    	this.element = new SELECT.UTILS.createElement(this.type);
    	this.element.setAttribute("src", this.imageUrl);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);