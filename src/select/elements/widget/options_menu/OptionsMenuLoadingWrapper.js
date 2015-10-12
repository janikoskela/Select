SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuLoadingWrapper = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-loading-wrapper";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.hide();
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuLoadingWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);