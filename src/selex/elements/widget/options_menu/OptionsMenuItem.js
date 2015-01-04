SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(Facade, nativeSelectOption, index) {
	var that = this;
	this.nativeSelectOption = nativeSelectOption;
	this.selected = nativeSelectOption.isSelected();
	this.type = "li";
	this.element;
	this.itemValue;
	this.index = index;

	this.render = function() {
		this.itemValue = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(Facade, nativeSelectOption);
		var childElem = this.itemValue.render();
    	this.element = SELEX.UTILS.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.addEventListener("mouseover", onMouseOver.bind(this));
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.setDataAttribute("value", nativeSelectOption.getValue());
    	this.element.setDataAttribute("index", this.index);

		var imageUrl = this.nativeSelectOption.getImageUrl();
		if (imageUrl !== undefined && imageUrl !== null) {
			this.itemImage = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage(Facade, imageUrl);
			var elem = this.itemImage.render();
			this.element.appendChild(elem);
		}

    	this.element.appendChild(childElem);
    	if (this.selected === true)
    		this.setSelected();
    	return this.element;
	}

	this.getValue = function() {
		return this.nativeSelectOption.getValue();
	}

	this.getWidth = function() {
		return this.element.offsetWidth;
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
		Facade.publish("OptionsMenuList").clearSelected();
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
		Facade.publish("ValueContainer").refresh();
	}

	function onClick(e) {
		Facade.publish("OptionsMenu").hide();
		var optionsMenuList = Facade.publish("OptionsMenuList");
		var prevSelected = optionsMenuList.getSelectedOption();
		if (prevSelected === undefined)
			setSelected(e);
		else if (prevSelected.getValue() !== that.getValue())
			setSelected(e);
		if (optionsMenuList.isInputSearchEnabled()) {
			Facade.publish("OptionsMenuSearchInput").clear();
			Facade.publish("OptionsMenuSearchNoResults").hide();
			optionsMenuList.refresh();
		}
	}
};