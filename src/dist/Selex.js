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
	var SELEX = {};
	SELEX.CONFIG = {};
	SELEX.UTILS = {};
	SELEX.HELPERS = {};
	SELEX.SETTINGS = {};
	SELEX.ELEMENTS = {};
	SELEX.ELEMENTS.WIDGET = {};
	SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.OPTIONS_MENU = {};
	SELEX.ELEMENTS.WIDGET.LOADING_OVERLAY = {};
	SELEX.EXCEPTIONS = {};
	var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver;
	var ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT = "select";

	Selex = function(userDefinedSettings) {

		var Facade = new SELEX.Facade();
		var that = this;
		init();

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELEX.EXCEPTIONS.InvalidOptionsErrorException();
			Facade.subscribe("UserDefinedSettings", userDefinedSettings);
			Facade.subscribe("Wrapper", new SELEX.ELEMENTS.Wrapper(Facade));
		}

		this.attach = function() {
			Facade.publish("Wrapper").render();
			return this;
		}

		this.hide = function() {
			Facade.publish("Wrapper").hide();
			return this;
		}

		this.show = function() {
			Facade.publish("Wrapper").show();
			return this;
		}

		this.detach = function() {
			Facade.publish("Wrapper").detach();
			return this;
		}

		this.disable = function() {
			Facade.publish("Wrapper").disable();
			return this;
		}

		this.enable = function() {
			Facade.publish("Wrapper").enable();
			return this;
		}

		this.toggleLoadingMode = function() {
			Facade.publish("Wrapper").toggleLoadingMode();
			return this;
		}
	}

SELEX.CONFIG.CONSTRUCTOR_PARAMS_URL = "https://github.com/janikoskela/Selex#constructor-parameters";SELEX.ELEMENTS.NativeSelectBox = function(Facade, targetElement) {
	var that = this;
	this.optionItems = [];
	this.observer;
	this.element = targetElement;

	this.attach = function() {
		this.optionItems = [];
		var optionsLength = this.element.options.length;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELEX.ELEMENTS.NativeSelectBoxItem(Facade, option);
			this.optionItems.push(optionItem);
		}
		if (MUTATION_OBSERVER !== undefined && this.observer === undefined)
			attachDomObserver();
		return this.element;
	}

	this.getTabIndex = function() {
		return this.element.getAttribute("tabindex");
	}

	this.getOptions = function() {
		return this.optionItems;
	}

	this.isDisabled = function() {
		return (this.element.getAttribute("disabled") === null) ? false : true;
	}

    this.enable = function() {
        this.element.removeAttribute("disabled");
    }

    this.disable = function() {
        this.element.setAttribute("disabled", true);
    }

	function attachDomObserver() {
    	that.observer = new MUTATION_OBSERVER(function(mutations, observer) {
    		mutations.forEach(function (mutation) {
    			var addedNodesLength = (mutation.addedNodes === undefined) ? 0 : mutation.addedNodes.length;
    			var removedNodesLength = (mutation.removedNodes === undefined) ? 0 : mutation.removedNodes.length;
    			if (addedNodesLength > 0 || removedNodesLength.length > 0) {
    				that.attach();
    				Facade.publish("OptionsMenuList").refresh();
    			}
      		});
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
		for (var i = 0; i < this.optionItems.length; i++) {
			if (this.optionItems[i].getValue() == value) {
				this.optionItems[i].setSelected();
			}
			else
				this.optionItems[i].removeSelected();
		}
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

	this.setSelectedIndex = function(index) {
		this.element.selectedIndex = index;
	}

	this.triggerChange = function() {
		this.clearSelected();
	    SELEX.UTILS.triggerEvent("change", this.element);
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
		var l = this.element.options.length;
		for (var i = 0; i < l; i++) {
			var option = this.element.options[i];
			var selected = (option.getAttribute("selected") === null) ? false : true;
			if (selected)
				return option;
		}
	}

	this.getElement = function() {
		return this.element;
	}

	this.hide = function() {
		this.element.hide();
	}

};SELEX.ELEMENTS.NativeSelectBoxItem = function(Facade, optionElement) {
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

	this.setSelected = function(e) {
		Facade.publish("NativeSelectBox").setSelectedIndex(this.element.index);
		Facade.publish("NativeSelectBox").triggerChange();
		this.element.setSelectedAttribute();
	}

	this.removeSelected = function() {
		this.element.removeAttribute("selected", "selected");
	}

	this.getImageUrl = function() {
		return this.element.getDataAttribute("image-url");
	}
};SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function(Facade) {

	this.type = "div";
	this.element;
	this.className = "arrow-container";

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.setClass(this.className);
		var arrowContainerContentInstance = Facade.subscribe("ArrowContainerContent", new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent(Facade));
		var elem = arrowContainerContentInstance.render();
		this.element.appendChild(elem);
		return this.element;
	}

	this.getElement = function() {
		return this.element;
	}

	this.getWidth = function() {
		return this.element.offsetWidth;
	}
};SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent = function(Facade) {

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
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu = function(Facade) {
	var that = this;
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-container";
	this.element;
	this.width = userDefinedSettings.optionsMenuWidth;
	this.height = undefined;
	this.locked = false;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	var optionsMenuList = Facade.subscribe("OptionsMenuList", new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList(Facade));
    	var optionsMenuListElem = optionsMenuList.render();
        if (this.useSearchInput === true) {
        	var optionsMenuSearchWrapper = Facade.subscribe("OptionsMenuSearchWrapper", new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper(Facade));
        	var optionsMenuSearchWrapperElem = optionsMenuSearchWrapper.render();
    		this.element.appendChild(optionsMenuSearchWrapperElem);
        }
    	this.element.appendChild(optionsMenuListElem);
    	if (this.width !== undefined)
			this.setWidth(this.width);
    	return this.element;
	}

	this.onNoOptionsFound = function() {
		Facade.publish("OptionsMenuList").hide();
		Facade.publish("OptionsMenuSearchWrapper").show();
	}

	this.onOptionsFound = function() {
		Facade.publish("OptionsMenuList").show();
		Facade.publish("OptionsMenuSearchWrapper").hide();
	}

	this.isLocked = function() {
		return this.locked;
	}

	this.disableLoadingMode = function() {
		this.locked = false;
	}

	this.enableLoadingMode = function() {
		this.hide();
		this.locked = true;
	}

	this.getElement = function() {
		return this.element;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.getWidth = function() {
		var width = this.element.offsetWidth;
		if (this.element.isHidden()) {
			this.element.show();
			width = this.element.offsetWidth;
			this.element.hide();
		}
		width += Facade.publish("ArrowContainer").getWidth();
		this.setWidth(width);
		return width;
	}

	this.setHeight = function(height) {
		this.height = height;
		this.element.setStyle("height", this.height);
	}

	this.hide = function() {
		Facade.publish("OptionsMenuSearchInput:clear");
		Facade.publish("OptionsMenuSearchNoResults:hide");
		this.element.hide();
		Facade.publish("ArrowContainerContent").down();
	}

	this.isHidden = function() {
		return this.element.isHidden();
	}

	this.show = function() {
		if (this.locked === true)
			return;
		this.element.show();
		this.element.removeClass("options-container-down");
		this.element.removeClass("options-container-up");
		var top = this.element.getStyle("top") || 0;
		this.element.removeStyle("top");
		var h = this.element.offsetHeight;
		var windowInnerHeight = window.innerHeight;
		var remainingWindowHeight = windowInnerHeight - this.element.getBoundingClientRect().top;
		this.element.hide();
		var widgetWrapper = Facade.publish("WidgetWrapper");
		if (remainingWindowHeight < h && widgetWrapper.getElement().getBoundingClientRect().top > h) {
			this.element.addClass("options-container-up");
			this.element.setStyle("top", h * -1);
		}
		else {
			this.element.addClass("options-container-down");
		}
		this.element.show();
		Facade.publish("ArrowContainerContent").up();
		if (this.useSearchInput === true)
			Facade.publish("OptionsMenuSearchInput").focus();
	}

	this.toggle = function() {
		if (this.element.isHidden())
			this.show();
		else
			this.hide();
	}
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem = function(Facade, nativeSelectOption, index) {
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
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemImage = function(Facade, imageUrl) {
	this.type = "img";
	this.imageUrl = imageUrl;
	this.element;

	this.render = function() {
    	this.element = new SELEX.UTILS.createElement(this.type);
    	this.element.setAttribute("src", this.imageUrl);
    	return this.element;
	}
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItemValue = function(Facade, option) {
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
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	var that = this;
	this.type = "ul";
	this.className = "options-container-list";
	this.element;
	this.width = "100%";
	this.height = undefined;
	this.optionItems = [];
	this.sortType = userDefinedSettings.sort;
	this.inputSearchEnabled = false;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.setWidth(this.width);
    	this.refresh();
		return this.element;
	}

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.show();
	}

	this.refresh = function() {
        var options = Facade.publish("NativeSelectBox").getOptions();
		switch(this.sortType) {
    		case "asc":
    			options.sort(sortByAsc);
    			break;
    		case "desc":
    			options.sort(sortByDesc);
    			break;
		}
		renderOptionItems(options);
		Facade.publish("ValueContainer").refresh();
	}

	function renderOptionItems(options) {
        that.optionItems = [];
        that.element.removeChildren();
        var l = options.length;
		for (var i = 0; i < l; i++) {
			var option = options[i];
			var item = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(Facade, option, i);
			that.optionItems.push(item);
			var elem = item.render();
			that.element.appendChild(elem);
		}
	}

    function sortByDesc(optionA, optionB) {
        var a = optionA.getText();
        var b = optionB.getText();
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    }

    function sortByAsc(optionA, optionB) {
        var a = optionA.getText();
        var b = optionB.getText();       
        if (a > b)
            return -1;
        if (a < b)
            return 1;
        return 0;
    }

    function getNextOption(option) {
    	var i = option.getIndex();
    	if (i < that.optionItems.length)
    		return that.optionItems[i + 1];
    	return that.optionItems[0];
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
    	var optionsMenu = Facade.publish("OptionsMenu");
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
		optionsMenu.getElement().scrollTop = option.getElement().offsetTop;
		if (optionsMenu.isHidden())
			option.onClick();
    }

    this.hoverNextOption = function() {
		var optionsMenu = Facade.publish("OptionsMenu");
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
		optionsMenu.getElement().scrollTop = option.getElement().offsetTop;
		if (optionsMenu.isHidden())
			option.onClick();
    }

    this.selectHoveredOption = function() {
		var optionsMenu = Facade.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
    	var hovered = this.getHoveredOption();
    	if (hovered !== undefined)
    		hovered.onClick();
    }

    function findOptionByFirstCharFromStart(firstChar) {
		var optionsMenu = Facade.publish("OptionsMenu");
    	var optionItemsCount = that.optionItems.length;
    	for (var i = 0; i < optionItemsCount; i++) {
			var itemText = that.optionItems[i].getText();
			if (firstChar === itemText[0].toLowerCase()) {
				that.optionItems[i].setHovered();
				if (optionsMenu.isHidden())
					that.optionItems[i].onClick();
				else
					optionsMenu.getElement().scrollTop = that.optionItems[i].getElement().offsetTop;
				return;
			}
		}
    }

    function isNextOptionFirstCharMatch(optionItem, firstChar) {
    	var optionsMenu = Facade.publish("OptionsMenu");
    	var text = optionItem.getText();
    	if (text[0].toLowerCase() === firstChar) {
    		that.clearOptionItemHovers();
    		optionItem.setHovered();
    		if (optionsMenu.isHidden())
    			optionItem.onClick();
    		else
				optionsMenu.getElement().scrollTop = optionItem.getElement().offsetTop;
			return true;
    	}
    	return false;
    }

    this.isInputSearchEnabled = function() {
    	return this.inputSearchEnabled;
    }

    this.searchByInputString = function(query) {
    	this.inputSearchEnabled = true;
    	this.element.removeChildren();
    	var l = this.optionItems.length;
    	var optionsMenu = Facade.publish("OptionsMenu");
    	var foundOptions = 0;
    	for (var i = 0; i < l; i++) {
    		var option = this.optionItems[i];
    		var optionText = option.getText().toLowerCase();
    		if (optionText.indexOf(query.toLowerCase()) > -1) {
    			this.element.appendChild(option.getElement());
    			foundOptions++;
    		}
    	}
    	if (foundOptions === 0)
    		optionsMenu.onNoOptionsFound();
    	else
    		optionsMenu.onOptionsFound();
    }

	this.searchByFirstChar = function(firstChar) {
    	var optionsMenu = Facade.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
		firstChar = firstChar.toLowerCase();
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

	this.hasChildren = function() {
		return (this.element.getChildren().length > 0);
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
		for (var i = 0; i < this.element.children.length; i++) {
			this.element.children[i].removeClass("hovered");
		}
	}

	this.clearSelected = function() {
		var l = this.optionItems.length;
		for (var i = 0; i < l; i++)
			this.optionItems[i].removeSelected();
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
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput = function(Facade) {
	this.type = "input";
	this.className = "options-menu-search-input";
	this.element;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.element.setAttribute("type", "search");
    	this.element.addEventListener("keyup", onKeyUp.bind(this));
    	this.element.addEventListener("click", onKeyUp.bind(this));
    	return this.element;
	}

	this.clear = function() {
		this.element.value = "";
		Facade.publish("OptionsMenuList").searchByInputString("");
	}

	this.focus = function() {
		this.element.focus();
	}

	function onKeyUp(e) {
		var optionsMenuList = Facade.publish("OptionsMenuList");
		var value = this.element.value;
		if (value.length === 0)
			optionsMenuList.clearSearchResult();
		if (this.value !== undefined) {
			if (value.length === this.value.length)
				return;
		}
		this.value = value;
		optionsMenuList.searchByInputString(value);
	}
};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-no-results";
	this.element;
	this.text = userDefinedSettings.noResultsMessage || "No results";

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	var textNode = document.createTextNode(this.text);
    	this.element.appendChild(textNode);
    	this.hide();
    	return this.element;
	}

	this.show = function() {
		this.element.show();
	}

	this.hide = function() {
		this.element.hide();
	}

};SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchWrapper = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "options-menu-search-wrapper";
	this.element;

	this.render = function() {
    	this.element = SELEX.UTILS.createElement(this.type, this.className);
    	var optionsMenuSearchInput = Facade.subscribe("OptionsMenuSearchInput", new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchInput(Facade));
    	var optionsMenuSearchInputElem = optionsMenuSearchInput.render();
    	this.element.appendChild(optionsMenuSearchInputElem);
    	
    	var optionsMenuSearchNoResults = Facade.subscribe("OptionsMenuSearchNoResults", new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuSearchNoResults(Facade));
    	this.element.appendChild(optionsMenuSearchNoResults.render());
    	return this.element;
	}

	this.setWidth = function(width) {
		this.element.setStyle("width", width);
		this.width = width;
	}

	this.clear = function() {
		Facade.publish("OptionsMenuSearchInput").clear();
		Facade.publish("OptionsMenuSearchNoResults").hide();
	}

};SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer = function(Facade) {
	var that = this;
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.type = "div";
	this.className = "value-container";
	this.element;
	this.loadingText = userDefinedSettings.loadingText || "Loading";

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);

        var valueContainerImage = Facade.subscribe("ValueContainerImage", new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage(Facade));
		var valueContainerImageElem = valueContainerImage.render();
		this.element.appendChild(valueContainerImageElem);
		var imageUrl = Facade.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (imageUrl === undefined || imageUrl === null)
			valueContainerImage.hide();
		else
			valueContainerImage.setImageUrl(imageUrl);

    	var valueContainerText = Facade.subscribe("ValueContainerText", new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText(Facade));
    	var valueContainerTextElem = valueContainerText.render();
    	this.element.appendChild(valueContainerTextElem);
		return this.element;
	}

	this.refresh = function() {
		Facade.publish("ValueContainerText").refresh();
		var imageUrl = Facade.publish("NativeSelectBox").getSelectedOptionImageUrl();
		if (imageUrl !== undefined && imageUrl !== null) {
			Facade.publish("ValueContainerImage").setImageUrl(imageUrl);
			Facade.publish("ValueContainerImage").show();
		}
		else
			Facade.publish("ValueContainerImage").hide();	
	}

	this.enableLoadingMode = function() {
		Facade.publish("ValueContainerText").setText(this.loadingText);
		if (this.timeInterval === undefined)
			enableDotDotDotInterval();
	}

	function enableDotDotDotInterval() {
		var dots = ".";
		that.timeInterval = setInterval(function() {
			if (dots.length === 3)
				dots = ".";
			else
				dots += ".";
			Facade.publish("ValueContainerText").setText(that.loadingText + dots);
		}, 500);
	}

	this.disableLoadingMode = function() {
		clearInterval(this.timeInterval);
		Facade.publish("ValueContainerText").refresh();
	}
};SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerImage = function(Facade) {
	this.type = "img";
	this.imageUrl;
	this.element;

	this.render = function() {
		this.element = SELEX.UTILS.createElement(this.type);
		return this.element;
	}

	this.setImageUrl = function(imageUrl) {
		this.imageUrl = imageUrl;
		this.element.setAttribute("src", this.imageUrl);
	}

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.setStyle("display", "inline-block");
	}
};SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainerText = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	var that = this;
	this.type = "span";
	this.className = "value-container-text";
	this.element;
	this.placeholder = userDefinedSettings.placeholder;

	this.render = function() {
		this.element = SELEX.UTILS.createElement(this.type, this.className);
		this.refresh();
		return this.element;
	}

	this.refresh = function() {
		var text = Facade.publish("NativeSelectBox").getSelectedOptionText();
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
};SELEX.ELEMENTS.WIDGET.SubWrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = userDefinedSettings.orientation || "right";

    this.element;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        this.element.addEventListener("click", onClick.bind(this));

        var arrowContainer = Facade.subscribe("ArrowContainer", new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(Facade));
        var arrowContainerElem = arrowContainer.render();

        var valueContainer = Facade.subscribe("ValueContainer", new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(Facade));
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
    
    this.enableLoadingMode = function() {
        Facade.publish("ValueContainer").enableLoadingMode();
    }

    this.disableLoadingMode = function() {
        Facade.publish("ValueContainer").disableLoadingMode();
    }

    function onClick(e) {
        var nativeSelectBox = Facade.publish("NativeSelectBox");
        if (nativeSelectBox.isDisabled() === false)
            Facade.publish("OptionsMenu").toggle();
    }

};SELEX.ELEMENTS.WIDGET.Wrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex;

    this.tabIndex = Facade.publish("NativeSelectBox").getTabIndex() || 0;

    this.closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut || true;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        this.element.setAttribute("tabindex", this.tabIndex);
        if (userDefinedSettings.closeWhenCursorOut === true)
            this.element.addEventListener("mouseleave", onMouseLeave.bind(this));
        document.addEventListener("click", onMouseLeave.bind(this));
        this.element.addEventListener("click", function(e) {
            e.stopPropagation();
        });
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));

        var widgetSubWrapper = Facade.subscribe("WidgetSubWrapper", new SELEX.ELEMENTS.WIDGET.SubWrapper(Facade));
        var widgetSubWrapperElem = widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);

        var optionsMenu = Facade.subscribe("OptionsMenu", new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(Facade));
        var optionsMenuElem = optionsMenu.render();
        this.element.appendChild(optionsMenuElem);

        return this.element;
    }

    this.getElement = function() {
        return this.element;
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
                Facade.publish("OptionsMenuList").hoverPreviousOption();
                break;
            case KEY_CODES.DOWN:
                Facade.publish("OptionsMenuList").hoverNextOption();
                break;
            case KEY_CODES.ENTER:
                Facade.publish("OptionsMenuList").selectHoveredOption();
                break;
            default:
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                Facade.publish("OptionsMenuList").searchByFirstChar(firstChar);
        }
    }

    function onMouseLeave(e) {
        Facade.publish("OptionsMenu").hide();
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

};SELEX.ELEMENTS.Wrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    var that = this;

    this.type = "div";

    this.className = userDefinedSettings.theme || "plain";

    this.width = userDefinedSettings.width;

    this.widgetWrapper;

    this.element;

    this.targetElement = userDefinedSettings.targetElement;

    this.loadingMode = false;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        var tagName = this.targetElement.tagName.toLowerCase();
        switch(tagName) {
            case ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT:
                var nativeSelectBox = Facade.subscribe("NativeSelectBox", new SELEX.ELEMENTS.NativeSelectBox(Facade, this.targetElement));
                nativeSelectBox.attach();
                if (nativeSelectBox.isDisabled())
                    this.disable();
                var parentsParent = this.targetElement.parentNode;
                parentsParent.insertBefore(this.element, this.targetElement);
                this.element.appendChild(this.targetElement);
                this.targetElement.hide();
                break;
            default:
                throw new SELEX.EXCEPTIONS.InvalidTargetElementErrorException();
        }
        renderWidget();
        if (this.width !== undefined) {
            this.setWidth(this.width);
            if (userDefinedSettings.optionMenuWidth === undefined)
                Facade.publish("OptionsMenu").setWidth(this.width);
        }
        else {
            var width = Facade.publish("OptionsMenu").getWidth();
            this.setWidth(width);
        }
        return this.element;
    }

    function renderWidget() {
        var widgetWrapperInstance = Facade.subscribe("WidgetWrapper", new SELEX.ELEMENTS.WIDGET.Wrapper(Facade));
        var widgetWrapperElem = widgetWrapperInstance.render();
        that.element.appendChild(widgetWrapperElem);
        Facade.publish("OptionsMenu").hide();
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

    this.enableLoadingMode = function() {
        this.loadingMode = true;
        Facade.publish("OptionsMenu").enableLoadingMode();
        Facade.publish("WidgetSubWrapper").enableLoadingMode();
    }

    this.disableLoadingMode = function() {
        this.loadingMode = false;
        Facade.publish("OptionsMenu").disableLoadingMode();
        Facade.publish("WidgetWrapper").disableLoadingMode();
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

    this.detach = function() {
        var parent = this.element.parentNode;
        this.targetElement.show();
        parent.insertBefore(this.targetElement, this.element);
        this.element.remove();
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
};SELEX.EXCEPTIONS.InvalidTargetElementErrorException = function() {
	return {
		name:        "Invalid target element", 
	    level:       "Show Stopper", 
	    message:     "targetElement should be <select> or <input type='select'>",  
	    htmlMessage: "Error detected",
	    toString:    function(){return this.name + ": " + this.message;} 
	}
};SELEX.Facade = function() {
	this.subscribe = function(name, instance) {
		this[name] = instance;
		return instance;
	}

	this.publish = function(name, args) {
		var parts = name.split(":");
		if (parts.length > 1) {
			var instance = this[parts[0]];
			if (instance !== undefined) {
				var func = instance[parts[1]];
				return func(args);
			}
		}
		return this[name];
	}
};SELEX.HELPERS.getOptionByValue = function(options, value) {
	for (var i = 0; i < options.length; i++) {
		var option = options[i];
		if (option.value == value)
			return option;
	}
};Object.prototype.setStyle = function(name, value) {
  if (typeof value === "number") {
    value += "px";
  }
  this.style[name] = value;
};

Object.prototype.removeChildren = function() {
  this.innerHTML = "";
};

Object.prototype.getChildren = function() {
  return this.childNodes;
};

Object.prototype.setSelectedAttribute = function() {
  this.setAttribute("selected", true);
};

Object.prototype.removeStyle = function(name) {
  this.style[name] = null;
};

Object.prototype.remove = function() {
  var parent = this.parentNode;
  parent.removeChild(this);
};

Object.prototype.getStyle = function(name) {
  return this.style[name];
};

Object.prototype.hasClass = function(name) {
  var result = this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  if (result === null)
    return false;
  return result;
};

Object.prototype.addClass = function(name) {
  if (this.hasClass(name) === false)
   this.className += " " + name;
};

Object.prototype.clearClasses = function() {
  this.className = "";
};

Object.prototype.setDataAttribute = function(name, value) {
  this.setAttribute("data-" + name, value);
};

Object.prototype.getDataAttribute = function(name) {
  return this.getAttribute("data-" + name);
};

Object.prototype.removeDataAttribute = function(name) {
  this.removeAttribute("data-" + name);
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
};

SELEX.UTILS.isElement = function(o) {
	//Returns true if it is a DOM element    
  	return (
    	typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2 
    	o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
};

SELEX.UTILS.triggerEvent = function(type, targetElem) {
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
};}(jQuery));
