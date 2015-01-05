SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup = function(Facade, optionGroup) {
	this.type = "li";
	this.className = "options-menu-list-item-group";
	this.element;
	this.optionGroup = optionGroup;
	this.list;
	this.title;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.title = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle(Facade, this.optionGroup.label);
    	var titleElem = this.title.render();
    	this.list = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList(Facade);
    	var listElem = this.list.render();
    	this.element.appendChild(titleElem);
    	this.element.appendChild(listElem);
    	return this.element;
	}

	this.empty = function() {
		this.element.removeChildren();
	}

	this.getList = function() {
		return this.list;
	}

	this.getElement = function() {
		return this.element;
	}
};