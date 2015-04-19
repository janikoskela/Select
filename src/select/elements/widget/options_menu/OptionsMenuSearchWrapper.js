SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-wrapper";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuSearchInputWrapper = Sandbox.subscribe("OptionsMenuSearchInputWrapper", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInputWrapper(Sandbox));
    	var optionsMenuSearchInputWrapperElem = optionsMenuSearchInputWrapper.render();
    	this.element.appendChild(optionsMenuSearchInputWrapperElem);
    	
    	var optionsMenuSearchNoResults = Sandbox.subscribe("OptionsMenuSearchNoResults", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults(Sandbox));
    	this.element.appendChild(optionsMenuSearchNoResults.render());
    	return this.element;
	}

	this.getHeight = function() {
		return this.element.offsetHeight;
	}

	this.setWidth = function(width) {
		this.element.setStyle("width", width);
		this.width = width;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);