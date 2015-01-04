SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue = function(Facade, option) {
	this.option = option;
	this.type = "span";
	this.element;
	this.textNode;

	this.render = function() {
    	this.element = document.createElement(this.type);
    	this.textNode = document.createTextNode(this.option.getText());
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
};