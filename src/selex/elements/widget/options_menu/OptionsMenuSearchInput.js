SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(optionsMenu) {
	this.type = "input";
	this.className = "options-menu-search-input";
	this.element;
	this.optionsMenu = optionsMenu;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.element.setAttribute("type", "search");
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.addEventListener("click", onKeyUp.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
	}

	function onKeyUp(e) {
		var value = this.element.value;
		if (value.length === 0)
			this.optionsMenu.getOptionsMenuList().clearSearchResult();
		if (this.value !== undefined) {
			if (value.length === this.value.length)
				return;
		}
		this.value = value;
		this.optionsMenu.getOptionsMenuList().searchByInputString(value);
	}
};