SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(Facade) {
	var that = this;
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-container";
	this.element;
	this.width = userDefinedSettings.optionsMenuWidth;
	this.height = undefined;
	this.locked = false;
	this.useSearchInput = userDefinedSettings.useSearchInput || false;

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuList = Facade.subscribe("OptionsMenuList", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(Facade));
    	var optionsMenuListElem = optionsMenuList.render();
        if (this.useSearchInput === true) {
        	renderOptionsMenuSearchWrapper();
        }
    	this.element.appendChild(optionsMenuListElem);
    	if (this.width !== undefined)
			this.setWidth(this.width);
    	return this.element;
	}

	function renderOptionsMenuSearchWrapper() {
    	that.optionsMenuSearchWrapper = Facade.subscribe("OptionsMenuSearchWrapper", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper(Facade));
    	var optionsMenuSearchWrapperElem = that.optionsMenuSearchWrapper.render();
		that.element.appendFirst(optionsMenuSearchWrapperElem);
	}

	this.onNoOptionsFound = function() {
		Facade.publish("OptionsMenuList:hide");
		Facade.publish("OptionsMenuSearchNoResults:show");
	}

	this.onOptionsFound = function() {
		Facade.publish("OptionsMenuList:show");
		Facade.publish("OptionsMenuSearchNoResults:hide");
	}

	this.isLocked = function() {
		return this.locked;
	}

	this.unLock = function() {
		this.locked = false;
	}

	this.lock = function() {
		this.hide();
		this.locked = true;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.getWidth = function() {
		var width = this.element.offsetWidth;
		if (this.element.isHidden()) {
			this.element.show();
			width = this.element.offsetWidth;
			this.element.hide();
		}
		width += Facade.publish("ArrowContainer").getWidth();
		this.setWidth(width);
		return width;
	}

	this.setHeight = function(height) {
		this.height = height;
		this.element.setStyle("height", this.height);
	}

	this.hide = function() {
		if (this.element.isHidden())
			return;
		this.element.hide();
		Facade.publish("OptionsMenuSearchInput:clear");
		Facade.publish("OptionsMenuSearchInput:blur");
		Facade.publish("OptionsMenuList:refresh");
		Facade.publish("OptionsMenuSearchNoResults:hide");
		Facade.publish("ArrowContainerContent").down();
	}

	this.show = function() {
		if (this.locked === true || this.isHidden() === false)
			return;
		this.element.show();
		this.element.removeClass("options-container-down");
		this.element.removeClass("options-container-up");
		var top = this.element.getStyle("top") || 0;
		this.element.removeStyle("top");
		var h = this.element.offsetHeight;
		var windowInnerHeight = window.innerHeight;
		var remainingWindowHeight = windowInnerHeight - this.element.getBoundingClientRect().top;
		this.element.hide();
		var widgetWrapper = Facade.publish("WidgetWrapper");
		if (remainingWindowHeight < h && widgetWrapper.getElement().getBoundingClientRect().top > h) {
			this.element.addClass("options-container-up");
			this.element.setStyle("top", h * -1);
		}
		else {
			this.element.addClass("options-container-down");
		}
		this.element.show();
		Facade.publish("ArrowContainerContent").up();
		if (this.useSearchInput === true)
			Facade.publish("OptionsMenuSearchInput:focus");
	}

	this.toggle = function() {
		if (this.element.isHidden())
			this.show();
		else
			this.hide();
	}

	this.toggleInputSearch = function() {
        if (this.useSearchInput === true) {
        	this.useSearchInput = false;
        	Facade.publish("OptionsMenuSearchWrapper:hide");
        }
        else {
        	if (this.optionsMenuSearchWrapper !== undefined)
        		Facade.publish("OptionsMenuSearchWrapper:show");
        	else {
        		renderOptionsMenuSearchWrapper();
        	}
        	this.useSearchInput = true;
        }
    }
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);