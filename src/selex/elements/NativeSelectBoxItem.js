SELEX.ELEMENTS.NativeSelectBoxItem = function(value, text) {
	this.element;
	this.type = "option";
	this.value = value;
	this.text = text;

	this.render = function() {
		this.element = document.createElement("option");
		this.element.innerHTML = this.text
		this.element.setAttribute("value", this.value);
		return this.element;
	}
}