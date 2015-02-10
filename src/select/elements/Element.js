SELECT.ELEMENTS.Element = function() {};

SELECT.ELEMENTS.Element.prototype.hide = function() {
	this.element.hide();
};

SELECT.ELEMENTS.Element.prototype.show = function() {
	this.element.show();
};

SELECT.ELEMENTS.Element.prototype.getElement = function() {
	return this.element;
};

SELECT.ELEMENTS.Element.prototype.focus = function() {
	return this.element.focus();
};

SELECT.ELEMENTS.Element.prototype.blur = function() {
	return this.element.blur();
};

SELECT.ELEMENTS.Element.prototype.getClass = function() {
	return this.element.className();
};

SELECT.ELEMENTS.Element.prototype.getWidth = function() {
	return this.element.offsetWidth;
};

SELECT.ELEMENTS.Element.prototype.isHidden = function() {
	return this.element.isHidden();
};

SELECT.ELEMENTS.Element.prototype.disable = function() {
	this.element.setAttribute("disabled", true);
};

SELECT.ELEMENTS.Element.prototype.enable = function() {
	this.element.removeAttribute("disabled");
};

SELECT.ELEMENTS.Element.prototype.isDisabled = function() {
	return (this.element.getAttribute("disabled") === null) ? false : true;
};

SELECT.ELEMENTS.Element.prototype.getTabIndex = function() {
	return this.element.getAttribute("tabindex");
};

SELECT.ELEMENTS.Element.prototype.setSelectedIndex = function(index) {
	this.element.selectedIndex = index;
};

SELECT.ELEMENTS.Element.prototype.empty = function() {
	this.element.removeChildren();
};

SELECT.ELEMENTS.Element.prototype.hasChildren = function() {
	return (this.element.getChildren().length > 0);
};

SELECT.ELEMENTS.Element.prototype.disableTabNavigation = function() {
    this.element.setAttribute("tabindex", "-1");
};