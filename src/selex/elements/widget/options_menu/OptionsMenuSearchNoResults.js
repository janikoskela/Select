SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-no-results";
	this.element;
	this.text = userDefinedSettings.noResultsMessage || "No results";

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	this.hide();
    	return this.element;
	}

	this.show = function() {
		this.element.show();
	}

	this.hide = function() {
		this.element.hide();
	}

};