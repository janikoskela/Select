SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(userDefinedSettings, widgetWrapper) {
	var that = this;
	this.type = "div";
	this.className = "options-container";
	this.element;
	this.width = userDefinedSettings.optionsMenuWidth;
	this.arrowContainerContent = widgetWrapper.getWidgetSubWrapper().getArrowContainer().getArrowContainerContent();
	this.height = undefined;
	this.widgetWrapper = widgetWrapper;
	this.optionsMenuList;
	this.locked = false;
	this.optionsMenuSearchWrapper;
	this.useSearchInput = userDefinedSettings.useSearchInput;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.optionsMenuList = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(userDefinedSettings, this);
    	var optionsMenuListElem = this.optionsMenuList.render();
        if (this.useSearchInput === true) {
        	this.optionsMenuSearchWrapper = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper(userDefinedSettings, this);
        	var optionsMenuSearchWrapperElem = this.optionsMenuSearchWrapper.render();
    		this.element.appendChild(optionsMenuSearchWrapperElem);
        }
    	this.element.appendChild(optionsMenuListElem);
    	if (this.width !== undefined)
			this.setWidth(this.width);
    	return this.element;
	}

	this.getOptionsMenuSearchWrapper = function() {
		return this.optionsMenuSearchWrapper;
	}

	this.onNoOptionsFound = function() {
		this.optionsMenuList.getElement().hide();
		this.optionsMenuSearchWrapper.getOptionsMenuSearchNoResults().show();
	}

	this.onOptionsFound = function() {
		this.optionsMenuList.getElement().show();
		this.optionsMenuSearchWrapper.getOptionsMenuSearchNoResults().hide();
	}

	this.isLocked = function() {
		return this.locked;
	}

	this.disableLoadingMode = function() {
		this.locked = false;
	}

	this.enableLoadingMode = function() {
		this.hide();
		this.locked = true;
	}

	this.getOptionsMenuList = function() {
		return this.optionsMenuList;
	}

	this.getWidgetWrapper = function() {
		return this.widgetWrapper;
	}

	this.getElement = function() {
		return this.element;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.setHeight = function(height) {
		this.height = height;
		this.element.setStyle("height", this.height);
	}

	this.hide = function() {
		this.element.hide();
		this.arrowContainerContent.down();
	}

	this.isHidden = function() {
		return this.element.isHidden();
	}

	this.show = function() {
		if (this.locked === true)
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
		if (remainingWindowHeight < h && widgetWrapper.getElement().getBoundingClientRect().top > h) {
			this.element.addClass("options-container-up");
			this.element.setStyle("top", h * -1);
		}
		else {
			this.element.addClass("options-container-down");
		}
		this.element.show();
		this.arrowContainerContent.up();
		if (this.useSearchInput === true)
			this.optionsMenuSearchWrapper.getOptionsMenuSearchInput().focus();
	}

	this.toggle = function() {
		if (this.element.isHidden())
			this.show();
		else
			this.hide();
	}
};