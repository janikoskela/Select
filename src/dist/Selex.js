(function () {

	var SEARCH_MODES = {};
	SEARCH_MODES.BY_FIRST_KEY = "firstKey";
	var KEY_CODES = {};
	KEY_CODES.UP = 38;
	KEY_CODES.DOWN = 40;
	KEY_CODES.ENTER = 13;
	var SORT_TYPES = {};
	SORT_TYPES.ASC = "asc";
	SORT_TYPES.DESC = "desc";
	var SELEX = {};
	SELEX.CONFIG = {};
	SELEX.UTILS = {};
	SELEX.HELPERS = {};
	SELEX.SETTINGS = {};
	SELEX.MEDIATOR = {};
	SELEX.ELEMENTS = {};
	SELEX.ELEMENTS.WIDGET = {};
	SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.OPTIONS_MENU = {};
	SELEX.EXCEPTIONS = {};

	Selex = function(userDefinedSettings) {

		this.wrapper;

		init(userDefinedSettings);

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELEX.EXCEPTIONS.InvalidOptionsErrorException();
			this.wrapper = new SELEX.ELEMENTS.Wrapper(userDefinedSettings);
			this.wrapper.render();
		}

		this.render = function() {
		}

		this.hide = function() {
		}

		this.show = function() {
		}

		this.getSelectedText = function() {
		}

		this.getSelectedValue = function() {
		}

		this.disable = function() {

		}

		this.enable = function() {

		}

		this.setOptions = function(options) {

		}

	}

SELEX.CONFIG.CONSTRUCTOR_PARAMS_URL = "https://github.com/janikoskela/Selex#constructor-parameters";SELEX.ELEMENTS.NativeSelectBox = function(params) {

	this.type = "select";
	this.width = params.width;
	this.changeCallback = params.changeCallback;
	this.element;
	this.tabIndex = params.tabIndex || 0;
	this.fontSize;
	this.placeholder = params.placeholder;
	this.options = params.options || [];
	this.optionItems = [];

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.onchange = this.onOptionChange;
		this.renderOptions(this.options);
		return this.element;
	}

	this.renderOptions = function(options) {
		for (var i = 0; i < options.length; i++) {
			var option = options[i];
			var value = option.value;
			var text = option.text;
			var optionItem = new SELEX.ELEMENTS.NativeSelectBoxItem(value, text);
			this.optionItems.push(optionItem);
			var elem = optionItem.render();
			this.element.appendChild(elem);
		}
	}

	this.setFontSize = function(fontSize) {
		this.fontSize = fontSize;
		this.element.setStyle("font-size", this.fontSize);
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		var placeholderInstance = new SELEX.ELEMENTS.NativeSelectBoxItem();
		var elem = placeholderInstance.render();
		placeholderInstance.setText(placeholder);
		elem.setAttribute("data-selected", true);
		elem.setAttribute("data-disabled", true);
		this.element.appendChild(elem);
	}

	this.enable = function() {
		this.element.removeAttribute("data-disabled");
	}

	this.disable = function() {
		this.element.setAttribute("data-disabled", true);
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

};SELEX.ELEMENTS.NativeSelectBoxItem = function(value, text) {
	this.element;
	this.type = "option";
	this.value = value;
	this.text = text;

	this.render = function() {
		this.element = document.createElement("option");
		if (this.text !== undefined)
			this.element.innerHTML = this.text;
		if (this.value !== undefined)
			this.element.setAttribute("data-value", this.value);
		return this.element;
	}

	this.setValue = function(value) {
		this.value = value;
		this.element.setAttribute("data-value", this.value);
	}

	this.setText = function(text) {
		this.text = text;
		this.element.innerHTML = this.text;
	}
};SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function(params) {

	this.type = "div";
	this.element;
	this.className = "arrow-container";

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.setClass(this.className);

		this.arrowContainerContent = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent(params);
		var elem = this.arrowContainerContent.render();

		this.element.appendChild(elem);
		return this.element;
	}

	this.getElement = function() {
		return this.element;
	}
};SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent = function() {

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
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(params, widgetWrapper) {
	var that = this;
	this.type = "div";
	this.className = "options-container";
	this.element;
	this.width = params.optionsMenuWidth || "100%";
	this.height = undefined;
	this.widgetWrapper = widgetWrapper;
	this.optionsMenuList;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.optionsMenuList = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(params, widgetWrapper, this);
    	var optionsMenuListElem = this.optionsMenuList.render();
    	this.element.appendChild(optionsMenuListElem);
    	this.setWidth(this.width);
    	return this.element;
	}

	this.getOptionsMenuList = function() {
		return this.optionsMenuList;
	}

	this.getWidgetWrapper = function() {
		return this.widgetWrapper;
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

	this.hide = function() {
		this.element.hide();
	}

	this.isHidden = function() {
		return this.element.isHidden();
	}

	this.show = function() {
		this.element.show();
	}

	this.toggle = function() {
		if (this.element.isHidden())
			this.show();
		else
			this.hide();
	}
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(value, text, index, optionsMenuList, onClickCallback, optionsMenu) {
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

	this.render = function() {
		this.itemValue = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue(this.text);
		var childElem = this.itemValue.render();
    	this.element = SELEX.UTILS.createElement(this.type);
    	this.element.addEventListener("click", onClick.bind(this));
    	this.element.addEventListener("mouseover", onMouseOver.bind(this));
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.appendChild(childElem);
    	this.element.setAttribute("data-index", this.index);
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

	function onClick(e) {
		if (typeof that.onClickCallback === "function")
			that.onClickCallback(that.value, that.text);
		that.optionsMenu.hide();
		var valueContainerText = that.optionsMenu.getWidgetWrapper().getWidgetSubWrapper().getValueContainer().getValueContainerText();
		var previosulySelected = that.optionsMenuList.getSelectedOption();
		if (previosulySelected !== undefined)
			previosulySelected.getElement().removeClass("selected");
		that.setSelected();
		valueContainerText.setText(that.text);
		valueContainerText.setValue(that.value);
	}
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue = function(text) {
	this.text = text;
	this.type = "span";
	this.element;
	this.textNode;

	this.render = function() {
    	this.element = document.createElement(this.type);
    	this.textNode = document.createTextNode(this.text);
    	this.element.appendChild(this.textNode);
    	return this.element;
	}
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList = function(params, widgetWrapper, optionsMenu) {
	var that = this;
	this.type = "ul";
	this.className = "options-container-list";
	this.element;
	this.width = "100%";
	this.height = undefined;
	this.optionLimit = params.optionLimit;
	this.options = params.options || [];
	this.optionItems = [];
	this.widgetWrapper = widgetWrapper;
	this.sortType = params.sort;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	switch(this.sortType) {
    		case "asc":
    			this.options.sort(sortByAsc);
    			break;
    		case "desc":
    			this.options.sort(sortByDesc);
    			break;
    	}
    	this.setWidth(this.width);
    	renderOptionItems(this.options);
		return this.element;
	}

	this.adjustHeight = function() {
		var children = that.element.children;
        if (children.length === 0)
            return;
        if (children.length > 0) {        
         	var h = children[0].offsetHeight;
            if (that.optionLimit === undefined || children.length < that.optionLimit)
                h *= children.length;
            else
                h *= that.optionLimit;
            //h++; //so that element does not become scrollable in cas
            h += "px";
            if (that.optionLimit !== undefined)
                that.setHeight(h);
        }
	}

	function renderOptionItems(options) {
		for (var i = 0; i < options.length; i++) {
			var option = options[i];
			var optionValue = option.value;
			var optionText = option.text;
			var item = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(optionValue, optionText, i, that, params.onOptionChange, optionsMenu);
			that.optionItems.push(item);
			var elem = item.render();
			that.element.appendChild(elem);
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

	this.searchByFirstChar = function(firstChar) {
		var listElements = this.element.children;
		var hovered = this.getHoveredOption();
		if (hovered === undefined) {
			for (var i = 0; i < this.optionItems.length; i++) {
				var item = this.optionItems[i];
				var itemText = item.getText();
				if (itemText[0] === firstChar) {
					this.clearOptionItemHovers();
					item.setHovered();
					if (this.isHidden())
						item.onClick();
					else
						item.getElement().scrollTop = item.offsetTop;
				}
			}
		}
		else {
			var hoveredElem = hovered.getElement();
			var hoveredIndex = this.optionItems.indexOf(hovered);
			var counter = 0;
			var nextSibling = getNext(hovered);//hoveredElem.nextSibling;
			while (counter < this.optionItems.length) {
				var nextSiblingText = nextSibling.getText();
				if (nextSiblingText[0] === firstChar) {
					this.clearOptionItemHovers();
					nextSibling.setHovered();
					return;
				}
				counter++;
				nextSibling = getNext(nextSibling);
			}
			/*var hoveredElem = hovered.getElement();
			var counter = 0;
			var nextSibling = hovered.nextSibling;
			while (counter < listElements.length) {
				if (nextSibling === null || nextSibling === undefined)
					nextSibling = listElements[0];
				var nextSiblingText = nextSibling.children[0].innerHTML.toLowerCase();
				if (nextSiblingText[0] === firstChar) {
					this.clearOptionItemHovers();
					this.optionsMenu.setChildHovered(nextSibling);
					if (this.optionsMenu.isClosed())
						this.onOptionItemClick(nextSibling);
					else
						this.element.scrollTop = nextSibling.offsetTop;
					return;
				}
				nextSibling = nextSibling.nextSibling;
				counter++;
			}*/
		}
	}

	function getNext(currentOptionItem) {
		for (var i = 0; i < that.optionItems.length; i++) {
			var optionItem = that.optionItems[i];
			if (optionItem.getValue() === currentOptionItem.getValue() && optionItem.getText() === currentOptionItem.getText()) {
				if (i === that.optionItems.length + 1)
					return optionItems[0];
				return that.optionItems[i + 1];
			}2

		}
	}

	this.hasChildren = function() {
		return (this.element.children > 0);
	}

	this.getListElements = function() {
		return this.element.childNodes;
	}

	this.getHoveredOption = function() {
		for (var i = 0; i < this.optionItems.length; i++) {
			var item = this.optionItems[i];
			if (item.isHovered())
				return item;
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
		for (var i = 0; i < this.element.children.length; i++) {
			this.element.children[i].removeClass("hovered");
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

};SELEX.ELEMENTS.WIDGET.SubWrapper = function(params, widgetWrapper) {

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = params.orientation || "right";

    this.element;

    this.arrowContainer;

    this.valueContainer;

    this.widgetWrapper = widgetWrapper;

    this.optionsMenu;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
        this.element.setClass(this.className);
        this.element.addEventListener("click", onClick.bind(this));

        this.arrowContainer = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(params);
        var arrowContainerElem = this.arrowContainer.render();

        this.valueContainer = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(params);
        var valueContainerElem = this.valueContainer.render();


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

    this.getValueContainer = function() {
        return this.valueContainer;
    }

    function onClick(e) {
        this.optionsMenu = this.widgetWrapper.getOptionsMenu();
        this.optionsMenu.toggle();
    }

};SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(params) {

	this.type = "div";
	this.className = "value-container";
	this.element;
	this.valueContainerText;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
    	this.element.setClass(this.className);

    	this.valueContainerText = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(params);
    	var valueContainerTextElem = this.valueContainerText.render();

    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.getValueContainerText = function() {
		return this.valueContainerText;
	}
};SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(params) {

	this.value;
	this.text;
	this.type = "span";
	this.className = "value-container-text";
	this.element;
	this.placeholder;
	this.defaultValue = params.defaultValue;
	this.placeholder = params.placeholder;

	this.render = function() {
		this.element = document.createElement(this.type);
    	this.element.setClass(this.className);
    	this.element.innerHTML = this.text;
    	this.element.setAttribute("data-value", this.value);
    	if (this.defaultValue !== undefined) {
    		var option = SELEX.HELPERS.getOptionByValue(params.options, this.defaultValue);
    		if (option !== undefined) {
    			this.setValue(option.value);
    			this.setText(option.text);
    		}
    	}
    	else if (this.placeholder !== undefined) {
    		this.setPlaceholder(this.placeholder);
    	}
    	else if (params.options.length > 0) {
    		var firstOption = params.options[0];
    		this.setValue(firstOption.value);
    		this.setText(firstOption.text);
    	}

		return this.element;
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		this.element.innerHTML = this.placeholder;
	}

	this.setValue = function(value) {
		this.value = value;
		this.element.setAttribute("data-value", value);
	}

	this.setText = function(text) {
		this.text = text;
		this.element.innerHTML = text;
	}
};SELEX.ELEMENTS.WIDGET.Wrapper = function(params, wrapper) {

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex = params.tabIndex;

    this.widgetSubWrapper;

    this.optionsMenu;

    this.wrapper = wrapper;

    this.closeWhenCursorOut = params.closeWhenCursorOut || true;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        if (this.tabIndex !== undefined)
            this.element.setAttribute("tabindex", this.tabIndex);
        if (this.closeWhenCursorOut) {
            this.element.addEventListener("mouseleave", onMouseLeave.bind(this));
            this.element.addEventListener("blur", onMouseLeave.bind(this));
        }
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));

        this.widgetSubWrapper = new SELEX.ELEMENTS.WIDGET.SubWrapper(params, this);
        var widgetSubWrapperElem = this.widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);


        this.optionsMenu = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(params, this);
        var optionsMenuElem = this.optionsMenu.render();
        this.element.appendChild(optionsMenuElem);

        return this.element;
    }

    this.getWidgetSubWrapper = function() {
        return this.widgetSubWrapper;
    }

    this.getOptionsMenu = function() {
        return this.optionsMenu;
    }

    this.getClass = function() {
        return this.className;
    }

    function onKeyDown(e) {
        switch(e.keyCode) {
            case KEY_CODES.UP:
            case KEY_CODES.DOWN:
                e.preventDefault();
                break;
        }
        return false;
    }

    function onKeyUp(e) {
        switch(e.keyCode) {
            case KEY_CODES.UP:
                if (typeof this.onKeyUpCallback === "function")
                    this.onKeyUpCallback(e);
                break;
            case KEY_CODES.DOWN:
                if (typeof this.onKeyDownCallback === "function")
                    this.onKeyDownCallback(e);
                break;
            case KEY_CODES.ENTER:
                if (typeof this.onKeyEnterCallback === "function")
                    this.onKeyEnterCallback(e);
                break;
            default:
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                this.optionsMenu.searchByFirstChar(firstChar);
        }
    }

    function onMouseLeave(e) {
        this.optionsMenu.hide();
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

};SELEX.ELEMENTS.Wrapper = function(params) {

    var that = this;

    this.type = "div";

    this.className = params.theme;

    this.fontSize = params.fontSize;

    this.fontFamily = params.fontFamily;

    this.width = params.width || "100%";

    this.renderNativeSelectBox = params.renderNativeSelectBox || false;

    this.displayNativeSelectBox = params.displayNativeSelectBox || false;

    this.widgetWrapper;

    this.element;

    this.parentElement = params.targetElement;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
        this.element.setClass(this.className);
        this.setWidth(this.width);
        if (this.fontSize !== undefined)
            this.element.setStyle("fontSize", this.fontSize);
        if (this.fontFamily !== undefined)
            this.element.setStyle("fontFamily", this.fontFamily);
        this.parentElement.appendChild(this.element);

        if (this.renderNativeSelectBox === true) {
            this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(params);
            var nativeSelectBoxElem = this.nativeSelectBox.render();
            this.element.appendChild(nativeSelectBoxElem);
            if (this.displayNativeSelectBox === false) {
                this.nativeSelectBox.hide();
                renderWidget();
            }
        }
        else {
            renderWidget();
        }

        return this.element;
    }

    function renderWidget() {
        that.widgetWrapper = new SELEX.ELEMENTS.WIDGET.Wrapper(params);
        var widgetWrapperElem = that.widgetWrapper.render();
        that.element.appendChild(widgetWrapperElem);
        that.widgetWrapper.getOptionsMenu().getOptionsMenuList().adjustHeight();
        that.widgetWrapper.getOptionsMenu().hide();
    }

    this.show = function() {
        this.element.show();
    }

    this.hide = function() {
        this.element.hide();
    }

    this.enable = function() {
        this.element.removeAttribute("data-disabled");
    }

    this.disable = function() {
        this.element.setAttribute("data-disabled", true);
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }
};
SELEX.EXCEPTIONS.InvalidOptionsErrorException = function() {
	return {
		name:        "Invalid options object", 
	    level:       "Show Stopper", 
	    message:     "options should be in object form with required key-value pairs. See the required key-value pairs from " + SELEX.CONFIG.CONSTRUCTOR_PARAMS_URL,  
	    htmlMessage: "Error detected",
	    toString:    function(){return this.name + ": " + this.message;} 
	}
};SELEX.HELPERS.getOptionByValue = function(options, value) {
	for (var i = 0; i < options.length; i++) {
		var option = options[i];
		if (option.value == value)
			return option;
	}
};Object.prototype.setStyle = function(name, value) {
	this.style[name] = value;
};

Object.prototype.addClass = function(name) {
	this.className += " " + name;
};

Object.prototype.clearClasses = function() {
	this.className = "";
};

Object.prototype.hasClass = function(name) {
	return this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
};

Object.prototype.isHidden = function() {
	return (this.style.display === "none") ? true : false;
};

Object.prototype.show = function() {
	this.style.display = "block";
};

Object.prototype.hide = function() {
	this.style.display = "none";
};

Object.prototype.empty = function() {
	this.innerHTML = "";
};

Object.prototype.setClass = function(name) {
	this.className = name;
};

Object.prototype.clone = function() {
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

Object.prototype.removeClass = function(className) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== className) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName;
};SELEX.UTILS.createElement = function(type, classes) {
	var elem = document.createElement(type);
	if (typeof classes === "string")
		elem.setClass(classes);
	return elem;
}
}());
