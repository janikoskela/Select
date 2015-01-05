SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle = function(Facade, text) {
	this.type = "div";
	this.className = "options-menu-list-item-group-title";
	this.text = text;
	this.element;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	return this.element;
	}

	this.getElement = function() {
		return this.element;
	}
};