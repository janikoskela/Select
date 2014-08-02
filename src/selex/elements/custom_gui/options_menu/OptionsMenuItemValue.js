SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenuItemValue = function(text) {
	this.text = text;
	this.type = "span";
	this.element;
	this.textNode;

	this.render = function() {
    	this.element = document.createElement(this.type);
    	this.textNode = document.createTextNode(this.text);
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
}