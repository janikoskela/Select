(function () {

	Selex = function(userDefinedSettings) {

		var settings = new SELEX.SETTINGS.Settings(userDefinedSettings);
		var mediator = new SELEX.MEDIATOR.Mediator(settings);

		this.render = function() {
			mediator.render();
		}

		this.hide = function() {
			mediator.hide();
		}

		this.show = function() {
			mediator.show();
		}

		this.getSelectedText = function() {
			return mediator.getSelectedText();
		}

		this.getSelectedValue = function() {
			return mediator.getSelectedValue();
		}

		this.disable = function() {
			if (settings.isNativeSelectBoxToBeRendered() === true && settings.isNativeSelectBoxToBeDisplayed() === true)
				mediator.disableNative();
			else
				mediator.disableWidget();
		}

		this.enable = function() {
			if (settings.isNativeSelectBoxToBeRendered() === true && settings.isNativeSelectBoxToBeDisplayed() === true)
				mediator.enableNative();
			else
				mediator.enableWidget();
		}

		this.setOptions = function(options) {
			if (settings.isNativeSelectBoxToBeRendered() === true)
				mediator.createNativeOptionElements(options);
			if (settings.isNativeSelectBoxToBeDisplayed() === false)
				mediator.createOptionElements(options);
		}

	}

	var SELEX = {};
	SELEX.SETTINGS = {};
	SELEX.MEDIATOR = {};
	SELEX.ELEMENTS = {};
	SELEX.ELEMENTS.CUSTOM_GUI = {};
	SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER = {};
	SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER = {};
	SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU = {};

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
				self.arrowContainerContent.toggleClass();
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
			var previouslySelected = this.optionsMenu.getSelectedChild();
			if (previouslySelected !== undefined)
				previouslySelected.clearClasses();
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

	SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenuItem = function(value, text, onMenuItemClick) {
		this.value = value;
		this.text = text;
		this.onMenuItemClick = onMenuItemClick;
		this.type = "li";
		this.element;
		this.textNode;

		this.render = function() {
	    	this.element = document.createElement(this.type);
	    	this.element.addEventListener("click", onClick.bind(this));
	    	this.element.setAttribute("value", this.value);
	    	this.textNode = document.createTextNode(this.text);
	    	this.element.appendChild(this.textNode);
	    	return this.element;
		}

		function onClick(e) {
			if (typeof this.onMenuItemClick === "function")
				this.onMenuItemClick(this.value, this.text);
			this.element.setClass("selected", true);
		}
	}

	SELEX.ELEMENTS.CUSTOM_GUI.OPTIONS_MENU.OptionsMenu = function(optionLimit) {
		this.type = "ul";
		this.className = "options-container";
		this.element;
		this.width = "100%";
		this.height = "100%";
		this.optionLimit = optionLimit;

		this.render = function() {
	    	this.element = document.createElement(this.type);
	    	this.element.setClass(this.className);
	    	this.close();
	    	return this.element;
		}

		this.getSelectedChild = function() {
			var children = this.element.children;
			for (var key in children) {
				var child = children[key];
				if (typeof child === "object") {
					if (child.hasClass("selected"))
						return child;
				}
			}
		}

		this.getElement = function() {
			return this.element;
		}

		this.setWidth = function(width) {
			this.width = width;
			this.element.setStyle("width", this.width);
		}

		this.setHeight = function(height) {
			this.height = height;
			this.element.setStyle("height", this.height);
		}

		this.close = function() {
			this.element.hide();
		}

		this.open = function() {
			this.element.show();
			var children = this.element.children;
			if (children.length > 0) {
				var h = children[0].offsetHeight;
				if (this.optionLimit === undefined || children.length < this.optionLimit)
					h *= children.length;
				else
					h *= this.optionLimit;
				h += "px";
				this.setHeight(h);
			}
		}

		this.toggleVisibility = function() {
			if (this.element.isHidden())
				this.open();
			else
				this.close();
		}
	}

	SELEX.ELEMENTS.CUSTOM_GUI.SubWrapper = function(callback) {

	    this.type = "div";

	    this.className = "custom-gui-sub-wrapper";

	    this.element;
	    this.callback = callback;

	    this.render = function() {
	    	this.element = document.createElement(this.type);
	    	this.element.setClass(this.className);
	    	this.element.addEventListener("click", onClick.bind(this));
	    	return this.element;
	    }

	    function onClick(e) {
	    	if (typeof this.callback === "function")
	    		this.callback();
	    }

	}


	SELEX.ELEMENTS.CUSTOM_GUI.Wrapper = function(onMouseLeaveCallback) {

	    this.type = "div";
	    this.onMouseLeaveCallback = onMouseLeaveCallback;

	    this.className = "custom-gui-wrapper";

	    this.element;

	    this.tabIndex;

	    this.render = function() {
	    	this.element = document.createElement(this.type);
	    	this.element.setClass(this.className);
	    	this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
	    	return this.element;
	    }

	    this.onMouseLeave = function() {
	    	if (typeof this.onMouseLeaveCallback === "function")
	    		this.onMouseLeaveCallback();
	    }

	    this.setTabIndex = function(tabIndex) {
	    	this.tabIndex = tabIndex;
	    	this.element.setAttribute("tabindex", tabIndex);
	    }

	}

	SELEX.ELEMENTS.NativeSelectBox = function(changeCallback) {

		var self = this;
		this.type = "select";
		this.width = "100%";
		this.changeCallback = changeCallback;
		this.element = undefined;
		this.tabIndex = 0;
		this.fontSize = undefined;
		this.placeholder;

		this.setFontSize = function(fontSize) {
			this.fontSize = fontSize;
			this.element.setStyle("font-size", this.fontSize);
		}

		this.setPlaceholder = function(placeholder) {
			this.placeholder = placeholder;
			var placeholderInstance = new SELEX.ELEMENTS.NativeSelectBoxItem();
			var elem = placeholderInstance.render();
			placeholderInstance.setText(placeholder);
			elem.setAttribute("selected", true);
			elem.setAttribute("disabled", true);
			this.element.appendChild(elem);
		}

		this.render = function() {
			this.element = document.createElement(this.type);
			this.element.onchange = this.onOptionChange;
			return this.element;
		}

		this.enable = function() {
			this.element.removeAttribute("disabled");
		}

		this.disable = function() {
			this.element.setAttribute("disabled", true);
		}

		this.setTabIndex = function(tabIndex) {
			this.tabIndex = tabIndex;
			this.element.setAttribute("tabindex", this.tabIndex);
		}

		this.onOptionChange = function(e) {
			var value = e.target.selectedOptions[0].value;
			var text = e.target.selectedOptions[0].text;
			if (typeof self.changeCallback === "function") {
				self.changeCallback(value, text);
			}
		}

		this.setOption = function(value) {
			this.element.value = value;
		}

		this.getElement = function() {
			return this.element;
		}

		this.setWidth = function(width) {
			this.width = width;
			this.element.setStyle("width", this.width);
		}

		this.hide = function() {
			this.element.hide();
		}

		this.show = function() {
			this.element.show();
		}

	}

	SELEX.ELEMENTS.NativeSelectBoxItem = function(value, text) {
		this.element;
		this.type = "option";
		this.value = value;
		this.text = text;

		this.render = function() {
			this.element = document.createElement("option");
			if (this.text !== undefined)
				this.element.innerHTML = this.text;
			if (this.value !== undefined)
				this.element.setAttribute("value", this.value);
			return this.element;
		}

		this.setValue = function(value) {
			this.value = value;
			this.element.setAttribute("value", this.value);
		}

		this.setText = function(text) {
			this.text = text;
			this.element.innerHTML = this.text;
		}
	}

	SELEX.ELEMENTS.Wrapper = function(theme, fontSize, fontFamily) {

	    this.type = "div";

	    this.className = theme || "selex";

	    this.fontSize = fontSize || "12px";

	    this.fontFamily = fontFamily || "verdana";

	    this.width = "100%";

	    this.element;

	    this.render = function() {
	    	this.element = document.createElement(this.type);
	    	this.element.setClass(this.className);
	    	this.element.setStyle("fontSize", this.fontSize);
	    	this.element.setStyle("fontFamily", this.fontFamily);
	    	return this.element;
	    }

	    this.show = function() {
	    	this.element.show();
	    }

	    this.hide = function() {
	    	this.element.hide();
	    }

	    this.enable = function() {
	    	this.element.removeAttribute("disabled");
	    }

	    this.disable = function() {
	    	this.element.setAttribute("disabled", true);
	    }

	    this.setWidth = function(width) {
	    	this.width = width;
	    	this.element.setStyle("width", this.width);
	    }
	}

	SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainer = function() {

		this.type = "div";
		this.className = "value-container";
		this.element;

		this.render = function() {
			this.element = document.createElement(this.type);
	    	this.element.setClass(this.className);
			return this.element;
		}
	}

	SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER.ValueContainerText = function() {

		this.value;
		this.text;
		this.type = "span";
		this.className = "value-container-text";
		this.element;
		this.placeholder;

		this.render = function() {
			this.element = document.createElement(this.type);
	    	this.element.setClass(this.className);
	    	this.element.innerHTML = this.text;
	    	this.element.setAttribute("value", this.value);
			return this.element;
		}

		this.setPlaceholder = function(placeholder) {
			this.placeholder = placeholder;
			this.element.innerHTML = this.placeholder;
		}

		this.setValue = function(value) {
			this.value = value;
			this.element.setAttribute("value", value);
		}

		this.setText = function(text) {
			this.text = text;
			this.element.innerHTML = text;
		}
	}

	SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER.ArrowContainerContent = function() {

		var CLASS_NAME_ARROW_DOWN = "arrow-down";
		var CLASS_NAME_ARROW_UP = "arrow-up";

		this.type = "div";
		this.element;
		this.className = CLASS_NAME_ARROW_DOWN;

		this.render = function() {
			this.element = document.createElement(this.type);
			this.element.setClass(this.className);
			return this.element;
		}

		this.getElement = function() {
			return this.element;
		}

		this.toggleClass = function() {
			if (this.className === CLASS_NAME_ARROW_DOWN) {
				this.className = CLASS_NAME_ARROW_UP;
				this.element.setClass(CLASS_NAME_ARROW_UP);
			}
			else {
				this.className = CLASS_NAME_ARROW_DOWN;
				this.element.setClass(CLASS_NAME_ARROW_DOWN);
			}
		}
	}

	SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER.ArrowContainer = function() {

		this.type = "div";
		this.element;
		this.className = "arrow-container";

		this.render = function() {
			this.element = document.createElement(this.type);
			this.element.setClass(this.className);
			return this.element;
		}

		this.getElement = function() {
			return this.element;
		}
	}

	SELEX.SETTINGS.Settings = function(userDefinedSettings){
		var options = userDefinedSettings.options || [];
		var rootElement = userDefinedSettings.targetElement || undefined;
		var defaultValue = userDefinedSettings.defaultValue || undefined;
		var orientation = userDefinedSettings.orientation || "right";
		var onOptionChange = userDefinedSettings.onOptionChange || undefined;
		var optionLimit = userDefinedSettings.optionLimit;
		var sort = userDefinedSettings.sort || undefined;
		var tabIndex = userDefinedSettings.tabIndex || 0;
		var height = userDefinedSettings.height || undefined;
		var width = userDefinedSettings.width || undefined;
		var fontSize = userDefinedSettings.fontSize || undefined;
		var theme = userDefinedSettings.theme || "default";
		var fontFamily = userDefinedSettings.fontFamily;
		var nativeSelectBoxRender = userDefinedSettings.renderNativeSelectBox || false;
		var nativeSelectBoxDisplay = userDefinedSettings.displayNativeSelectBox || false;
		var placeholder = userDefinedSettings.placeholder;

		this.isNativeSelectBoxToBeRendered = function() {
			return nativeSelectBoxRender;
		}

		this.isNativeSelectBoxToBeDisplayed = function() {
			return nativeSelectBoxDisplay;
		}

		this.getFontFamily = function() {
			return fontFamily;
		}

		this.getTheme = function() {
			return theme;
		}

		this.getFontSize = function() {
			return fontSize;
		}

		this.getHeight = function() {
			return height;
		}

		this.getWidth = function() {
			return width;
		}

		this.getTabIndex = function() {
			return tabIndex;
		}

		this.getSort = function() {
			return sort;
		}

		this.getOptionLimit = function() {
			return optionLimit;
		}

		this.getOnOptionChange = function() {
			return onOptionChange;
		}

		this.getOrientation = function() {
			return orientation;
		}

		this.setOptions = function(optionsObj) {
			options = optionsObj;
		}

		this.getOptions = function() {
			return options;
		}

		this.getRootElement = function() {
			return rootElement;
		}

		this.getDefaultValue = function() {
			return defaultValue;
		}

		this.getPlaceholder = function() {
			return placeholder;
		}
	}

	Object.prototype.setStyle = function(name, value) {
		this.style[name] = value;
	}

	Object.prototype.addClass = function(name) {
		this.className += " " + name;
	}

	Object.prototype.clearClasses = function() {
		this.className = "";
	}

	Object.prototype.hasClass = function(name) {
		return this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
	}

	Object.prototype.isHidden = function() {
		return (this.style.display === "none") ? true : false;
	}

	Object.prototype.show = function() {
		this.style.display = "block";
	}

	Object.prototype.hide = function() {
		this.style.display = "none";
	}

	Object.prototype.empty = function() {
		this.innerHTML = "";
	}

	Object.prototype.setClass = function(name) {
		this.className = name;
	}


}());