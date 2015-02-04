SELEX.ELEMENTS.Element = function() {};

SELEX.ELEMENTS.Element.prototype.hide = function() {
	this.element.hide();
};

SELEX.ELEMENTS.Element.prototype.show = function() {
	this.element.show();
};

SELEX.ELEMENTS.Element.prototype.getElement = function() {
	return this.element;
};

SELEX.ELEMENTS.Element.prototype.focus = function() {
	return this.element.focus();
};

SELEX.ELEMENTS.Element.prototype.blur = function() {
	return this.element.blur();
};

SELEX.ELEMENTS.Element.prototype.getClass = function() {
	return this.element.className();
};

SELEX.ELEMENTS.Element.prototype.getWidth = function() {
	return this.element.offsetWidth;
};

SELEX.ELEMENTS.Element.prototype.isHidden = function() {
	return this.element.isHidden();
};

SELEX.ELEMENTS.Element.prototype.disable = function() {
	this.element.setAttribute("disabled", true);
};

SELEX.ELEMENTS.Element.prototype.enable = function() {
	this.element.removeAttribute("disabled");
};

SELEX.ELEMENTS.Element.prototype.isDisabled = function() {
	return (this.element.getAttribute("disabled") === null) ? false : true;
};

SELEX.ELEMENTS.Element.prototype.getTabIndex = function() {
	return this.element.getAttribute("tabindex");
};

SELEX.ELEMENTS.Element.prototype.setSelectedIndex = function(index) {
	this.element.selectedIndex = index;
};

SELEX.ELEMENTS.Element.prototype.empty = function() {
	this.element.removeChildren();
};

SELEX.ELEMENTS.Element.prototype.hasChildren = function() {
	return (this.element.getChildren().length > 0);
};

SELEX.ELEMENTS.Element.prototype.disableTabNavigation = function() {
    this.element.setAttribute("tabindex", "-1");
};