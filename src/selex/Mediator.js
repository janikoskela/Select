SELEX.Mediator = function(settings) {

	this.settings = settings;
	this.selectedValue;
	this.selectedText;

	this.wrapper;
	this.nativeSelectBox;
	this.customGuiWrapper;
	this.customGuiSubWrapper;
	this.valueContainer;
	this.valueContainerText;
	this.arrow;
	this.optionsMenu;
	this.arrowContainer;
	this.arrowContainerContent;

	this.render = function() {
		var ORIENTATION_RIGHT = "right";
		var ORIENTATION_LEFT = "left";
		var self = this;
		var rootElement = this.settings.getRootElement();
		var width = this.settings.getWidth();
		var displayNativeSelectBox = this.settings.isNativeSelectEnabled();
		var onOptionChange = this.settings.getOnOptionChange();
		var tabIndex = this.settings.getTabIndex();
		var options = this.settings.getOptions();
		var defaultValue = this.settings.getDefaultValue();
		var wrapperElement;
		var customGuiWrapperElement;
		var customGuiSubWrapperElement;
		var arrowContainerElement;
		var valueContainerElement;
		var defaultOption;
		var valueContainerTextElement;
		var optionsMenuElement;
		var nativeSelectBoxElement;
		var theme = this.settings.getTheme();
		var fontSize = this.settings.getFontSize();
		var fontFamily = this.settings.getFontFamily();
		var orientation = this.settings.getOrientation();

		rootElement.empty();

		wrapperElement = this.createWrapper(theme, fontSize, fontFamily, tabIndex);
		if (width !== undefined)
			this.wrapper.setWidth(width);
		rootElement.appendChild(wrapperElement);

		if (displayNativeSelectBox === false) {

			customGuiWrapperElement = this.createCustomGuiWrapper();
			this.customGuiWrapper.setTabIndex(tabIndex);
			wrapperElement.appendChild(customGuiWrapperElement);


			customGuiSubWrapperElement = this.createCustomGuiSubWrapper();
			customGuiWrapperElement.appendChild(customGuiSubWrapperElement);

			defaultOption = this.getDefaultOption(options, defaultValue);
			this.selectedText = defaultOption.text;
			this.selectedValue = defaultOption.value;
			arrowContainerElement = this.createArrowElement();
			valueContainerElement = this.createValueContainer();

			switch (orientation) {
				case ORIENTATION_LEFT:
					customGuiSubWrapperElement.appendChild(arrowContainerElement);
					arrowContainerElement.setStyle("float", orientation);
					customGuiSubWrapperElement.appendChild(valueContainerElement);
					break;
				case ORIENTATION_RIGHT:
					customGuiSubWrapperElement.appendChild(valueContainerElement);
					customGuiSubWrapperElement.appendChild(arrowContainerElement);
					arrowContainerElement.setStyle("float", orientation);
					break;
				default:
					throw new Error("Invalid orientation value \"" + orientation + "\"");

			}

			valueContainerTextElement = this.createValueContainerText(defaultOption);
			valueContainerElement.appendChild(valueContainerTextElement);

			optionsMenuElement = this.createOptionsMenu();
			customGuiWrapperElement.appendChild(optionsMenuElement);
			this.createOptionElements(options);
			if (width === undefined) {
				width = this.getWidthBasedLongestOption();
				this.wrapper.setWidth(width);
			}
			this.optionsMenu.setWidth(width);
		}
		nativeSelectBoxElement = this.createNativeSelectBox();
		wrapperElement.appendChild(nativeSelectBoxElement);

		this.createNativeOptionElements(options);

		if (!this.displayNativeSelectBox)
			this.nativeSelectBox.hide();
	}

	this.createCustomGuiSubWrapper = function() {
		var self = this;
		this.customGuiSubWrapper = new SELEX.ELEMENTS.CUSTOM_GUI.SubWrapper(function() {
			self.optionsMenu.toggleVisibility();
			self.arrowContainerContent.toggleClass();
		});
		return this.customGuiSubWrapper.render();
	}

	this.createCustomGuiWrapper = function() {
		var self = this;
		this.customGuiWrapper = new SELEX.ELEMENTS.CUSTOM_GUI.Wrapper(function() {
			self.optionsMenu.close();
		});
		return this.customGuiWrapper.render();
	}

	this.createWrapper = function(theme, fontSize, fontFamily, tabIndex) {
		this.wrapper = new SELEX.ELEMENTS.Wrapper(theme, fontSize, fontFamily, tabIndex);
		return this.wrapper.render();
	}

	this.createOptionsMenu = function() {
		this.optionsMenu = new SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenu();
		return this.optionsMenu.render();
	}

	this.createNativeSelectBox = function() {
		this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox();
		return this.nativeSelectBox.render();
	}

	this.createValueContainerText = function(defaultOption) {
		this.valueContainerText = new SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainerText(defaultOption.value, defaultOption.text);
		return this.valueContainerText.render();
	}

	this.createValueContainer = function() {
		this.valueContainer = new SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainer();
		return this.valueContainer.render();
	}

	this.createArrowElement = function() {
		var arrowContainerElement;
		var arrowContainerContentElement;
		this.arrowContainer = new SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER.ArrowContainer();
		arrowContainerElement = this.arrowContainer.render();
		this.arrowContainerContent = new SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER.ArrowContainerContent();
		arrowContainerContentElement = this.arrowContainerContent.render();
		arrowContainerElement.appendChild(arrowContainerContentElement);
		return arrowContainerElement;
	}

	this.getWidthBasedLongestOption = function() {
		this.optionsMenu.open();
		var children = this.optionsMenu.getElement().children;
		var longest = children[0].offsetWidth;
		for (var i = 1; i < children.length; i++) {
			var l = children[i].offsetWidth;
			if (l > longest)
				longest = l;
		}
		this.optionsMenu.close();
		longest += this.arrowContainer.getElement().offsetWidth;
		return longest + "px";
	}


	this.createOptionElements = function(options) {
		var self = this;
		var optionsMenuElement = this.optionsMenu.getElement();
		var onOptionChange = this.settings.getOnOptionChange();
		var optionLimit = this.settings.getOptionLimit();
		for (var i = 0; i < options.length; i++) {
			if (i === optionLimit)
				return;
			var value = options[i].value;
			var text = options[i].text;
			var elem = new SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenuItem(value, text, function(value, text) {
				self.valueContainerText.setValue(value);
				self.valueContainerText.setText(text);
				self.optionsMenu.close();
				self.arrowContainerContent.toggleClass();
				self.selectedValue = value;
				self.selectedText = text;
				if (typeof onOptionChange === "function")
					onOptionChange(self.selectedValue, self.selectedText);
			}).render();
			optionsMenuElement.appendChild(elem);
		}
	}

	this.createNativeOptionElements = function(options) {
		var nativeSelectBoxElement = this.nativeSelectBox.getElement();
		for (var i = 0; i < options.length; i++) {
			var value = options[i].value;
			var text = options[i].text;
			var elem = new SELEX.ELEMENTS.NativeSelectBoxItem(value, text).render();
			nativeSelectBoxElement.appendChild(elem);
		}
	}

	this.getDefaultOption = function(options, defaultValue) {
		for (var i = 0; i < options.length; i++) {
			var option = options[i];
			var value = option.value;
			if (value == defaultValue)
				return option;
		}
		return options[0];
	}

}