SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
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
    	this.element.addEventListener("click", onClick.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
		this.value = undefined;
	}

	this.focusOut = function(e) {
		if (this.allowClose) {
			Sandbox.publish("OptionsMenu:hide");
			Sandbox.publish("WidgetWrapper:blur");
		}
	}

	function onClick(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	function onKeyUp(e) {
		e.preventDefault();
		e.stopPropagation();
        switch(e.keyCode) {
        	case KEY_CODES.DOWN:
        		this.allowClose = false;
        		Sandbox.publish("OptionsMenuList").hoverFirstOption();
        		this.blur();
        		break;
        	default:
        		this.allowClose = true;
				var value = this.element.value;
				if (value.length === 0) {
					Sandbox.publish("OptionsMenuList:refresh");
					Sandbox.publish("OptionsMenuList:show");
					Sandbox.publish("OptionsMenuSearchNoResults:hide");
				}
				else
					Sandbox.publish("OptionsMenuList:searchByInputString", value);
        }
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);