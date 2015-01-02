SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper = function(optionsMenu) {
	this.type = "div";
	this.className = "options-menu-search-wrapper";
	this.element;
	this.optionsMenu = optionsMenu;
	this.optionsMenuSearchInput;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.optionsMenuSearchInput = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput(this.optionsMenu);
    	var optionsMenuSearchInputElem = this.optionsMenuSearchInput.render();
    	this.element.appendChild(optionsMenuSearchInputElem);
    	return this.element;
	}

	this.clear = function() {
		this.optionsMenuSearchInput.clear();
	}

};