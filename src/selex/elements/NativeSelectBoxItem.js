SELEX.ELEMENTS.NativeSelectBoxItem = function(nativeSelect, optionElement) {
	this.element = optionElement;
	this.nativeSelect = nativeSelect;
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

	this.setSelected = function(e) {
		this.nativeSelect.setSelectedIndex(this.element.index);
		this.nativeSelect.triggerChange();
		this.element.setSelected();
	}

	this.removeSelected = function() {
		this.element.removeAttribute("selected", "selected");
	}

	this.getImageUrl = function() {
		return this.element.getDataAttribute("image-url");
	}
};