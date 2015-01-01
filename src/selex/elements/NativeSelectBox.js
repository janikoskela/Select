SELEX.ELEMENTS.NativeSelectBox = function(wrapper) {
	var that = this;
	this.optionItems = [];
	this.observer;
	this.wrapper = wrapper;
	this.element = this.wrapper.getTargetElement();

	this.attach = function() {
		this.optionItems = [];
		var optionsLength = this.element.options.length;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELEX.ELEMENTS.NativeSelectBoxItem(this, option);
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
    				that.wrapper.getWidgetWrapper().getOptionsMenu().getOptionsMenuList().refresh();
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

};