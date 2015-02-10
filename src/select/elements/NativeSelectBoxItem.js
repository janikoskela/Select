SELECT.ELEMENTS.NativeSelectBoxItem = function(Facade, optionElement) {
	this.element = optionElement;
	this.type = "option";

	this.isSelected = function() {
		return (this.element.getAttribute("selected") === null) ? false : true;
	}

	this.getText = function() {
		return this.element.text;
	}

	this.getOptionGroupLabel = function() {
		return this.element.parentNode.label;
	}

	this.getValue = function() {
		return this.element.value;
	}

	this.setSelected = function() {
		Facade.publish("NativeSelectBox").setSelectedIndex(this.element.index);
		Facade.publish("NativeSelectBox").triggerChange();
		this.element.setSelectedAttribute();
	}

	this.removeSelected = function() {
		this.element.removeAttribute("selected", "selected");
	}

	this.getImageUrl = function() {
		return this.element.getDataAttribute("image-url");
	}

	this.getDescription = function() {
		return this.element.getDataAttribute("description");
	}

	this.getOptionGroup = function() {
		var parentNode = this.element.parentNode;
		var tagName = parentNode.tagName.toLowerCase();
		if (tagName === "optgroup")
			return parentNode;
	}
};

SELECT.ELEMENTS.NativeSelectBoxItem.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);