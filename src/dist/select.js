(function ($) {
	var SEARCH_MODES = {};
	SEARCH_MODES.BY_FIRST_KEY = "firstKey";
	var KEY_CODES = {};
	KEY_CODES.UP = 38;
	KEY_CODES.DOWN = 40;
	KEY_CODES.ENTER = 13;
	var SORT_TYPES = {};
	SORT_TYPES.ASC = "asc";
	SORT_TYPES.DESC = "desc";
	var SELECT = {};
	SELECT.CONFIG = {};
	SELECT.UTILS = {};
	SELECT.HELPERS = {};
	SELECT.SETTINGS = {};
	SELECT.ELEMENTS = {};
	SELECT.SANDBOX = {};
	SELECT.ELEMENTS.WIDGET = {};
	SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER = {};
	SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER = {};
	SELECT.ELEMENTS.WIDGET.OPTIONS_MENU = {};
	SELECT.ELEMENTS.WIDGET.LOADING_OVERLAY = {};
	SELECT.ELEMENTS.NATIVE_SELECT = {};
	SELECT.EXCEPTIONS = {};
	var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver;
	var ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT = "select";

	Select = function(userDefinedSettings) {

		var Sandbox = new SELECT.SANDBOX.Sandbox();
		var that = this;

		init();

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELECT.EXCEPTIONS.InvalidOptionsErrorException();
			if (userDefinedSettings.el instanceof jQuery)
				userDefinedSettings.el = $(userDefinedSettings.el)[0];
			Sandbox.subscribe("UserDefinedSettings", userDefinedSettings);
			Sandbox.subscribe("Wrapper", new SELECT.ELEMENTS.Wrapper(Sandbox));
		}

		this.attach = function() {
			return Sandbox.publish("Wrapper:render");
		}

		this.hide = function() {
			Sandbox.publish("Wrapper:hide");
			return this;
		}

		this.show = function() {
			Sandbox.publish("Wrapper:show");
			return this;
		}

		this.detach = function() {
			Sandbox.publish("Wrapper:detach");
			return this;
		}

		this.disable = function() {
			Sandbox.publish("Wrapper:disable");
			return this;
		}

		this.enable = function() {
			Sandbox.publish("Wrapper:enable");
			return this;
		}

		this.toggleLoadingMode = function() {
			Sandbox.publish("Wrapper:toggleLoadingMode");
			return this;
		}

		this.toggleInputSearch = function() {
			Sandbox.publish("OptionsMenu:toggleInputSearch");
			return this;
		}

		this.isOptionMenuOpen = function() {
			var result = !Sandbox.publish("OptionsMenu:isHidden");
			if (SELECT.UTILS.isEmpty(result))
				return false;
			return result;
		}

		this.setTheme = function(theme) {
			Sandbox.publish("Wrapper:setTheme", theme);
			Sandbox.publish("OptionsMenu:setTheme", theme);
			return this;
		}

		this.getTheme = function() {
			return Sandbox.publish("Wrapper:getTheme");
		}

		this.remove = function() {
			Sandbox.publish("Wrapper:remove");
		}
	}

SELECT.CONFIG.CONSTRUCTOR_PARAMS_URL = "https://github.com/janikoskela/Select#constructor-parameters";SELECT.ELEMENTS.Element = function() {};

SELECT.ELEMENTS.Element.prototype.callFunction = function(obj, functionName, args) {
    return SELECT.UTILS.callFunc(obj, functionName, args);
};

SELECT.ELEMENTS.Element.prototype.hide = function() {
    return this.callFunction(this.element, "hide");
};

SELECT.ELEMENTS.Element.prototype.show = function() {
    return this.callFunction(this.element, "show");
};

SELECT.ELEMENTS.Element.prototype.getElement = function() {
	return this.element;
};

SELECT.ELEMENTS.Element.prototype.focus = function() {
    return this.callFunction(this.element, "focus");
};

SELECT.ELEMENTS.Element.prototype.blur = function() {
    return this.callFunction(this.element, "blur");
};

SELECT.ELEMENTS.Element.prototype.getClass = function() {
	return this.element.className;
};

SELECT.ELEMENTS.Element.prototype.getWidth = function() {
    var style = window.getComputedStyle(this.element);
    var display = style.display;
    var position = style.position;
    var visibility = style.visibility;
    var maxWidth = style.maxWidth.replace('px', '').replace('%', '');
    var wantedWidth = 0;

    // if its not hidden we just return normal height
    if (display !== 'none' && maxWidth !== '0') {
        return this.element.offsetWidth;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    this.element.style.position   = 'absolute';
    this.element.style.visibility = 'hidden';
    this.element.style.display    = 'block';

    wantedWidth     = this.element.offsetWidth;

    // reverting to the original values
    this.element.style.display = display;
    this.element.style.position   = position;
    this.element.style.visibility = visibility;
    return wantedWidth;
};

SELECT.ELEMENTS.Element.prototype.getHeight = function() {
    var style = window.getComputedStyle(this.element);
    var display = style.display;
    var position = style.position;
    var visibility = style.visibility;
    var maxHeight = style.maxHeight.replace('px', '').replace('%', '');
    var wantedHeight = 0;

    // if its not hidden we just return normal height
    if (display !== 'none' && maxHeight !== '0') {
        return this.element.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    this.element.style.position   = 'absolute';
    this.element.style.visibility = 'hidden';
    this.element.style.display    = 'block';

    wantedHeight     = this.element.offsetHeight;

    // reverting to the original values
    this.element.style.display = display;
    this.element.style.position   = position;
    this.element.style.visibility = visibility;
    return wantedHeight;
};

SELECT.ELEMENTS.Element.prototype.slideUp = function(speed) {
    var el_max_height = 0;
    var el = this.element;
    speed /= 1000;
    if(el.getAttribute('data-max-height')) {
        this.element.setDataAttribute("slide", "up");
        el.style.overflowY = 'hidden';
        el.style.maxHeight = '0';
    } else {
        el_max_height                  = this.getHeight() + 'px';
        el.style['transition']         = 'max-height ' + speed + 's ease-in-out';
        el.style.overflowY             = 'hidden';
        el.style.maxHeight             = '0';
        el.setAttribute('data-max-height', el_max_height);
        el.style.display               = 'block';

        // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
        setTimeout(function() {
            el.style.maxHeight = el_max_height;
        }, 10);
    }
};

SELECT.ELEMENTS.Element.prototype.slideDown = function(speed) {
    var el_max_height = 0;
    var el = this.element;
    speed /= 1000;
    if(el.getAttribute('data-max-height')) {
        el.style.overflowY = 'visible';
        this.element.setDataAttribute("slide", "down");
        el.style.maxHeight = el.getAttribute('data-max-height');
    } else {
        el_max_height                  = this.getHeight() + 'px';
        el.style['transition']         = 'max-height ' + speed + 's ease-in-out';
        el.style.overflowY             = 'visible';
        el.style.maxHeight             = '0';
        el.setAttribute('data-max-height', el_max_height);
        el.style.display               = 'block';

        // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
        setTimeout(function() {
            el.style.maxHeight = el_max_height;
        }, 10);
    }
};

SELECT.ELEMENTS.Element.prototype.isHidden = function() {
    return this.callFunction(this.element, "isHidden");
};

SELECT.ELEMENTS.Element.prototype.disable = function() {
    return this.callFunction(this.element, "setAttribute", ["setAttribute", true]);
};

SELECT.ELEMENTS.Element.prototype.enable = function() {
    return this.callFunction(this.element, "removeAttribute", "disabled");
};

SELECT.ELEMENTS.Element.prototype.isDisabled = function() {
    var result = this.callFunction(this.element, "isDisabled");
    if (result === undefined)
        return false;
    return result;
};

SELECT.ELEMENTS.Element.prototype.getTabIndex = function() {
    return this.callFunction(this.element, "getAttribute", "tabindex");
};

SELECT.ELEMENTS.Element.prototype.removeTabIndex = function() {
    return this.callFunction(this.element, "removeAttribute", "tabindex");
};

SELECT.ELEMENTS.Element.prototype.setSelectedIndex = function(index) {
	this.element.selectedIndex = index;
};

SELECT.ELEMENTS.Element.prototype.empty = function() {
    return this.callFunction(this.element, "removeChildren");
};

SELECT.ELEMENTS.Element.prototype.hasChildren = function() {
    var children = this.callFunction(this.element, "getChildren");
    if (SELECT.UTILS.isArray(children))
        return children.length > 0;
    return false;
};

SELECT.ELEMENTS.Element.prototype.disableTabNavigation = function() {
    return this.callFunction(this.element, "setAttribute", ["tabindex", "-1"]);
};SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox = function(Sandbox, el) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	var dataAttrPrefix = "selectjs";
	this.optionItems = [];
	this.observer;
	this.element = el;
	this.usePolling = userDefinedSettings.usePolling || false;
	this.pollingInterval = userDefinedSettings.pollingInterval || 100;
	this.isElemHidden;
	this.isElemDisabled;
	this.optionsCount;
	this.loadingMode;

	this.attach = function() {
		this.optionItems = [];
		var optionsLength = this.element.options.length;
		this.optionsCount = optionsLength;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem(Sandbox, option);
			this.optionItems.push(optionItem);
		}
		if (this.usePolling) {
			this.poller = setInterval(this.observeForChanges.bind(this), this.pollingInterval);
			this.isElemHidden = this.isHidden();
			this.isElemDisabled = this.isDisabled();
		}
		else if (MUTATION_OBSERVER !== undefined && this.observer === undefined) {
			attachDomObserver();
		}
		if (Sandbox.publish("Wrapper").responsiveFallback > 0 && SELECT.UTILS.isTouchDevice())
			this.element.addEventListener("change", onChange.bind(this));
		return this.element;
	}

	function onChange(e) {
		Sandbox.publish("ValueContainer:refresh");
	}

	this.open = function() {
        setTimeout(function() {
            var event = document.createEvent("MouseEvents");
            event.initEvent("mousedown", true, true);
            that.element.dispatchEvent(event);
        });
	}

	this.detach = function() {
		this.observer = undefined;
		if (this.poller !== undefined)
			clearInterval(this.poller);
		var tabIndex = Sandbox.publish("Wrapper:getTabIndex");
		if (!SELECT.UTILS.isEmpty(tabIndex))
			this.element.setAttribute("tabindex", tabIndex);
	}

	this.triggerFocus = function() {
		SELECT.UTILS.triggerEvent("focus", this.element);
	}

	this.setValue = function(value) {
		this.element.value = value;
	}

	this.observeForChanges = function() {
		if (SELECT.UTILS.isEmpty(this.element))
			Sandbox.publish("Wrapper:remove");
		var isHidden = this.element.isHidden();
		if (isHidden !== this.isElemHidden) {
			this.isElemHidden = isHidden;
			if (isHidden)
				Sandbox.publish("Wrapper:hide");
			else
				Sandbox.publish("Wrapper:show");
		}
		var isDisabled = this.element.isDisabled();
		if (isDisabled !== this.isElemDisabled) {
			this.isElemDisabled = isDisabled;
			if (isDisabled)
				Sandbox.publish("Wrapper:disable");
			else
				Sandbox.publish("Wrapper:enable");
		}
		var optionsCount = this.element.options.length;
		if (optionsCount !== this.optionsCount) {
			this.optionsCount = optionsCount;
			this.attach();
			Sandbox.publish("OptionsMenuList:refresh");
		}
		var theme = this.getPrefixedDataAttribute("theme");
		if (!SELECT.UTILS.isEmpty(theme) && theme != Sandbox.publish("Wrapper:getTheme"))
			Sandbox.publish("Wrapper:setTheme", theme);
		var loading = this.getPrefixedDataAttribute("loading-mode");
		if (!SELECT.UTILS.isEmpty(loading)) {
			loading = (loading == "true");
			if (this.loadingMode != loading) {
				this.loadingMode = loading;
				if (loading) {
					Sandbox.publish("Wrapper:enableLoadingMode");
				}
				else {
					Sandbox.publish("Wrapper:disableLoadingMode");
				}
			}
		}
		if (SELECT.UTILS.isElement(userDefinedSettings.appendOptionMenuTo)) 
			Sandbox.publish("WidgetWrapper:refresh");
		var selectedOptionValue = this.getSelectedOptionValue();
		if (this.selectedValue !== undefined)
			this.selectedValue == selectedOptionValue;
		if (selectedOptionValue != this.selectedValue)
			Sandbox.publish("ValueContainer:refresh");
	}

	this.getOptions = function() {
		return this.optionItems;
	}

	function attachDomObserver() {
		that.observer = new MUTATION_OBSERVER(function(mutations, observer) {
			if (mutations.length > 0) {
				that.attach();
				Sandbox.publish("OptionsMenuList:refresh");
				Sandbox.publish("ValueContainer:refresh");
			}
		});
		var config = { 
			attributes: true, 
			childList: true, 
			characterData : false,  
			subtree : false,
			attributeOldValue: false,
			attributeFilter: [],
			characterDataOldValue: false,
		};
		that.observer.observe(that.element, config);
	}

	this.setSelectedOption = function(value) {
		this.element.value = value;
		return this;
	}

	this.getSelectedOptionText = function() {
		var selectedOption = this.getSelectedOption();
		if (selectedOption !== undefined)
			return selectedOption.text;
		return "";
	}

	this.clearSelected = function() {
		var l = this.optionItems.length;
		for (var i = 0; i < l; i++)
			this.optionItems[i].removeSelected();
	}

	this.triggerChange = function() {
		this.clearSelected();
	    SELECT.UTILS.triggerEvent("change", this.element);
	}

	this.getSelectedOptionValue = function() {
		var selectedOption = this.getSelectedOption();
		if (selectedOption !== undefined)
			return selectedOption.value;
		return "";
	}

	this.getSelectedOptionImageUrl = function() {
		var selectedOption = this.getSelectedOption();
		if (selectedOption !== undefined)
			return selectedOption.getDataAttribute("image-url");
	}

	this.getSelectedOption = function() {
		return this.element.options[this.element.selectedIndex];
	}

	this.getPrefixedDataAttribute = function(name) {
		return this.element.getDataAttribute(dataAttrPrefix + "-" + name);
	}

};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem = function(Sandbox, optionElement) {
	this.element = optionElement;
	this.type = "option";

	this.isSelected = function() {
		return (this.element.getAttribute("selected") === null) ? false : true;
	}

	this.getText = function() {
		return this.element.text;
	}

	this.getOptionGroupLabel = function() {
		return this.element.parentNode.label;
	}

	this.getValue = function() {
		return this.element.value;
	}

	this.setSelected = function() {
		Sandbox.publish("NativeSelectBox").setSelectedIndex(this.element.index);
		Sandbox.publish("NativeSelectBox").setValue(this.getValue());
		Sandbox.publish("NativeSelectBox").triggerChange();
		this.element.setSelectedAttribute();
	}

	this.removeSelected = function() {
		this.element.removeAttribute("selected", "selected");
	}

	this.getImageUrl = function() {
		return this.element.getDataAttribute("image-url");
	}

	this.getDescription = function() {
		return this.element.getDataAttribute("description");
	}

	this.getOptionGroup = function() {
		var parentNode = this.element.parentNode;
		if (!SELECT.UTILS.isElement(parentNode))
			return;
		var tagName = parentNode.tagName;
		if (tagName !== null && tagName !== undefined) {
			if (tagName.toLowerCase() === "optgroup")
				return parentNode;
		}
	}
};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper = function(Sandbox) {

	this.type = "div";
	this.element;
	this.className = "native-select-wrapper";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type);
		this.element.setClass(this.className);
		return this.element;
	}
};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function(Sandbox) {

	this.type = "div";
	this.element;
	this.className = "arrow-container";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type);
		this.element.setClass(this.className);
		var arrowContainerContentInstance = Sandbox.subscribe("ArrowContainerContent", new SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent(Sandbox));
		var elem = arrowContainerContentInstance.render();
		this.element.appendChild(elem);
		return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent = function(Sandbox) {

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

	this.down = function() {
		this.className = CLASS_NAME_ARROW_DOWN;
		this.element.setClass(CLASS_NAME_ARROW_DOWN);
	}

	this.up = function() {
		this.className = CLASS_NAME_ARROW_UP;
		this.element.setClass(CLASS_NAME_ARROW_UP);
	}

	this.toggleClass = function() {
		if (this.className === CLASS_NAME_ARROW_DOWN) {
			this.up();
		}
		else {
			this.down();
		}
	}
};

SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(Sandbox) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.commonClassName = "options-container";
	this.className = this.commonClassName + " " + Sandbox.publish("Wrapper:getTheme");
	this.element;
	this.width = userDefinedSettings.optionsMenuWidth;
	this.height = undefined;
	this.locked = false;
	this.useSearchInput = userDefinedSettings.useSearchInput || false;
	this.closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut || false;
	this.animationSpeed = userDefinedSettings.animationSpeed || 150; //ms
	this.useAnimations = (userDefinedSettings.useAnimations === undefined) ? true : userDefinedSettings.useAnimations;

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuWrapper = Sandbox.subscribe("OptionsMenuWrapper", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuWrapper(Sandbox));
    	var optionsMenuWrapperElem = optionsMenuWrapper.render();
    	this.element.appendChild(optionsMenuWrapperElem);
    	if (this.width !== undefined)
			this.setWidth(this.width);
        if (userDefinedSettings.closeWhenCursorOut === true) {
            this.element.addEventListener("mouseleave", function(e) {
                var toElem = e.toElement || e.relatedTarget;
                var widgetWrapperElem = Sandbox.publish("WidgetWrapper:getElement");
                if ((!SELECT.UTILS.isElement(toElem)) || (!SELECT.UTILS.isDescendant(widgetWrapperElem, toElem) && toElem != widgetWrapperElem))
                    Sandbox.publish("OptionsMenu:hide");
            });
        }
        if (this.useAnimations !== true)
        	this.element.hide();
		return this.element;
	}

	this.remove = function() {
		this.element.remove();
	}

	this.setTheme = function(className) {
		this.className = this.commonClassName + " " + className;
		this.element.setClass(this.className);
	}

	this.onNoOptionsFound = function() {
		Sandbox.publish("OptionsMenuList:hide");
		Sandbox.publish("OptionsMenuSearchNoResults:show");
	}

	this.onOptionsFound = function() {
		Sandbox.publish("OptionsMenuList:show");
		Sandbox.publish("OptionsMenuSearchNoResults:hide");
	}

	this.isLocked = function() {
		return this.locked;
	}

	this.unLock = function() {
		this.locked = false;
	}

	this.lock = function() {
		this.hide();
		this.locked = true;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.setHeight = function(height) {
		this.height = height;
		this.element.setStyle("height", this.height);
	}

	this.hide = function() {
		if (this.isHidden())
			return;
		if (this.useAnimations === true) {
			this.slideUp(this.animationSpeed);

			//to animate options menu right after its rendered
			if (SELECT.UTILS.isElement(userDefinedSettings.appendOptionMenuTo)) {
				var pos = Sandbox.publish("WidgetWrapper:getPosition");
				this.setPosition(pos.left, pos.top);
			}
			if (userDefinedSettings.optionsMenuWidth === undefined) {
				var wrapperWidth = Sandbox.publish("Wrapper:getElement").offsetWidth;
				if (wrapperWidth != this.getWidth())
					this.setWidth(wrapperWidth);
			}
		}
		else
			this.element.hide();
		Sandbox.publish("Wrapper:getElement").setDataAttribute("open", false);
		Sandbox.publish("OptionsMenuSearchInput:clear");
		Sandbox.publish("OptionsMenuSearchInput:blur");
		Sandbox.publish("OptionsMenuSearchNoResults:hide");
		Sandbox.publish("OptionsMenuList:refresh");
		Sandbox.publish("ArrowContainerContent").down();
	}

	this.show = function() {
		if (this.locked === true)
			return;
		Sandbox.publish("NativeSelectBox:triggerFocus");
		if (this.useAnimations === true)
			this.slideDown(this.animationSpeed);
		else
			this.element.show();
		Sandbox.publish("OptionsMenuList:show");
		Sandbox.publish("Wrapper:getElement").setDataAttribute("open", true);
		/*this.element.removeClass("options-container-down");
		this.element.removeClass("options-container-up");
		var top = this.element.getStyle("top") || 0;
		this.element.removeStyle("top");
		var h = this.element.offsetHeight;
		var windowInnerHeight = window.innerHeight;
		var remainingWindowHeight = windowInnerHeight - this.element.getBoundingClientRect().top;
		this.element.hide();
		var widgetWrapper = Sandbox.publish("WidgetWrapper");
		if (remainingWindowHeight < h && widgetWrapper.getElement().getBoundingClientRect().top > h) {
			this.element.addClass("options-container-up");
			this.element.setStyle("top", h * -1);
		}
		else {
			this.element.addClass("options-container-down");
		}
		this.element.show();
		Sandbox.publish("ArrowContainerContent").up();*/
		Sandbox.publish("ArrowContainerContent").up();
		if (this.useSearchInput === true) {
			Sandbox.publish("OptionsMenu:focus");
			Sandbox.publish("OptionsMenuSearchInput:focus");
		}
		if (SELECT.UTILS.isElement(userDefinedSettings.appendOptionMenuTo)) {
			var pos = Sandbox.publish("WidgetWrapper:getPosition");
			this.setPosition(pos.left, pos.top);
		}
		if (userDefinedSettings.optionsMenuWidth === undefined) {
			var wrapperWidth = Sandbox.publish("Wrapper:getElement").offsetWidth;
			if (wrapperWidth != this.getWidth())
				this.setWidth(wrapperWidth);
		}
	}

	this.setPosition = function(left, top) {
		this.element.setStyle("top", top);
		this.element.setStyle("left", left);
	}

	this.isHidden = function() {
		if (this.useAnimations === true) {
			var maxHeight = this.element.getStyle("maxHeight");
			return (maxHeight == '0px' || maxHeight.length == 0 || this.element.isHidden()) ? true : false;
		}
		else
			return this.element.isHidden();
	}

	this.toggle = function() {
		if (this.isHidden())
			this.show();
		else
			this.hide();
	}

	this.toggleInputSearch = function() {
        if (this.useSearchInput === true) {
        	this.useSearchInput = false;
        	Sandbox.publish("OptionsMenuSearchWrapper:hide");
        }
        else {
        	if (this.optionsMenuSearchWrapper !== undefined)
        		Sandbox.publish("OptionsMenuSearchWrapper:show");
        	else {
        		renderOptionsMenuSearchWrapper();
        	}
        	this.useSearchInput = true;
        }
    }
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(Sandbox, nativeSelectOption, index) {
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
		e.preventDefault();
		e.stopPropagation();
		var optionsMenuList = Sandbox.publish("OptionsMenuList");
		var prevSelected = optionsMenuList.getSelectedOption();
		if (prevSelected === undefined) {
			this.setSelected();
		}
		else if (prevSelected.getIndex() !== this.getIndex()) {
			this.setSelected();
		}
		Sandbox.publish("OptionsMenu:hide");
		return false;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription = function(Sandbox, description) {
	this.type = "div";
	this.description = description;
	this.className = "options-container-list-item-description";
	this.element;

	this.render = function() {
    	this.element = new SELECT.UTILS.createElement(this.type, this.className);
    	this.textNode = document.createTextNode(this.description);
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemDescription.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage = function(Sandbox, imageUrl) {
	this.type = "img";
	this.imageUrl = imageUrl;
	this.element;

	this.render = function() {
    	this.element = new SELECT.UTILS.createElement(this.type);
    	this.element.setAttribute("src", this.imageUrl);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue = function(Sandbox, option) {
	this.option = option;
	this.type = "span";
	this.element;
	this.textNode;

	this.render = function() {
    	this.element = document.createElement(this.type);
    	this.textNode = document.createTextNode(this.option.getText());
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	var that = this;
	this.type = "ul";
	this.className = "options-container-list";
	this.element;
	this.height = undefined;
	this.optionItems = [];
	this.sortType = userDefinedSettings.sort;
	this.inputSearchEnabled = false;
	this.optionGroups = {};

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.refresh();
    	this.element.addEventListener("mousewheel", preventScrollEventFromBubbling.bind(this));
        this.element.addEventListener("onmousewheel", preventScrollEventFromBubbling.bind(this));
    	this.element.addEventListener("DOMMouseScroll", preventScrollEventFromBubbling.bind(this));
		return this.element;
	}

	function preventScrollEventFromBubbling(e) {
		var scrollingSpeed = 30;
   		var d = SELECT.UTILS.extractDelta(e);
    	this.element.scrollTop += ( d < 0 ? 1 : -1 ) * scrollingSpeed;
    	e.preventDefault();
    	e.stopPropagation();
    	return false;
	}

	this.refresh = function() {
        var options = Sandbox.publish("NativeSelectBox").getOptions();
		switch(this.sortType) {
    		case "asc":
    			options.sort(sortByAsc);
    			break;
    		case "desc":
    			options.sort(sortByDesc);
    			break;
            case "naturalSort":
                options.sort(naturalSort);
                break;
		}
        if (typeof this.sortType === "function")
            options.sort(this.sortType);
		renderOptionItems(options);
		Sandbox.publish("ValueContainer").refresh();
	}

	function renderOptionItems(options) {
        that.optionItems = [];
       	that.optionGroups = {};
       	that.element.removeChildren();
        var l = options.length;
		for (var i = 0; i < l; i++) {
			var option = options[i];
			var item = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(Sandbox, option, i);
			that.optionItems.push(item);
			var elem = item.render();
			var optionGroup = option.getOptionGroup();
			if (optionGroup !== undefined) {
				var optionGroupLabel = optionGroup.label;
				if (that.optionGroups[optionGroupLabel] === undefined) {
					that.optionGroups[optionGroupLabel] = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup(Sandbox, optionGroup);
		    		var li = that.optionGroups[optionGroupLabel].render();
		    		that.element.appendChild(li);
				}
				that.optionGroups[optionGroupLabel].getList().getElement().appendChild(elem);
			}
			else
				that.element.appendChild(elem);
		}
	}

    // http://stackoverflow.com/questions/2802341/javascript-natural-sort-of-alphanumerical-strings
    function sortByDesc(as, bs) {
        as = as.getText();
        bs = bs.getText();
        var a, b, a1, b1, i= 0, n, L,
        rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
        if(as=== bs) return 0;
        a= as.toLowerCase().match(rx);
        b= bs.toLowerCase().match(rx);
        L= a.length;
        while(i<L){
            if(!b[i]) return 1;
            a1= a[i],
            b1= b[i++];
            if(a1!== b1){
                n= a1-b1;
                if(!isNaN(n)) return n;
                return a1>b1? 1:-1;
            }
        }
        return b[i]? -1:0;
    }

    function sortByAsc(as, bs) {
        as = as.getText();
        bs = bs.getText();
        var a, b, a1, b1, i= 0, n, L,
        rx=/(\.\d+)|(\d+(\.\d+)?)|([^\d.]+)|(\.\D+)|(\.$)/g;
        if(as=== bs) return 0;
        a= as.toLowerCase().match(rx);
        b= bs.toLowerCase().match(rx);
        L= a.length;
        while(i<L){
            if(!b[i]) return -1;
            a1= a[i],
            b1= b[i++];
            if(a1!== b1){
                n= a1-b1;
                if(!isNaN(n)) return n;
                return a1>b1? -1:1;
            }
        }
        return b[i]? 1:0;
    }

    function getNextOption(option) {
    	var nextSibling = option.getNextSibling();
    	if (nextSibling !== null && nextSibling !== undefined) {
    		var index = nextSibling.getDataAttribute("index");
    		return getOptionByIndex(index);
    	}
    	var optionGroup = option.getOptionGroup();
    	if (optionGroup !== undefined) {
	    	var nextOptionGroup = optionGroup.nextSibling;
	    	if (nextOptionGroup !== null && nextOptionGroup !== undefined) {
	    		if (nextOptionGroup.hasClass("options-container-list-item")) {
	    			var index = nextOptionGroup.getDataAttribute("index");
	    			return getOptionByIndex(index);
	    		}
	    		else
	    			return getFirstOptionFromOptionGroup(nextOptionGroup);
	    	}
	    }
    }

    function getFirstOptionFromOptionGroup(optionGroup) {
    	var children = optionGroup.getChildren();
    	children = children[1].getChildren();
    	var index = children[0].getDataAttribute("index");
    	return getOptionByIndex(index);
    }

    function getOptionByIndex(index) {
    	var l = that.optionItems.length;
    	for (var i = 0; i < l; i++) {
    		var option = that.optionItems[i];
    		if (option.getIndex() == index)
    			return option;
    	}
    }

    function getPreviousOption(option) {
    	var i = option.getIndex();
    	if (i === 0)
    		return that.optionItems[that.optionItems.length - 1];
    	if (that.optionItems.length - 1 >= i)
    		return that.optionItems[i - 1];
    	return that.optionItems[that.optionItems.length - 1];
    }

    this.hoverPreviousOption = function() {
    	var optionsMenu = Sandbox.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
    	var hovered = this.getHoveredOption();
    	var option;
    	if (hovered === undefined) {
    		var selected = this.getSelectedOption();
    		if (selected !== undefined)
    			option = getPreviousOption(selected);
    	}
    	else
    		option = getPreviousOption(hovered);
    	if (option === undefined)
    		option = this.optionItems[this.optionItems.length - 1];
    	this.clearOptionItemHovers();
		option.setHovered();
		if (optionsMenu.isHidden())
			option.setSelected();
		else
			this.element.scrollTop = option.getElement().offsetTop;
    }

    this.hoverFirstOption = function() {
    	this.clearOptionItemHovers();
    	var children = this.element.getChildren();
    	var firstChild = children[0];
    	if (firstChild.hasClass("options-container-list-item")) {
    		firstChild.addClass("hovered");
    	}
    	else {
    		var f = firstChild.getChildren();
    		var b = f[1].getChildren();
    		b[0].addClass("hovered");
    	}
		this.element.scrollTop = 0;
		Sandbox.publish("WidgetWrapper:focus");
	}

    this.hoverNextOption = function() {
		var optionsMenu = Sandbox.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
    	var hovered = this.getHoveredOption();
    	var option;
    	if (hovered === undefined) {
    		var selected = this.getSelectedOption();
    		if (selected !== undefined)
    			option = getNextOption(selected);
    	}
    	else
    		option = getNextOption(hovered);
    	if (option === undefined)
    		option = this.optionItems[0];
    	this.clearOptionItemHovers();
		option.setHovered();
		if (optionsMenu.isHidden()) {
			option.setSelected();
		}
		else {
			this.element.scrollTop = option.getElement().offsetTop - Sandbox.publish("OptionsMenuSearchWrapper:getHeight");
		}
    }

    this.selectHoveredOption = function() {
		var optionsMenu = Sandbox.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
    	var hovered = this.getHoveredOption();
    	if (hovered !== undefined)
    		hovered.setSelected();
		Sandbox.publish("OptionsMenu:hide");
    }

    function findOptionByFirstCharFromStart(firstChar) {
		var optionsMenu = Sandbox.publish("OptionsMenu");
    	var optionItemsCount = that.optionItems.length;
    	for (var i = 0; i < optionItemsCount; i++) {
			var itemText = that.optionItems[i].getText();
			if (firstChar === itemText[0].toLowerCase()) {
				that.optionItems[i].setHovered();
				if (optionsMenu.isHidden())
					that.optionItems[i].setSelected();
				else
					that.element.scrollTop = that.optionItems[i].getElement().offsetTop;
				return;
			}
		}
    }

    function isNextOptionFirstCharMatch(optionItem, firstChar) {
    	var optionsMenu = Sandbox.publish("OptionsMenu");
    	var text = optionItem.getText();
    	if (text[0].toLowerCase() === firstChar) {
    		that.clearOptionItemHovers();
    		optionItem.setHovered();
    		if (optionsMenu.isHidden())
    			optionItem.setSelected();
    		else
				that.element.scrollTop = optionItem.getElement().offsetTop - Sandbox.publish("OptionsMenuSearchWrapper:getHeight");
			return true;
    	}
    	return false;
    }

    this.isInputSearchEnabled = function() {
    	return this.inputSearchEnabled;
    }

    this.searchByInputString = function(query) {
    	this.inputSearchEnabled = true;
    	var options = Sandbox.publish("NativeSelectBox:getOptions");
    	var l = options.length;
    	var optionsMenu = Sandbox.publish("OptionsMenu");
    	var matchedOptions = [];
    	for (var i = 0; i < l; i++) {
    		var option = options[i];
    		var optionText = option.getText().toLowerCase();
    		if (optionText.indexOf(query.toLowerCase()) > -1) {
    			matchedOptions.push(option);
    		}
    	}
    	renderOptionItems(matchedOptions);
    	if (matchedOptions.length === 0)
    		optionsMenu.onNoOptionsFound();
    	else
    		optionsMenu.onOptionsFound();
    }

	this.searchByFirstChar = function(firstChar) {
    	var optionsMenu = Sandbox.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
		var hovered = this.getHoveredOption();
		var optionItemsCount = this.optionItems.length;
		if (hovered === undefined) {
			findOptionByFirstCharFromStart(firstChar);
		}
		else {
			var hoveredText = hovered.getText().toLowerCase();
			var hoveredIndex = hovered.getIndex();
			for (var i = hoveredIndex + 1; i < optionItemsCount; i++) {
				if (isNextOptionFirstCharMatch(this.optionItems[i], firstChar))
					return;
			}
			for (var j = 0; j < hoveredIndex; j++) {
				if (isNextOptionFirstCharMatch(this.optionItems[j], firstChar))
					return;
			}
		}
	}

	this.getListElements = function() {
		return this.element.getChildren();
	}

	this.getHoveredOption = function() {
		for (var i = 0; i < this.optionItems.length; i++) {
			var item = this.optionItems[i];
			if (item.isHovered())
				return item;
		}
	}

	this.getOptionByValue = function(value) {
		var l = this.optionItems.length;
		for (var i = 0; i < l; i++) {
			if (this.optionItems[i].getValue() === value)
				return this.optionItems[i];
		}
	}

	this.getSelectedOption = function() {
		for (var i = 0; i < this.optionItems.length; i++) {
			var item = this.optionItems[i];
			if (item.isSelected())
				return item;
		}
 	}

	this.clearOptionItemHovers = function() {
		var l = this.optionItems.length;
		for (var i = 0; i < l; i++) {
			this.optionItems[i].removeHovered();
		}
	}

	this.clearSelected = function() {
		var l = this.optionItems.length;
		for (var i = 0; i < l; i++)
			this.optionItems[i].removeSelected();
	}


	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.setHeight = function(height) {
		this.height = height;
		this.element.setStyle("height", this.height);
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup = function(Sandbox, optionGroup) {
	this.type = "li";
	this.className = "options-menu-list-item-group";
	this.element;
	this.optionGroup = optionGroup;
	this.list;
	this.title;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.title = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle(Sandbox, this.optionGroup.label);
    	var titleElem = this.title.render();
    	this.list = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList(Sandbox);
    	var listElem = this.list.render();
    	this.element.appendChild(titleElem);
    	this.element.appendChild(listElem);
    	return this.element;
	}
	
	this.getList = function() {
		return this.list;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList = function(Sandbox) {
	this.type = "ul";
	this.className = "options-menu-list-item-group-list";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupList.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle = function(Sandbox, text) {
	this.type = "h2";
	this.className = "options-menu-list-item-group-title";
	this.text = text;
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	return this.element;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroupTitle.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "input";
	this.className = "options-menu-search-input";
	this.tabIndex = -1;
	this.element;
	this.allowClose = true;
	this.placeholder = userDefinedSettings.searchInputPlaceholder || "";

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	this.element.setAttribute("type", "text");
    	this.element.setAttribute("tabindex", this.tabIndex);
    	this.element.setAttribute("placeholder", this.placeholder);
    	this.element.addEventListener("blur", this.focusOut);
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.addEventListener("click", onClick.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
		this.value = undefined;
	}

	this.focusOut = function(e) {
		if (this.allowClose) {
			Sandbox.publish("OptionsMenu:hide");
			Sandbox.publish("WidgetWrapper:blur");
		}
	}

	function onClick(e) {
		e.preventDefault();
		e.stopPropagation();
		return false;
	}

	function onKeyUp(e) {
		e.preventDefault();
		e.stopPropagation();
        switch(e.keyCode) {
        	case KEY_CODES.DOWN:
        		this.allowClose = false;
        		Sandbox.publish("OptionsMenuList").hoverFirstOption();
        		this.blur();
        		break;
        	default:
        		this.allowClose = true;
				var value = this.element.value;
				if (value.length === 0) {
					Sandbox.publish("OptionsMenuList:refresh");
					Sandbox.publish("OptionsMenuList:show");
					Sandbox.publish("OptionsMenuSearchNoResults:hide");
				}
				else
					Sandbox.publish("OptionsMenuList:searchByInputString", value);
        }
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInputWrapper = function(Sandbox) {
	this.type = "div";
	this.className = "options-menu-search-input-wrapper";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuSearchInput = Sandbox.subscribe("OptionsMenuSearchInput", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput(Sandbox));
    	var optionsMenuSearchInputElem = optionsMenuSearchInput.render();
    	this.element.appendChild(optionsMenuSearchInputElem);
    	return this.element;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInputWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-no-results";
	this.element;
	this.text = userDefinedSettings.noResultsMessage || "No results";

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	this.hide();
    	return this.element;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-wrapper";
	this.element;

	this.render = function() {
    	this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuSearchInputWrapper = Sandbox.subscribe("OptionsMenuSearchInputWrapper", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInputWrapper(Sandbox));
    	var optionsMenuSearchInputWrapperElem = optionsMenuSearchInputWrapper.render();
    	this.element.appendChild(optionsMenuSearchInputWrapperElem);
    	
    	var optionsMenuSearchNoResults = Sandbox.subscribe("OptionsMenuSearchNoResults", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults(Sandbox));
    	this.element.appendChild(optionsMenuSearchNoResults.render());
    	return this.element;
	}

	this.getHeight = function() {
		return this.element.offsetHeight;
	}

	this.setWidth = function(width) {
		this.element.setStyle("width", width);
		this.width = width;
	}

};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuWrapper = function(Sandbox) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-container-wrapper";
	this.useSearchInput = userDefinedSettings.useSearchInput || false;
	this.element;

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
    	var optionsMenuList = Sandbox.subscribe("OptionsMenuList", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(Sandbox));
    	var optionsMenuListElem = optionsMenuList.render();
        if (this.useSearchInput === true) {
        	renderOptionsMenuSearchWrapper();
        }
    	this.element.appendChild(optionsMenuListElem);
    	if (this.width !== undefined)
			this.setWidth(this.width);
    	return this.element;
	}

	function renderOptionsMenuSearchWrapper() {
    	that.optionsMenuSearchWrapper = Sandbox.subscribe("OptionsMenuSearchWrapper", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper(Sandbox));
    	var optionsMenuSearchWrapperElem = that.optionsMenuSearchWrapper.render();
		that.element.appendFirst(optionsMenuSearchWrapperElem);
	}
};

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(Sandbox) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "value-container";
	this.element;
	this.loadingText = userDefinedSettings.loadingText || "Loading";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);

        var valueContainerImage = Sandbox.subscribe("ValueContainerImage", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage(Sandbox));
		var valueContainerImageElem = valueContainerImage.render();
		this.element.appendChild(valueContainerImageElem);
		var imageUrl = Sandbox.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (SELECT.UTILS.isEmpty(imageUrl))
			valueContainerImage.hide();
		else
			valueContainerImage.setImageUrl(imageUrl);

    	var valueContainerText = Sandbox.subscribe("ValueContainerText", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(Sandbox));
    	var valueContainerTextElem = valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.refresh = function() {
		if (Sandbox.publish("Wrapper:getLoadingMode"))
			return;
		Sandbox.publish("ValueContainerText").refresh();
		var imageUrl = Sandbox.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (imageUrl !== undefined && imageUrl !== null) {
			Sandbox.publish("ValueContainerImage").setImageUrl(imageUrl);
			Sandbox.publish("ValueContainerImage").show();
		}
		else
			Sandbox.publish("ValueContainerImage").hide();	
	}

	this.enableLoadingMode = function() {
		Sandbox.publish("ValueContainerText").setText(this.loadingText);
		enableDotDotDotInterval();
	}

	function enableDotDotDotInterval() {
		var dots = ".";
		that.timeInterval = setInterval(function() {
			if (dots.length === 3)
				dots = ".";
			else
				dots += ".";
			Sandbox.publish("ValueContainerText").setText(that.loadingText + dots);
		}, 500);
	}

	this.disableLoadingMode = function() {
		clearInterval(this.timeInterval);
		Sandbox.publish("ValueContainerText").refresh();
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage = function(Sandbox) {
	this.type = "img";
	this.imageUrl;
	this.element;
	this.loaded = false;

	this.render = function() {
		this.element = SELECT.UTILS.createElement(this.type);
		this.element.addEventListener("load", this.onLoad.bind(this), false);
		return this.element;
	}

	this.setImageUrl = function(imageUrl) {
		this.imageUrl = imageUrl;
		this.element.setAttribute("src", this.imageUrl);
	}

	this.show = function() {
		this.element.setStyle("display", "inline-block");
	}

	this.onLoad = function() {
		if (!this.loaded) {
			if (Sandbox.publish("Wrapper:isWidthDefinedByUser"))
				return;
			var width = Sandbox.publish("Wrapper:getWidth");
			width += this.getWidth();
			Sandbox.publish("Wrapper:setWidth", width);
			this.loaded = true;
		}
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(Sandbox) {
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	var that = this;
	this.type = "span";
	this.className = "value-container-text";
	this.element;
	this.placeholder = userDefinedSettings.placeholder;

	this.render = function() {
		this.element = SELECT.UTILS.createElement(this.type, this.className);
		this.refresh();
		return this.element;
	}

	this.refresh = function() {
		var text = Sandbox.publish("NativeSelectBox").getSelectedOptionText();
		if (text === undefined || text === null && this.placeholder !== undefined)
			this.setText(this.placeholder);
		else if (text.length  === 0 && this.placeholder !== undefined)
			this.setText(this.placeholder);
		else
			this.setText(text);
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.element.innerHTML = this.placeholder;
	}

	this.setText = function(text) {
		this.text = text;
		this.element.innerHTML = text;
	}
};

SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.SubWrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = userDefinedSettings.orientation || "right";

    this.element;

    this.locked = false;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        this.element.addEventListener("click", onClick.bind(this));

        var arrowContainer = Sandbox.subscribe("ArrowContainer", new SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(Sandbox));
        var arrowContainerElem = arrowContainer.render();

        var valueContainer = Sandbox.subscribe("ValueContainer", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(Sandbox));
        var valueContainerElem = valueContainer.render();

        switch (this.orientation) {
            case ORIENTATION_LEFT:
                this.element.appendChild(arrowContainerElem);
                arrowContainerElem.setStyle("float", this.orientation);
                this.element.appendChild(valueContainerElem);
                break;
            case ORIENTATION_RIGHT:
                this.element.appendChild(valueContainerElem);
                this.element.appendChild(arrowContainerElem);
                arrowContainerElem.setStyle("float", this.orientation);
                break;
            default:
                throw Error("Invalid orientation value \"" + this.orientation + "\"");

        }

        return this.element;
    }
    
    this.lock = function() {
        this.locked = true;
    }

    this.unLock = function() {
        this.locked = false;
    }

    this.isNativeOptionListUsed = function() {
        return this.useNativeOptionList;
    }

    this.renderOptionMenu = function() {
        var optionsMenu = Sandbox.subscribe("OptionsMenu", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(Sandbox));
        var optionsMenuElem = optionsMenu.render();
        var appendOptionsMenuTo = SELECT.UTILS.getElement(userDefinedSettings.appendOptionMenuTo);
        if (SELECT.UTILS.isElement(appendOptionsMenuTo)) {
            appendOptionsMenuTo.appendChild(optionsMenuElem);
        }
        else
            Sandbox.publish("WidgetWrapper:getElement").appendChild(optionsMenuElem);
        if (Sandbox.publish("OptionsMenu").useAnimations === true)
            Sandbox.publish("OptionsMenu:slideUp", Sandbox.publish("OptionsMenu").animationSpeed); //animations wont work otherwise
    }

    function onClick(e) {
        if (this.locked === true || Sandbox.publish("NativeSelectBox:isDisabled"))
            return;
        if (Sandbox.publish("Wrapper:isNativeOptionListUsed")) {
            Sandbox.publish("NativeSelectBox:open");
            return;
        }
        if (Sandbox.publish("OptionsMenu") === undefined) {
            this.renderOptionMenu();
        }
        Sandbox.publish("OptionsMenu:toggle");
    }

};

SELECT.ELEMENTS.WIDGET.SubWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.WIDGET.Wrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex = Sandbox.publish("NativeSelectBox").getTabIndex() || 0;

    this.closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut || true;

    this.locked = false;

    this.positionLeft;

    this.positionTop;

    this.openOptionMenuUponHover = userDefinedSettings.openOptionMenuUponHover || false;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        this.element.setAttribute("tabindex", this.tabIndex);
        if (userDefinedSettings.closeWhenCursorOut === true) {
            this.element.addEventListener("mouseleave", function(e) {
                var toElem = e.toElement || e.relatedTarget;
                var optionsMenuElem = Sandbox.publish("OptionsMenu:getElement");
                if ((!SELECT.UTILS.isElement(toElem)) || (!SELECT.UTILS.isDescendant(optionsMenuElem, toElem) && toElem != optionsMenuElem))
                    Sandbox.publish("OptionsMenu:hide");
            });
        }
        document.addEventListener("click", function(e) {
            Sandbox.publish("OptionsMenu:hide");
        });
        this.element.addEventListener("click", function(e) {
            e.stopPropagation();
            e.preventDefault();
            return false;
        });
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));
        this.element.addEventListener("touchmove", touchScroll.bind(this));
        this.element.addEventListener("scroll", touchScroll.bind(this));
        if (this.openOptionMenuUponHover)
            this.element.addEventListener("mouseover", mouseOver.bind(this));
        var widgetSubWrapper = Sandbox.subscribe("WidgetSubWrapper", new SELECT.ELEMENTS.WIDGET.SubWrapper(Sandbox));
        var widgetSubWrapperElem = widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);

        return this.element;
    }

    this.refresh = function() {
        var pos = this.getPosition();
        var top = pos.top;
        var left = pos.left;
        if (this.positionTop === undefined)
            this.positionTop = top;
        if (this.positionLeft === undefined)
            this.positionLeft = left;
        if (top !== this.positionTop || left != this.positionLeft) {
            var optionsMenu = Sandbox.publish("OptionsMenu");
            if (!SELECT.UTILS.isEmpty(optionsMenu))
                optionsMenu.setPosition(left, top);
            this.positionLeft = left;
            this.positionTop = top;
        }
    }

    this.getPosition = function() {
        return SELECT.UTILS.getElementPosition(this.element);
    }

    this.lock = function() {
        this.locked = true;
    }

    this.unLock = function() {
        this.locked = false;
    }

    this.enableTabNavigation = function() {
        this.element.setAttribute("tabindex", this.tabIndex);
    }

    function mouseOver(e) {
        if (SELECT.UTILS.isEmpty(Sandbox.publish("OptionsMenu"))) {
            Sandbox.publish("WidgetSubWrapper:renderOptionMenu");
        }
        Sandbox.publish("OptionsMenu:show");
    }

    function touchScroll(e) {
        e.stopPropagation();
        return false;
    }

    function onKeyDown(e) {
        if (this.locked === true)
            return;
        switch(e.keyCode) {
            case KEY_CODES.UP:
            case KEY_CODES.DOWN:
                e.preventDefault();
                e.stopPropagation();
                break;
        }
        return false;
    }

    function onKeyUp(e) {
        if (this.locked === true)
            return false;
        if (Sandbox.publish("OptionsMenu") === undefined) {
            Sandbox.publish("WidgetSubWrapper:renderOptionMenu");
        }
        switch(e.keyCode) {
            case KEY_CODES.UP:
                Sandbox.publish("OptionsMenuList:hoverPreviousOption");
                break;
            case KEY_CODES.DOWN:
                Sandbox.publish("OptionsMenuList:hoverNextOption");
                break;
            case KEY_CODES.ENTER:
                Sandbox.publish("OptionsMenuList:selectHoveredOption");
                break;
            default:
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                Sandbox.publish("OptionsMenuList:searchByFirstChar", firstChar);
        }
        Sandbox.publish("OptionsMenu:getElement").hide();
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    function onMouseLeave(e) {
        Sandbox.publish("OptionsMenu:hide");
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

    this.getWidthByLongestOption = function() {
        var paddingRight = 12;
        var options = Sandbox.publish("NativeSelectBox").getOptions();
        var origOption = Sandbox.publish("NativeSelectBox").getSelectedOption();
        var l = options.length;
        var widest = 0;
        for (var i = 0; i < l; i++) {
            var option = options[i];
            var optionValue = option.getValue();
            Sandbox.publish("NativeSelectBox").setSelectedOption(optionValue);
            Sandbox.publish("ValueContainer:refresh");
            var width = Sandbox.publish("WidgetWrapper:getWidth");
            if (optionValue.length > width)
                width = optionValue;
            if (width > widest) {
                widest = width;
            }
        }
        Sandbox.publish("NativeSelectBox").setSelectedOption(origOption.value);
        Sandbox.publish("ValueContainer:refresh");
        return widest + paddingRight;
    }

};

SELECT.ELEMENTS.WIDGET.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.ELEMENTS.Wrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    var that = this;

    this.type = "div";

    this.theme = userDefinedSettings.theme || "select-js-theme-light";

    this.commonClassName = "select-widget";

    this.className = this.theme + " " + this.commonClassName;

    this.width = userDefinedSettings.width;

    this.widgetWrapper;

    this.element;

    this.el = userDefinedSettings.el;

    this.loadingMode = false;

    this.isWidthDefinedByUser;

    this.responsiveFallback = userDefinedSettings.responsiveFallback || 640;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        if (!SELECT.UTILS.isElement(this.el))
            throw new SELECT.EXCEPTIONS.InvalidTargetElementErrorException();
        var tagName = this.el.tagName.toLowerCase();
        switch(tagName) {
            case ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT:
                var parentsParent = this.el.parentNode;
                var instance = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox(Sandbox, this.el);
                Sandbox.subscribe("NativeSelectBox", instance).attach();
                if (instance.isDisabled())
                    this.disable();
                if (SELECT.UTILS.isElement(parentsParent))
                    parentsParent.insertBefore(this.element, this.el);
                this.element.appendChild(this.el);
                var nativeSelectBoxWrapper = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper(Sandbox);
                Sandbox.subscribe("NativeSelectBoxWrapper", nativeSelectBoxWrapper);
                var nativeSelectBoxWrapperEl = nativeSelectBoxWrapper.render();
                this.el.parentNode.replaceChild(nativeSelectBoxWrapperEl, this.el);
                nativeSelectBoxWrapperEl.appendChild(this.el);
                this.element.appendChild(nativeSelectBoxWrapperEl);
                if (userDefinedSettings.copyNativeClasses === true)
                    this.element.addClass(Sandbox.publish("NativeSelectBox:getClass"));
                break;
            default:
                throw new SELECT.EXCEPTIONS.InvalidTargetElementErrorException();
        }
        renderWidget();
        if (SELECT.UTILS.isEmpty(this.width)) {
            this.width = Sandbox.publish("WidgetWrapper:getWidthByLongestOption");
            this.isWidthDefinedByUser = false;
        }
        else
            this.isWidthDefinedByUser = true;
        if (this.width)
            this.setWidth(this.width);
        return this.element;
    }

    this.isNativeOptionListUsed = function() {
        if (this.responsiveFallback > 0) {
            if (SELECT.UTILS.isTouchDevice() && (window.innerHeigth <= this.responsiveFallback || window.innerWidth <= this.responsiveFallback)) {
                return true;
            }
        }
        return false;
    }

    function renderWidget() {
        var widgetWrapperInstance = Sandbox.subscribe("WidgetWrapper", new SELECT.ELEMENTS.WIDGET.Wrapper(Sandbox));
        var widgetWrapperElem = widgetWrapperInstance.render();
        that.element.appendChild(widgetWrapperElem);

        //we cannot allow tabindex to remain in given select since it would popup native option menu when not intended
        var tabIndex = Sandbox.publish("NativeSelectBox:getTabIndex");
        if (!SELECT.UTILS.isEmpty(tabIndex)) {
            Sandbox.publish("Wrapper:getElement").setAttribute("tabindex", tabIndex);
            Sandbox.publish("NativeSelectBox:removeTabIndex");
        }
    }

    this.isWidthDefinedByUser = function() {
        return this.isWidthDefinedByUser;
    }

    this.getTheme = function() {
        return this.theme;
    }

    this.getWidth = function() {
        return this.width;
    }

    this.toggleLoadingMode = function() {
        if (this.loadingMode === false)
            this.enableLoadingMode();
        else
            this.disableLoadingMode();
    }

    this.getLoadingMode = function() {
        return this.loadingMode;
    }

    this.enableLoadingMode = function() {
        this.loadingMode = true;
        Sandbox.publish("OptionsMenu:lock");
        Sandbox.publish("ValueContainer:enableLoadingMode");
        Sandbox.publish("WidgetWrapper:lock");
        Sandbox.publish("WidgetSubWrapper:lock");
        Sandbox.publish("ValueContainerImage:hide");
    }

    this.disableLoadingMode = function() {
        this.loadingMode = false;
        Sandbox.publish("OptionsMenu:unLock");
        Sandbox.publish("ValueContainer:disableLoadingMode");
        Sandbox.publish("WidgetWrapper:unLock");
        Sandbox.publish("WidgetSubWrapper:unLock");
        Sandbox.publish("ValueContainerImage:show");
    }

    this.show = function() {
        this.element.show();
    }

    this.hide = function() {
        this.element.hide();
    }

    this.enable = function() {
        this.element.removeAttribute("disabled");
        Sandbox.publish("WidgetWrapper:unLock");
        Sandbox.publish("WidgetSubWrapper:unLock");
        Sandbox.publish("OptionsMenu:unLock");
        Sandbox.publish("WidgetWrapper:enableTabNavigation");
    }

    this.disable = function() {
        this.element.setAttribute("disabled", true);
        Sandbox.publish("WidgetWrapper:lock");
        Sandbox.publish("WidgetSubWrapper:lock");
        Sandbox.publish("OptionsMenu:lock");
        Sandbox.publish("WidgetWrapper:disableTabNavigation");
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }

    this.detach = function() {
        var parent = this.element.parentNode;
        parent.insertBefore(this.el, this.element);
        this.remove();
    }

    this.setTheme = function(theme) {
        this.theme = theme;
        this.className = theme + " " + this.commonClassName;
        this.element.setClass(this.className);
    }

    this.remove = function() {
        Sandbox.publish("NativeSelectBox:detach");
        SELECT.UTILS.purge(Sandbox.publish("OptionsMenu:getElement")); //this isn't a child of wrapper
        SELECT.UTILS.purge(this.element);
        Sandbox.publish("OptionsMenu:remove");
        this.element.remove();
    }
};
SELECT.ELEMENTS.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);SELECT.EXCEPTIONS.InvalidOptionsErrorException = function() {
	return {
		name:        "Invalid options object", 
	    level:       "Show Stopper", 
	    message:     "options should be in object form with required key-value pairs. See the required key-value pairs from " + SELECT.CONFIG.CONSTRUCTOR_PARAMS_URL,  
	    htmlMessage: "Error detected",
	    toString:    function(){return this.name + ": " + this.message;} 
	}
};SELECT.EXCEPTIONS.InvalidTargetElementErrorException = function() {
	return {
		name:        "Invalid target element", 
	    level:       "Show Stopper", 
	    message:     "el should be <select> or <input type='select'>",  
	    htmlMessage: "Error detected",
	    toString:    function(){return this.name + ": " + this.message;} 
	}
};SELECT.HELPERS.getOptionByValue = function(options, value) {
	for (var i = 0; i < options.length; i++) {
		var option = options[i];
		if (option.value == value)
			return option;
	}
};Element.prototype.setStyle = function(name, value) {
  if (typeof value === "number") {
    value += "px";
  }
  if (this !== undefined)
    this.style[name] = value;
};

Element.prototype.getNextSibling = function() {
  return this.nextSibling;
};

Element.prototype.removeChildren = function() {
  this.innerHTML = "";
};

Element.prototype.getChildren = function() {
  return this.childNodes;
};

Element.prototype.setSelectedAttribute = function() {
  this.setAttribute("selected", true);
};

Element.prototype.removeStyle = function(name) {
  this.style[name] = null;
};

Element.prototype.remove = function() {
  var parent = this.parentNode;
  console.log(SELECT.UTILS.isElement(parent))
  if (SELECT.UTILS.isElement(parent)) {
    console.log(this)
    parent.removeChild(this);
  }
};

Element.prototype.getStyle = function(name) {
  return this.style[name];
};

Element.prototype.hasClass = function(name) {
  var result = this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  if (result === null)
    return false;
  return result;
};

Element.prototype.addClass = function(name) {
  if (this.hasClass(name) === false)
   this.className += " " + name;
};

Element.prototype.clearClasses = function() {
  this.className = "";
};

Element.prototype.setDataAttribute = function(name, value) {
  this.setAttribute("data-" + name, value);
};

Element.prototype.getDataAttribute = function(name) {
  return this.getAttribute("data-" + name);
};

Element.prototype.removeDataAttribute = function(name) {
  this.removeAttribute("data-" + name);
};

Element.prototype.isHidden = function() {
  return (this.style.display === "none") ? true : false;
};

Element.prototype.show = function() {
  this.style.display = "block";
};

Element.prototype.hide = function() {
  this.style.display = "none";
};

Element.prototype.empty = function() {
  this.innerHTML = "";
};

Element.prototype.setClass = function(name) {
  this.className = name;
};

Element.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
    for (var i in this) {
      if (i == 'clone') 
        continue;
      if (this[i] && typeof this[i] == "object")
          newObj[i] = this[i].clone();
      else 
        newObj[i] = this[i];
    } 
    return newObj;
};

Element.prototype.removeClass = function(className) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== className) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName;
};
Element.prototype.appendFirst = function(childNode){
    if (this.firstChild)
      this.insertBefore(childNode,this.firstChild);
    else 
      this.appendChild(childNode);
};
Element.prototype.isDisabled = function() {
    return (this.getAttribute("disabled") === null) ? false : true;
};SELECT.SANDBOX.Sandbox = function() {
	this.subscribe = function(name, instance) {
		this[name] = instance;
		return instance;
	}

	this.publish = function(name, args) {
		var parts = name.split(":");
		if (parts.length > 1) {
			var instance = this[parts[0]];
			var result = SELECT.UTILS.callFunc(instance, parts[1], args);
			if (result === undefined)
				return instance;
			return result;
		}
		return this[name];
	}
};SELECT.UTILS.createElement = function(type, classes) {
	var elem = document.createElement(type);
	if (typeof classes === "string")
		elem.setClass(classes);
	return elem;
};

SELECT.UTILS.getElement = function(elem) {
    if (elem instanceof jQuery)
        return $(elem)[0];
    return elem;
};

SELECT.UTILS.callFunc = function(obj, functionName, args) {
    if (typeof obj == "object") {
        var func = obj[functionName];
        if (typeof func == "function") {
            if (!SELECT.UTILS.isArray(args))
                return func.call(obj, args);
            else
                return func.apply(obj, args);
        }
    }
};

SELECT.UTILS.isArray = function(obj) {
    return ('isArray' in Array) ? Array.isArray(obj) : Object.prototype.toString.call(obj) == '[object Array]';
};

SELECT.UTILS.isElement = function(o) {
	//Returns true if it is a DOM element   
    o = SELECT.UTILS.getElement(o); 
  	return (
    	typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2 
    	o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
};

SELECT.UTILS.triggerEvent = function(type, targetElem) {
	var e;
	if(typeof(document.createEvent) != 'undefined') {
	    e = document.createEvent('HTMLEvents');
	    e.initEvent(type, true, true);
	    targetElem.dispatchEvent(e);
	} else if(typeof(document.createEventObject) != 'undefined') {
	    try {
	        e = document.createEventObject();
	        targetElem.fireEvent('on' + type.toLowerCase(), e);
	    } catch(err){ }
	}
};

SELECT.UTILS.isTouchDevice = function() {
    return (document.documentElement['ontouchstart'] === undefined) ? false : true;
};

SELECT.UTILS.isDescendant = function(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent)
             return true;
        node = node.parentNode;
    }
    return false;
}

SELECT.UTILS.isEmpty = function(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};

SELECT.UTILS.getElementPosition = function(element) {
    var rect = element.getBoundingClientRect();
    var elementLeft,elementTop; //x and y
    var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
    elementTop = rect.top+scrollTop;
    elementLeft = rect.left+scrollLeft;
    return {top: elementTop, left: elementLeft}
}

SELECT.UTILS.extractDelta = function(e) {
    if (e.wheelDelta) {
        return e.wheelDelta;
    }
    if (e.detail)
    	return -e.detail * 40;
    if (e.originalEvent !== undefined) {
	    if (e.originalEvent.detail) {
	        return e.originalEvent.detail * -40;
	    }

	    if (e.originalEvent && e.originalEvent.wheelDelta) {
	        return e.originalEvent.wheelDelta;
	    }
	}
	return 0;
};

//removes elements and its childrens references
SELECT.UTILS.purge = function(elem) {
    if (elem == undefined || elem == null)
        return;
    var a = elem.attributes, i, l, n;
    if (a) {
        for (i = a.length - 1; i >= 0; i -= 1) {
            n = a[i].name;
            if (typeof elem[n] === 'function') {
                elem[n] = null;
            }
        }
    }
    a = elem.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            this.purge(elem.childNodes[i]);
        }
    }
};}(jQuery || {}));
