SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList = function(Sandbox) {
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
        L= (a == null) ? 0 : a.length;
        while(i<L){
            if(b == null || !b[i]) return 1;
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
        L= (a == null) ? 0 : a.length;
        while(i<L){
            if(b == null || !b[i]) return -1;
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
        var optionGroup;
        if (nextSibling !== null && nextSibling !== undefined) {
            if (nextSibling.hasClass("options-container-list-item")) {
                var index = nextSibling.getDataAttribute("index");
                return getOptionByIndex(index);
            }
            else if (nextSibling.hasClass("options-menu-list-item-group")) {
                return getFirstOptionFromOptionGroup(nextSibling);
            }
        }
        if (optionGroup === undefined)
           optionGroup = option.getOptionGroup();
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

    function getLastOptionFromOptionGroup(optionGroup) {
        var children = optionGroup.getChildren();
        children = children[1].getChildren();
        var index = children[children.length - 1].getDataAttribute("index");
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

    function getLastOption() {
        if (SELECT.UTILS.isEmpty(that.optionGroups))
            return that.optionItems[that.optionItems.length - 1];
        var keys = Object.keys(that.optionGroups);
        var lastKey = keys[keys.length - 1];
        var list = that.optionGroups[lastKey].getList();
        var children = list.getElement().children;
        var last = children[children.length - 1];
        return getOptionByIndex(last.getDataAttribute("index"));
    }

    function getFirstOption() {
        if (SELECT.UTILS.isEmpty(that.optionGroups))
            return that.optionItems[0];
        var keys = Object.keys(that.optionGroups);
        var firstKey = keys[0];
        var list = that.optionGroups[firstKey].getList();
        var children = list.getElement().children;
        var first = children[0];
        return getOptionByIndex(first.getDataAttribute("index"));
    }

    function getPreviousOption(option) {
        var nextSibling = option.getPreviousSibling();
        var optionGroup;
        if (nextSibling !== null && nextSibling !== undefined) {
            if (nextSibling.hasClass("options-container-list-item")) {
                var index = nextSibling.getDataAttribute("index");
                return getOptionByIndex(index);
            }
            else if (nextSibling.hasClass("options-menu-list-item-group")) {
                return getLastOptionFromOptionGroup(nextSibling);
            }
        }
        if (optionGroup === undefined)
           optionGroup = option.getOptionGroup();
        if (optionGroup !== undefined) {
            var nextOptionGroup = optionGroup.previousSibling;
            if (nextOptionGroup !== null && nextOptionGroup !== undefined) {
                if (nextOptionGroup.hasClass("options-container-list-item")) {
                    var index = nextOptionGroup.getDataAttribute("index");
                    return getOptionByIndex(index);
                }
                else
                    return getLastOptionFromOptionGroup(nextOptionGroup);
            }
        }
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
    		option = getLastOption();
    	this.clearOptionItemHovers();
		option.setHovered();
		if (optionsMenu.isHidden())
			option.setSelected();
		else
            this.element.scrollTop = option.getElement().offsetTop - option.getElement().parentNode.offsetTop;
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
		if (Sandbox.publish("OptionsMenu:isLocked"))
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
    		option = getFirstOption();
    	this.clearOptionItemHovers();
		option.setHovered();
		if (Sandbox.publish("OptionsMenu:isHidden")) {
			option.setSelected();
		}
		else {
            this.element.scrollTop = option.getElement().offsetTop - option.getElement().parentNode.offsetTop;
		}
    }

    this.selectHoveredOption = function() {
		if (Sandbox.publish("OptionsMenu:isLocked"))
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
            if (SELECT.UTILS.isEmpty(itemText))
                continue;
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
        if (SELECT.UTILS.isEmpty(text)) {
            return false;
        }
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

SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuList.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);