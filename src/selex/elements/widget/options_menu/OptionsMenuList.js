SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList = function(userDefinedSettings, optionsMenu) {
	var that = this;
	this.type = "ul";
	this.className = "options-container-list";
	this.element;
	this.width = "100%";
	this.height = undefined;
	this.optionLimit = userDefinedSettings.optionLimit;
	this.optionItems = [];
	this.sortType = userDefinedSettings.sort;
	this.optionsMenu = optionsMenu;
	this.nativeSelect = this.optionsMenu.getWidgetWrapper().getWrapper().getNativeSelect();
	this.valueContainer = this.optionsMenu.getWidgetWrapper().getWidgetSubWrapper().getValueContainer();
	this.valueContainerText = this.valueContainer.getValueContainerText();
	this.inputSearchEnabled = false;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.setWidth(this.width);
    	this.refresh();
		return this.element;
	}

	this.refresh = function() {
        var options = this.nativeSelect.getOptions();
		switch(this.sortType) {
    		case "asc":
    			options.sort(sortByAsc);
    			break;
    		case "desc":
    			options.sort(sortByDesc);
    			break;
		}
		renderOptionItems(options);
		this.valueContainer.refresh();
	}

	this.getOptionsMenu = function() {
		return this.optionsMenu;
	}

	function renderOptionItems(options) {
        that.optionItems = [];
        that.element.removeChildren();
        var l = options.length;
		for (var i = 0; i < l; i++) {
			var option = options[i];
			var item = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(option, that, i);
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
		if (this.optionsMenu.isLocked())
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
		this.optionsMenu.getElement().scrollTop = option.getElement().offsetTop;
		if (this.optionsMenu.isHidden())
			option.onClick();
    }

    this.hoverNextOption = function() {
		if (this.optionsMenu.isLocked())
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
		this.optionsMenu.getElement().scrollTop = option.getElement().offsetTop;
		if (this.optionsMenu.isHidden())
			option.onClick();
    }

    this.selectHoveredOption = function() {
		if (this.optionsMenu.isLocked())
			return;
    	var hovered = this.getHoveredOption();
    	if (hovered !== undefined)
    		hovered.onClick();
    }

    function findOptionByFirstCharFromStart(firstChar) {
    	var optionItemsCount = that.optionItems.length;
    	for (var i = 0; i < optionItemsCount; i++) {
			var itemText = that.optionItems[i].getText();
			if (firstChar === itemText[0].toLowerCase()) {
				that.optionItems[i].setHovered();
				if (that.optionsMenu.isHidden())
					that.optionItems[i].onClick();
				else
					that.optionsMenu.getElement().scrollTop = that.optionItems[i].getElement().offsetTop;
				return;
			}
		}
    }

    function isNextOptionFirstCharMatch(optionItem, firstChar) {
    	var text = optionItem.getText();
    	if (text[0].toLowerCase() === firstChar) {
    		that.clearOptionItemHovers();
    		optionItem.setHovered();
    		if (that.optionsMenu.isHidden())
    			optionItem.onClick();
    		else
				that.optionsMenu.getElement().scrollTop = optionItem.getElement().offsetTop;
			return true;
    	}
    	return false;
    }

    this.clearSearchResult = function() {
    	this.refresh();
    	this.optionsMenu.getOptionsMenuSearchWrapper().clear();
    }

    this.isInputSearchEnabled = function() {
    	return this.inputSearchEnabled;
    }

    this.searchByInputString = function(query) {
    	this.inputSearchEnabled = true;
    	this.element.removeChildren();
    	var l = this.optionItems.length;
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
    		this.optionsMenu.onNoOptionsFound();
    	else
    		this.optionsMenu.onOptionsFound();
    	//this.adjustHeight();
    }

	this.searchByFirstChar = function(firstChar) {
		if (this.optionsMenu.isLocked())
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
};