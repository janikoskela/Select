SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(params, widgetWrapper) {
	var that = this;
	this.type = "div";
	this.className = "options-container";
	this.element;
	this.width = params.optionsMenuWidth || "100%";
	this.height = undefined;
	this.widgetWrapper = widgetWrapper;
	this.optionsMenuList;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.optionsMenuList = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(params, widgetWrapper, this);
    	var optionsMenuListElem = this.optionsMenuList.render();
    	this.element.appendChild(optionsMenuListElem);
    	this.setWidth(this.width);
    	return this.element;
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
	}

	this.isHidden = function() {
		return this.element.isHidden();
	}

	this.show = function() {
		this.element.show();
	}

	this.toggle = function() {
		if (this.element.isHidden())
			this.show();
		else
			this.hide();
	}
};