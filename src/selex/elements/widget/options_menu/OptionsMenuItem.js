SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(nativeSelectOption, optionsMenuList, index) {
	var that = this;
	this.nativeSelectOption = nativeSelectOption;
	this.selected = nativeSelectOption.isSelected();
	this.type = "li";
	this.element;
	this.itemValue;
	this.optionsMenuList = optionsMenuList;
	this.index = index;
	this.valueContainerText = this.optionsMenuList.getOptionsMenu().getWidgetWrapper().getWidgetSubWrapper().getValueContainer().getValueContainerText();

	this.render = function() {
		this.itemValue = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(nativeSelectOption);
		var childElem = this.itemValue.render();
    	this.element = SELEX.UTILS.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.addEventListener("mouseover", onMouseOver.bind(this));
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.setDataAttribute("value", nativeSelectOption.getValue());
    	this.element.setDataAttribute("index", this.index);
    	this.element.appendChild(childElem);
    	if (this.selected === true)
    		this.setSelected();
    	return this.element;
	}

	this.getTextByElement = function(element) {

	}

	this.getValue = function() {
		return this.nativeSelectOption.getValue();
	}

	this.getElement = function() {
		return this.element;
	}

	this.getText = function() {
		return this.nativeSelectOption.getText();
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
		this.optionsMenuList.clearSelected();
		this.element.addClass("selected");
	}

	this.removeSelected = function() {
		this.element.removeClass("selected");
	}

	function onKeyUp(e) {
		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				onClick(e);
				break;
		}
	}

	this.getIndex = function() {
		return parseInt(this.element.getDataAttribute("index"));
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

	function setSelected(e) {
		that.nativeSelectOption.setSelected(e);
		that.setSelected();
		that.valueContainerText.setText(that.nativeSelectOption.getText());
	}

	function onClick(e) {
		that.optionsMenuList.getOptionsMenu().hide();
		var prevSelected = that.optionsMenuList.getSelectedOption();
		if (prevSelected === undefined)
			setSelected(e);
		else if (prevSelected.getValue() !== that.getValue())
			setSelected(e);
	}
};