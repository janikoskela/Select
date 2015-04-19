SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription = function(Sandbox, description) {
	this.type = "div";
	this.description = description;
	this.className = "options-container-list-item-description";
	this.element;

	this.render = function() {
    	this.element = new SELECT.UTILS.createElement(this.type, this.className);
    	this.textNode = document.createTextNode(this.description);
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);