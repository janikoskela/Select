SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(value, text, index, optionsMenuList, onClickCallback, optionsMenu, selected) {
	var that = this;
	this.value = value;
	this.text = text;
	this.type = "li";
	this.element;
	this.itemValue;
	this.index = index;
	this.optionsMenu = optionsMenu;
	this.optionsMenuList = optionsMenuList;
	this.onClickCallback = onClickCallback;
	this.selected = selected;

	this.render = function() {
		this.itemValue = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(this.text);
		var childElem = this.itemValue.render();
    	this.element = SELEX.UTILS.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.addEventListener("mouseover", onMouseOver.bind(this));
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.appendChild(childElem);
    	this.element.setAttribute("data-index", this.index);
    	if (selected === true)
    		this.setSelected();
    	return this.element;
	}

	this.getTextByElement = function(element) {

	}

	this.getValue = function() {
		return this.value;
	}

	this.getElement = function() {
		return this.element;
	}

	this.getText = function() {
		return this.text;
	}

	this.isHovered = function() {
		return (this.element.hasClass("hovered"));
	}

	this.isSelected = function() {
		return (this.element.hasClass("selected"));
	}

	this.setHovered = function() {
		this.element.addClass("hovered");
	}

	this.setSelected = function() {
		this.element.addClass("selected");
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

	this.onClick = function() {
		onClick();
	}

	function changeOption() {
		var previosulySelected = that.optionsMenuList.getSelectedOption();
		var valueContainerText = that.optionsMenu.getWidgetWrapper().getWidgetSubWrapper().getValueContainer().getValueContainerText();
		var nativeSelect = that.optionsMenu.getWidgetWrapper().getWrapper().getNativeSelect();
		nativeSelect.setSelectedOption(that.value);
		previosulySelected.getElement().removeClass("selected");
		that.setSelected();
		valueContainerText.setText(that.text);
		valueContainerText.setValue(that.value);
		if (typeof that.onClickCallback === "function")
			that.onClickCallback(that.value, that.text);
	}

	function onClick(e) {
		that.optionsMenu.hide();
		var previosulySelected = that.optionsMenuList.getSelectedOption();
		if (previosulySelected !== undefined) {
			if (previosulySelected.getIndex() !== that.getIndex())
				changeOption();
		}
		else
			changeOption();
	}
};