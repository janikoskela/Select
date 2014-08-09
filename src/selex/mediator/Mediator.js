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
		var sortType = this.settings.getSort();

		if (sortType !== undefined) {
			switch(sortType) {
				case SORT_TYPES.DESC:
					options.sort(sortByDesc);
					break;
				case SORT_TYPES.ASC:
					options.sort(sortByAsc);
					break;
				default:
					throw Error("Unsupported sort type \"" + sortType + "\"");
			}		
		}

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

			arrowContainerElement = this.createArrowElement();
			valueContainerElement = this.createValueContainer();
			valueContainerTextElement = this.createValueContainerText();

			if (placeholder === undefined) {
				defaultOption = this.getDefaultOption(options, defaultValue);
				this.selectedText = defaultOption.text;
				this.selectedValue = defaultOption.value;
				this.valueContainerText.setText(this.selectedText);
				this.valueContainerText.setValue(this.selectedValue);
			}
			else
				this.valueContainerText.setPlaceholder(placeholder);

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

			valueContainerElement.appendChild(valueContainerTextElement);

			optionsMenuElement = this.createOptionsMenu(optionLimit);
			customGuiWrapperElement.appendChild(optionsMenuElement);
			this.createOptionElements(options, defaultOption);
			if (width === undefined && options.length > 0) {
				width = this.getWidthBasedLongestOption();
				this.wrapper.setWidth(width);
			}
			this.optionsMenu.setWidth(width);
		}
	}

	function sortByDesc(optionA, optionB) {
		var a = optionA.text;
		var b = optionB.text;
		if (a > b)
			return 1;
		if (a < b)
			return -1;
		return 0;
	}

	function sortByAsc(optionA, optionB) {
		var a = optionA.text;
		var b = optionB.text;		
		if (a > b)
			return -1;
		if (a < b)
			return 1;
		return 0;
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
		this.customGuiSubWrapper = new SELEX.ELEMENTS.WIDGET.SubWrapper(function() {
			if (self.enabled === true) {
				self.optionsMenu.toggleVisibility();
				self.arrowContainerContent.toggleClass();
			}
		});
		return this.customGuiSubWrapper.render();
	}

	this.createCustomGuiWrapper = function() {
		this.customGuiWrapper = new SELEX.ELEMENTS.WIDGET.Wrapper(onFocusOut.bind(this), onKeyDown.bind(this), onKeyUp.bind(this), onKeyEnter.bind(this));
		return this.customGuiWrapper.render();
	}

	function onKeyEnter(e) {
		var hovered = this.optionsMenu.getHoveredChild();
		this.onOptionItemClick(hovered);
	}

	function onFocusOut(e) {
		this.optionsMenu.close();
		this.arrowContainerContent.toggleClass();
	}

	function onMouseOut(e) {
		this.optionsMenu.close();
		this.arrowContainerContent.toggleClass();			
	}

	function onKeyDown(e) {
		if (this.optionsMenu.isClosed())
			this.optionsMenu.open();
		var hovered = this.optionsMenu.getHoveredChild();
		this.optionsMenu.clearChildHovers();
		var optionsMenuElem = this.optionsMenu.getElement();
		var children = optionsMenuElem.children;
		if (children.length === 0)
			return;
		if (hovered === undefined) {
			hovered = children[0];
			this.optionsMenu.setChildHovered(hovered);
		}
		else {
			var index = parseInt(hovered.getAttribute("index"));
			if (children[index + 1] !== undefined) {
				hovered = children[index + 1];
				this.optionsMenu.setChildHovered(hovered);
			}
			else {
				hovered = children[0];
				this.optionsMenu.setChildHovered(hovered);
			}
		}
		optionsMenuElem.scrollTop = hovered.offsetTop;
	}

	function onKeyUp(e) {
		if (this.optionsMenu.isClosed())
			this.optionsMenu.open();
		var hovered = this.optionsMenu.getHoveredChild();
		this.optionsMenu.clearChildHovers();
		var optionsMenuElem = this.optionsMenu.getElement();
		var children = optionsMenuElem.children;
		if (children.length === 0)
			return;
		if (hovered === undefined) {
			hovered = children[children.length - 1];
			this.optionsMenu.setChildHovered(hovered);
		}
		else {
			var index = parseInt(hovered.getAttribute("index"));
			if (children[index - 1] !== undefined) {
				hovered = children[index - 1];
				this.optionsMenu.setChildHovered(hovered);
			}
			else {
				hovered = children[children.length - 1];
				this.optionsMenu.setChildHovered(hovered);
			}
		}
		optionsMenuElem.scrollTop = hovered.offsetTop;
	}

	this.createWrapper = function(theme, fontSize, fontFamily, tabIndex) {
		this.wrapper = new SELEX.ELEMENTS.Wrapper(theme, fontSize, fontFamily, tabIndex);
		return this.wrapper.render();
	}

	this.createOptionsMenu = function(optionLimit) {
		this.optionsMenu = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(optionLimit);
		return this.optionsMenu.render();
	}

	this.createNativeSelectBox = function() {
		this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(this.onNativeOptionItemClick.bind(this));
		return this.nativeSelectBox.render();
	}

	this.createValueContainerText = function() {
		this.valueContainerText = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText();
		return this.valueContainerText.render();
	}

	this.createValueContainer = function() {
		this.valueContainer = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer();
		return this.valueContainer.render();
	}

	this.createArrowElement = function() {
		var arrowContainerElement;
		var arrowContainerContentElement;
		this.arrowContainer = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer();
		arrowContainerElement = this.arrowContainer.render();
		this.arrowContainerContent = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent();
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


	this.createOptionElements = function(options, defaultOption) {
		var self = this;
		var optionsMenuElement = this.optionsMenu.getElement();
		var onOptionChange = this.settings.getOnOptionChange();
		var optionLimit = this.settings.getOptionLimit();
		optionsMenuElement.empty();
		for (var i = 0; i < options.length; i++) {
			var value = options[i].value;
			var text = options[i].text;
			var elem = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(value, text, this.onOptionItemClick.bind(this), i).render();
			if (defaultOption !== undefined) {
				if (defaultOption.value == value && defaultOption.text == text)
					elem.setClass("selected", true);
			}
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

	this.onOptionItemClick = function(elem) {
		var value = elem.getAttribute("value");
		var text = elem.children[0].innerHTML;
		var onOptionChange = this.settings.getOnOptionChange();
		this.valueContainerText.setValue(value);
		this.valueContainerText.setText(text);
		this.optionsMenu.close();
		var previouslySelected = this.optionsMenu.getSelectedChild();
		if (previouslySelected !== undefined)
			previouslySelected.clearClasses();
		this.arrowContainerContent.toggleClass();
		this.selectedValue = value;
		this.selectedText = text;
		if (typeof onOptionChange === "function")
			onOptionChange(this.selectedValue, this.selectedText);
		elem.addClass("selected", true);
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