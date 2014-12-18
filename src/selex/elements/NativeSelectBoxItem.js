SELEX.ELEMENTS.NativeSelectBoxItem = function(value, text) {
	this.element;
	this.type = "option";
	this.value = value;
	this.text = text;

	this.render = function() {
		this.element = document.createElement("option");
		if (this.text !== undefined)
			this.element.innerHTML = this.text;
		if (this.value !== undefined)
			this.element.setAttribute("data-value", this.value);
		return this.element;
	}

	this.createFromExistingOption = function(option) {
		this.element = option;
		console.log(option.id)
		this.value = this.element.value;
		this.text = this.element.text;
		this.selected = (this.element.getAttribute("selected") === null) ? false : true;
		return this;
	}

	this.getValue = function() {
		return this.value;
	}

	this.setSelected = function() {
		this.element.setAttribute("selected", "selected");
	}

	this.removeSelected = function() {
		this.element.removeAttribute("selected");
	}
};