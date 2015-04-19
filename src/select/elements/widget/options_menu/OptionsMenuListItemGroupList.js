SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList = function(Sandbox) {
	this.type = "ul";
	this.className = "options-menu-list-item-group-list";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);