SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuWrapper = function(Sandbox) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-container-wrapper";
	this.useSearchInput = userDefinedSettings.useSearchInput || false;
	this.animationsEnabled = userDefinedSettings.animationsEnabled;
	this.element;

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuList = Sandbox.subscribe("OptionsMenuList", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(Sandbox));
    	var optionsMenuListElem = optionsMenuList.render();
    	if (this.animationsEnabled === true || this.animationsEnabled === undefined)
    		this.element.addEventListener("webkitTransitionEnd", onTransitionEnd.bind(this));
        if (this.useSearchInput === true) {
        	renderOptionsMenuSearchWrapper();
        }
    	this.element.appendChild(optionsMenuListElem);
    	if (this.width !== undefined)
			this.setWidth(this.width);
    	return this.element;
	}

	function onTransitionEnd(e) {
		var maxHeight = this.element.getStyle("maxHeight");
		if (maxHeight == "0px" || maxHeight == 0)
			Sandbox.publish("OptionsMenu:getElement").setDataAttribute("open", false);
		else
			Sandbox.publish("OptionsMenu:getElement").setDataAttribute("open", true);
		return false;
	}

	function renderOptionsMenuSearchWrapper() {
    	that.optionsMenuSearchWrapper = Sandbox.subscribe("OptionsMenuSearchWrapper", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper(Sandbox));
    	var optionsMenuSearchWrapperElem = that.optionsMenuSearchWrapper.render();
		that.element.appendFirst(optionsMenuSearchWrapperElem);
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);