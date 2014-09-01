SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(value, text, onMenuItemClick, index) {
	this.value = value;
	this.text = text;
	this.onMenuItemClick = onMenuItemClick;
	this.type = "li";
	this.element;
	this.child;
	this.index = index;

	this.render = function() {
		this.child = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(this.text);
		var childElem = this.child.render();
    	this.element = document.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.addEventListener("mouseover", onMouseOver.bind(this));
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.setAttribute("data-value", this.value);
    	this.element.appendChild(childElem);
    	this.element.setAttribute("data-index", this.index);
    	return this.element;
	}

	function onKeyUp(e) {
		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				onClick(e);
				break;
		}
	}

	this.getIndex = function() {
		return this.index;
	}

	function onMouseOver(e) {
		var siblings = this.element.parentNode.children;
		for (var i = 0; i < siblings.length; i++) {
			siblings[i].removeClass("hovered");
		}
		this.element.addClass("hovered");
	}

	function onClick(e) {
		if (typeof this.onMenuItemClick === "function")
			this.onMenuItemClick(this.element);
	}
};