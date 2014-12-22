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

	this.getValue = function() {
		return this.element.value;
	}

	this.setSelected = function(e) {
		this.nativeSelect.setSelectedIndex(this.element.index);
		this.nativeSelect.triggerChange();
	}

	this.removeSelected = function() {
		this.element.removeAttribute("selected");
	}
};