SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription = function(Facade, description) {
	this.type = "div";
	this.description = description;
	this.className = "options-container-list-item-description";
	this.element;

	this.render = function() {
    	this.element = new SELEX.UTILS.createElement(this.type, this.className);
    	this.textNode = document.createTextNode(this.description);
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
};

SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription.prototype = Object.create(SELEX.ELEMENTS.Element.prototype);