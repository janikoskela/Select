SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(value, text, onMenuItemClick) {
	this.value = value;
	this.text = text;
	this.onMenuItemClick = onMenuItemClick;
	this.type = "li";
	this.element;
	this.child;

	this.render = function() {
		this.child = new SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenuItemValue(this.text);
		var childElem = this.child.render();
    	this.element = document.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.setAttribute("value", this.value);
    	this.element.appendChild(childElem);
    	return this.element;
	}

	function onClick(e) {
		if (typeof this.onMenuItemClick === "function")
			this.onMenuItemClick(this.value, this.text);
		this.element.setClass("selected", true);
	}
}