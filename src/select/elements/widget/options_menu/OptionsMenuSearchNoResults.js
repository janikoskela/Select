SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-no-results";
	this.element;
	this.text = userDefinedSettings.noResultsMessage || "No results";

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	this.hide();
    	return this.element;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);