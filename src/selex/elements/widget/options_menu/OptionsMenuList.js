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
	this.nativeSelect = optionsMenu.getWidgetWrapper().getWrapper().getNativeSelect();

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

	function renderOptionItem(option) {
		var item = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenuItem(option, that);
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
		this.element.removeChild(optionElem);
	}

	this.createOptionByOptionElement = function(optionElem) {
		renderOptionItem(optionElem);
	}

};