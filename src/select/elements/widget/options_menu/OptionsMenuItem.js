SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(Sandbox, nativeSelectOption, index) {
	var that = this;
	this.nativeSelectOption = nativeSelectOption;
	this.selected = nativeSelectOption.isSelected();
	this.type = "li";
	this.element;
	this.itemValue;
	this.className = "options-container-list-item";
	this.index = index;
	this.allowSelectedOptionToTriggerChange = Sandbox.publish("UserDefinedSettings").allowSelectedOptionToTriggerChange || false;

	this.render = function() {
		this.itemValue = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(Sandbox, nativeSelectOption);
		var childElem = this.itemValue.render();
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.attachOnClickEventListener(onClick.bind(this));
    	this.attachOnMouseOverEventListener(onMouseOver.bind(this));
    	this.attachOnKeyUpEventListener(onKeyUp.bind(this));
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
    	else
    		this.removeSelected();
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
		return this.element.getDataAttribute("selected");
	}

	this.setHovered = function() {
		this.element.addClass("hovered");
	}

	this.setInitialSelected = function() {
		Sandbox.publish("OptionsMenuList:clearSelected");
		this.element.setDataAttribute("selected", true);
		Sandbox.publish("ValueContainer:refresh");
	}

	this.setSelected = function() {
		Sandbox.publish("OptionsMenuList:clearSelected");
		this.nativeSelectOption.setSelected();
		this.element.setDataAttribute("selected", true);
		Sandbox.publish("ValueContainer:refresh");
	}

	this.getNextSibling = function() {
		return this.element.getNextSibling();
	}

	this.getPreviousSibling = function() {
		return this.element.getPreviousSibling();
	}

	this.removeSelected = function() {
		this.element.setDataAttribute("selected", false);
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
		e.preventDefault();
		e.stopPropagation();
		if (Sandbox.publish("NativeSelectBox:getSelectedOptionValue") != this.getValue() || this.allowSelectedOptionToTriggerChange)
			this.setSelected();
		Sandbox.publish("OptionsMenu:hide");
		return false;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);