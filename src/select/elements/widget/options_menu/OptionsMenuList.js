SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList = function(Facade) {
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
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
       	that.optionGroups = {};
       	that.element.removeChildren();
        var l = options.length;
		for (var i = 0; i < l; i++) {
			var option = options[i];
			var item = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(Facade, option, i);
			that.optionItems.push(item);
			var elem = item.render();
			var optionGroup = option.getOptionGroup();
			if (optionGroup !== undefined) {
				var optionGroupLabel = optionGroup.label;
				if (that.optionGroups[optionGroupLabel] === undefined) {
					that.optionGroups[optionGroupLabel] = new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuListItemGroup(Facade, optionGroup);
		    		var li = that.optionGroups[optionGroupLabel].render();
		    		that.element.appendChild(li);
				}
				that.optionGroups[optionGroupLabel].getList().getElement().appendChild(elem);
			}
			else
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
		Facade.publish("WidgetWrapper:focus");
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
		if (optionsMenu.isHidden()) {
			option.setSelected();
		}
		else {
			this.element.scrollTop = option.getElement().offsetTop - Facade.publish("OptionsMenuSearchWrapper:getHeight");
		}
    }

    this.selectHoveredOption = function() {
		var optionsMenu = Facade.publish("OptionsMenu");
		if (optionsMenu.isLocked())
			return;
    	var hovered = this.getHoveredOption();
    	if (hovered !== undefined)
    		hovered.setSelected();
		Facade.publish("OptionsMenu:hide");
    }

    function findOptionByFirstCharFromStart(firstChar) {
		var optionsMenu = Facade.publish("OptionsMenu");
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
    	var optionsMenu = Facade.publish("OptionsMenu");
    	var text = optionItem.getText();
    	if (text[0].toLowerCase() === firstChar) {
    		that.clearOptionItemHovers();
    		optionItem.setHovered();
    		if (optionsMenu.isHidden())
    			optionItem.setSelected();
    		else
				that.element.scrollTop = optionItem.getElement().offsetTop - Facade.publish("OptionsMenuSearchWrapper:getHeight");
			return true;
    	}
    	return false;
    }

    this.isInputSearchEnabled = function() {
    	return this.inputSearchEnabled;
    }

    this.searchByInputString = function(query) {
    	this.inputSearchEnabled = true;
    	var options = Facade.publish("NativeSelectBox:getOptions");
    	var l = options.length;
    	var optionsMenu = Facade.publish("OptionsMenu");
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
    	var optionsMenu = Facade.publish("OptionsMenu");
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

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);