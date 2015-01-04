SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage = function(Facade, imageUrl) {
	this.type = "img";
	this.imageUrl = imageUrl;
	this.element;

	this.render = function() {
    	this.element = new SELEX.UTILS.createElement(this.type);
    	this.element.setAttribute("src", this.imageUrl);
    	return this.element;
	}
};