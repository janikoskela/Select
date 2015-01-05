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
		Facade.publish("OptionsMenuList:searchByInputString", "");
	}

	this.focus = function() {
		this.element.focus();
	}

	this.blur = function() {
		this.element.blur();
	}

	function onKeyUp(e) {
		e.stopPropagation();
		var value = this.element.value;
		if (value.length === 0)
			this.clear();
		if (this.value !== undefined) {
			if (value.length === this.value.length)
				return;
		}
		this.value = value;
		Facade.publish("OptionsMenuList:searchByInputString", value);
	}
};