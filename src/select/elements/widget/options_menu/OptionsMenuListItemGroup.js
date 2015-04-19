SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup = function(Sandbox, optionGroup) {
	this.type = "li";
	this.className = "options-menu-list-item-group";
	this.element;
	this.optionGroup = optionGroup;
	this.list;
	this.title;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.title = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle(Sandbox, this.optionGroup.label);
    	var titleElem = this.title.render();
    	this.list = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList(Sandbox);
    	var listElem = this.list.render();
    	this.element.appendChild(titleElem);
    	this.element.appendChild(listElem);
    	return this.element;
	}
	
	this.getList = function() {
		return this.list;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);