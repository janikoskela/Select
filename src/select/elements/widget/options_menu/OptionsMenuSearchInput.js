SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "input";
	this.className = "options-menu-search-input";
	this.tabIndex = -1;
	this.element;
	this.allowClose = true;
	this.placeholder = userDefinedSettings.searchInputPlaceholder || "";

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.element.setAttribute("type", "text");
    	this.element.setAttribute("tabindex", this.tabIndex);
    	this.element.setAttribute("placeholder", this.placeholder);
    	this.element.addEventListener("blur", this.focusOut);
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
		this.value = undefined;
	}

	this.focusOut = function(e) {
		if (this.allowClose) {
			Facade.publish("OptionsMenu:hide");
			Facade.publish("WidgetWrapper:blur");
		}
	}

	function onKeyUp(e) {
		e.preventDefault();
		e.stopPropagation();
        switch(e.keyCode) {
        	case KEY_CODES.DOWN:
        		this.allowClose = false;
        		Facade.publish("OptionsMenuList").hoverFirstOption();
        		this.blur();
        		break;
        	default:
        		this.allowClose = true;
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

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);