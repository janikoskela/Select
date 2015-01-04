SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(Facade) {
	this.type = "input";
	this.className = "options-menu-search-input";
	this.element;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.element.setAttribute("type", "search");
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.addEventListener("click", onKeyUp.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
		Facade.publish("OptionsMenuList").searchByInputString("");
	}

	this.focus = function() {
		this.element.focus();
	}

	function onKeyUp(e) {
		var optionsMenuList = Facade.publish("OptionsMenuList");
		var value = this.element.value;
		if (this.value !== undefined) {
			if (value.length === this.value.length)
				return;
		}
		this.value = value;
		optionsMenuList.searchByInputString(value);
	}
};