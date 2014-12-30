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

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
    	this.setWidth(this.width);
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
		return this.element;
	}

	this.getOptionsMenu = function() {
		return this.optionsMenu;
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
			renderOptionItem(option, i);
		}
	}

	function renderOptionItem(option, i) {
		var item = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(option, that, i);
		that.optionItems.push(item);
		var elem = item.render();
		that.element.appendChild(elem);
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
    	var hovered = this.getHoveredOption();
    	if (hovered !== undefined)
    		hovered.onClick();
    }

    function findOptionByFirstCharFromStart(firstChar) {
    	var optionItemsCount = that.optionItems.length;
    	for (var i = 0; i < optionItemsCount; i++) {
			var itemText = that.optionItems[i].getText()
			if (firstChar === itemText[0]) {
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
    	if (text[0] === firstChar) {
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

	this.searchByFirstChar = function(firstChar) {
		var hovered = this.getHoveredOption();
		var optionItemsCount = this.optionItems.length;
		if (hovered === undefined) {
			findOptionByFirstCharFromStart(firstChar);
		}
		else {
			var hoveredText = hovered.getText();
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

	this.removeOptionByOptionElement = function(optionElem) {
		var option = this.getOptionByValue(optionElem.value);
		if (option !== undefined) {
			if (option.isSelected()) {
				var i = option.getIndex();
				var nextSibling = this.optionItems[i + 1];
				if (nextSibling !== undefined) {
					nextSibling.setSelected();
					nextSibling.onClick();
				}
				else if (this.optionItems.length > 0) {
					this.optionItems[0].setSelected();
					this.optionItems[0].onClick();
				}
				else
					this.optionsMenu.getWidgetWrapper().getWidgetSubWrapper().getValueContainer().getValueContainerText().setText("");

			}
			this.element.removeChild(option.getElement());
		}
	}

	this.createOptionByOptionElement = function(optionElem) {
		renderOptionItem(optionElem);
	}

};