SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem = function(Sandbox, optionElement) {
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
		Sandbox.publish("NativeSelectBox").setSelectedIndex(this.element.index);
		Sandbox.publish("NativeSelectBox").setValue(this.getValue());
		Sandbox.publish("NativeSelectBox").triggerChange();
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
		if (!SELECT.UTILS.isElement(parentNode))
			return;
		var tagName = parentNode.tagName;
		if (tagName !== null && tagName !== undefined) {
			if (tagName.toLowerCase() === "optgroup")
				return parentNode;
		}
	}
};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);