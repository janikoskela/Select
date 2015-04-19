SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(Sandbox, nativeSelectOption, index) {
	var that = this;
	this.nativeSelectOption = nativeSelectOption;
	this.selected = nativeSelectOption.isSelected();
	this.type = "li";
	this.element;
	this.itemValue;
	this.className = "options-container-list-item";
	this.index = index;

	this.render = function() {
		this.itemValue = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(Sandbox, nativeSelectOption);
		var childElem = this.itemValue.render();
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.addEventListener("mouseover", onMouseOver.bind(this));
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.setDataAttribute("value", nativeSelectOption.getValue());
    	this.element.setDataAttribute("index", this.index);

		var imageUrl = this.nativeSelectOption.getImageUrl();
		if (!SELECT.UTILS.isEmpty(imageUrl)) {
			this.itemImage = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage(Sandbox, imageUrl);
			var elem = this.itemImage.render();
			this.element.appendChild(elem);
		}

    	this.element.appendChild(childElem);

		var description = this.nativeSelectOption.getDescription();
		if (!SELECT.UTILS.isEmpty(description)) {
			this.optionsMenuItemDescription = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription(Sandbox, description);
			var optionsMenuItemDescriptionElem = this.optionsMenuItemDescription.render();
			this.element.appendChild(optionsMenuItemDescriptionElem);
		}
    	if (this.selected === true)
    		this.setInitialSelected();
    	return this.element;
	}

	this.getNativeSelectOption = function() {
		return this.nativeSelectOption;
	}

	this.getValue = function() {
		return this.nativeSelectOption.getValue();
	}

	this.getWidth = function() {
		return this.element.offsetWidth;
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

	this.setInitialSelected = function() {
		Sandbox.publish("OptionsMenuList:clearSelected");
		this.element.addClass("selected");
		Sandbox.publish("ValueContainer:refresh");
	}

	this.setSelected = function() {
		Sandbox.publish("OptionsMenuList:clearSelected");
		this.nativeSelectOption.setSelected();
		this.element.addClass("selected");
		Sandbox.publish("ValueContainer:refresh");
	}

	this.getNextSibling = function() {
		return this.element.getNextSibling();
	}

	this.removeSelected = function() {
		this.element.removeClass("selected");
	}

	this.getOptionGroup = function() {
		return this.element.parentNode.parentNode;
	}

	this.getParentElement = function() {
		return this.element.parentNode;
	}

	this.removeHovered = function() {
		this.element.removeClass("hovered");
	}

	function onKeyUp(e) {
		switch (e.keyCode) {
			case KEY_CODES.ENTER:
				//this.setSelected();
				//Sandbox.publish("OptionsMenu:hide");
				break;
		}
	}

	this.getIndex = function() {
		return parseInt(this.element.getDataAttribute("index"));
	}

	function onMouseOver(e) {
		Sandbox.publish("OptionsMenuList:clearOptionItemHovers");
		this.element.addClass("hovered");
	}

	function onClick(e) {
		var optionsMenuList = Sandbox.publish("OptionsMenuList");
		var prevSelected = optionsMenuList.getSelectedOption();
		if (prevSelected === undefined) {
			this.setSelected();
		}
		else if (prevSelected.getIndex() !== this.getIndex()) {
			this.setSelected();
		}
		Sandbox.publish("OptionsMenu:hide");
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);