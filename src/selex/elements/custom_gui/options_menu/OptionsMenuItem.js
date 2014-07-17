SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenuItem = function(value, text, onMenuItemClick) {
	this.value = value;
	this.text = text;
	this.onMenuItemClick = onMenuItemClick;
	this.type = "li";
	this.element;
	this.textNode;

	this.render = function() {
    	this.element = document.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.setAttribute("value", this.value);
    	this.textNode = document.createTextNode(this.text);
    	this.element.appendChild(this.textNode);
    	return this.element;
	}

	function onClick(e) {
		if (typeof this.onMenuItemClick === "function")
			this.onMenuItemClick(this.value, this.text);
	}
}