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
			this.element.setAttribute("value", this.value);
		return this.element;
	}

	this.setValue = function(value) {
		this.value = value;
		this.element.setAttribute("value", this.value);
	}

	this.setText = function(text) {
		this.text = text;
		console.log(this)
		this.element.innerHTML = this.text;
	}
}