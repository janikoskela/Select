SELEX.ELEMENTS.NativeSelectBox = function(changeCallback) {

	var self = this;
	this.type = "select";
	this.width = "100%";
	this.changeCallback = changeCallback;
	this.element = undefined;
	this.tabIndex = 0;
	this.fontSize = undefined;

	this.setFontSize = function(fontSize) {
		this.fontSize = fontSize;
		this.element.setStyle("font-size", this.fontSize);
	}

	this.render = function() {
		this.element = document.createElement(this.type);
		this.element.onchange = this.onOptionChange;
		return this.element;
	}

	this.setTabIndex = function(tabIndex) {
		this.tabIndex = tabIndex;
		this.element.setAttribute("tabindex", this.tabIndex);
	}

	this.onOptionChange = function(e) {
		var value = e.target.selectedOptions[0].value;
		var text = e.target.selectedOptions[0].text;
		if (typeof self.changeCallback === "function") {
			self.changeCallback(value, text);
		}
	}

	this.setOption = function(value) {
		this.element.value = value;
	}

	this.getElement = function() {
		return this.element;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.show();
	}

}