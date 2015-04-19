SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper = function(Sandbox) {

	this.type = "div";
	this.element;
	this.className = "native-select-wrapper";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type);
		this.element.setClass(this.className);
		this.element.hide();
		return this.element;
	}
};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);