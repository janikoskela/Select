SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(Facade) {
	this.type = "input";
	this.className = "options-menu-search-input";
	this.tabIndex = -1;
	this.element;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.element.setAttribute("type", "text");
    	this.element.setAttribute("tabindex", this.tabIndex);
    	this.element.addEventListener("blur", this.focusOut);
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
		this.value = undefined;
	}

	this.focusOut = function() {
		Facade.publish("OptionsMenu:hide");
		Facade.publish("WidgetWrapper:blur");
	}

	function onKeyUp(e) {
		e.stopPropagation();
        switch(e.keyCode) {
        	case KEY_CODES.DOWN:
        		Facade.publish("OptionsMenuList").hoverFirstOption();
        		this.blur();
        		break;
        	default:
				var value = this.element.value;
				if (value.length === 0) {
					Facade.publish("OptionsMenuList:refresh");
					Facade.publish("OptionsMenuList:show");
					Facade.publish("OptionsMenuSearchNoResults:hide");
				}
				else
					Facade.publish("OptionsMenuList:searchByInputString", value);
        }
	}
};

SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput.prototype = Object.create(SELEX.ELEMENTS.Element.prototype);