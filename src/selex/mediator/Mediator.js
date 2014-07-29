SELEX.MEDIATOR.Mediator = function(settings) {

	this.settings = settings;
	this.selectedValue;
	this.selectedText;
	this.enabled = true;

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
		var displayNativeSelectBox = this.settings.isNativeSelectBoxToBeDisplayed();
		var renderNativeSelectBox = this.settings.isNativeSelectBoxToBeRendered();
		var onOptionChange = this.settings.getOnOptionChange();
		var tabIndex = this.settings.getTabIndex();
		var options = this.settings.getOptions();
		var defaultValue = this.settings.getDefaultValue();
		var optionLimit = this.settings.getOptionLimit();
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
		var placeholder = this.settings.getPlaceholder();

		rootElement.empty();

		wrapperElement = this.createWrapper(theme, fontSize, fontFamily);
		if (width !== undefined)
			this.wrapper.setWidth(width);
		rootElement.appendChild(wrapperElement);
		if (renderNativeSelectBox === true) {
			nativeSelectBoxElement = this.createNativeSelectBox();
			this.nativeSelectBox.setWidth(width);
			wrapperElement.appendChild(nativeSelectBoxElement);		
			if (defaultValue === undefined && placeholder !== undefined)
				this.nativeSelectBox.setPlaceholder(placeholder);
			else
				this.nativeSelectBox.setOption(defaultValue);
			this.createNativeOptionElements(options);
			this.nativeSelectBox.setFontSize(fontSize);
			if (displayNativeSelectBox === true) {
				this.nativeSelectBox.show();
				this.nativeSelectBox.setTabIndex(tabIndex);
			}
			else
				this.nativeSelectBox.hide();
		}

		if (renderNativeSelectBox === false || (displayNativeSelectBox === false && renderNativeSelectBox === true)) {

			customGuiWrapperElement = this.createCustomGuiWrapper();
			this.customGuiWrapper.setTabIndex(tabIndex);
			wrapperElement.appendChild(customGuiWrapperElement);


			customGuiSubWrapperElement = this.createCustomGuiSubWrapper();
			customGuiWrapperElement.appendChild(customGuiSubWrapperElement);

			if (defaultValue !== undefined) {
				defaultOption = this.getDefaultOption(options, defaultValue);
				this.selectedText = defaultOption.text;
				this.selectedValue = defaultOption.value;
			}					
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

			valueContainerTextElement = this.createValueContainerText();
			if (this.selectedText !== undefined)
				this.valueContainerText.setText(this.selectedText);
			if (this.selectedValue !== undefined)
				this.valueContainerText.setValue(this.selectedValue);
			if (defaultOption === undefined && placeholder !== undefined)
				this.valueContainerText.setPlaceholder(placeholder);

			valueContainerElement.appendChild(valueContainerTextElement);

			optionsMenuElement = this.createOptionsMenu(optionLimit);
			customGuiWrapperElement.appendChild(optionsMenuElement);
			this.createOptionElements(options);
			if (width === undefined) {
				width = this.getWidthBasedLongestOption();
				this.wrapper.setWidth(width);
			}
			this.optionsMenu.setWidth(width);
		}
	}

	this.disableWidget = function() {
		this.enabled = false;
		this.wrapper.disable();
	}	

	this.enableWidget = function() {
		this.enabled = true;
		this.wrapper.enable();
	}

	this.disableNative = function() {
		this.nativeSelectBox.disable();
	}

	this.enableNative = function() {
		this.nativeSelectBox.enable();
	}

	this.getSelectedValue = function() {
		return this.selectedValue;
	}

	this.getSelectedText = function() {
		return this.selectedText;
	}

	this.hide = function() {
		this.wrapper.hide();
	}

	this.show = function() {
		this.wrapper.show();
	}

	this.createCustomGuiSubWrapper = function() {
		var self = this;
		this.customGuiSubWrapper = new SELEX.ELEMENTS.CUSTOM_GUI.SubWrapper(function() {
			if (self.enabled === true) {
				self.optionsMenu.toggleVisibility();
				self.arrowContainerContent.toggleClass();
			}
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

	this.createOptionsMenu = function(optionLimit) {
		this.optionsMenu = new SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenu(optionLimit);
		return this.optionsMenu.render();
	}

	this.createNativeSelectBox = function() {
		this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(this.onNativeOptionItemClick.bind(this));
		return this.nativeSelectBox.render();
	}

	this.createValueContainerText = function() {
		this.valueContainerText = new SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainerText();
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
		optionsMenuElement.empty();
		for (var i = 0; i < options.length; i++) {
			var value = options[i].value;
			var text = options[i].text;
			var elem = new SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenuItem(value, text, this.onOptionItemClick.bind(this)).render();
			optionsMenuElement.appendChild(elem);
		}
	}

	this.onNativeOptionItemClick = function(value, text) {
		var onOptionChange = this.settings.getOnOptionChange();
		this.selectedValue = value;
		this.selectedText = text;
		if (typeof onOptionChange === "function")
			onOptionChange(this.selectedValue, this.selectedText);
	}

	this.onOptionItemClick = function(value, text) {
		var onOptionChange = this.settings.getOnOptionChange();
		this.valueContainerText.setValue(value);
		this.valueContainerText.setText(text);
		this.optionsMenu.close();
		this.arrowContainerContent.toggleClass();
		this.selectedValue = value;
		this.selectedText = text;
		if (typeof onOptionChange === "function")
			onOptionChange(this.selectedValue, this.selectedText);
	}

	this.createNativeOptionElements = function(options) {
		var nativeSelectBoxElement = this.nativeSelectBox.getElement();
		nativeSelectBoxElement.empty();
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