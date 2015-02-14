SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle = function(Facade, text) {
	this.type = "h2";
	this.className = "options-menu-list-item-group-title";
	this.text = text;
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	return this.element;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);