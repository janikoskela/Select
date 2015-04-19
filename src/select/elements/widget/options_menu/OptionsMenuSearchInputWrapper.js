SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInputWrapper = function(Sandbox) {
	this.type = "div";
	this.className = "options-menu-search-input-wrapper";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuSearchInput = Sandbox.subscribe("OptionsMenuSearchInput", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput(Sandbox));
    	var optionsMenuSearchInputElem = optionsMenuSearchInput.render();
    	this.element.appendChild(optionsMenuSearchInputElem);
    	return this.element;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInputWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);