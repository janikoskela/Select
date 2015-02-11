SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox = function(Facade, el) {
	var that = this;
	this.optionItems = [];
	this.observer;
	this.element = el;

	this.attach = function() {
		this.optionItems = [];
		var optionsLength = this.element.options.length;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem(Facade, option);
			this.optionItems.push(optionItem);
		}
		if (MUTATION_OBSERVER !== undefined && this.observer === undefined)
			attachDomObserver();
		return this.element;
	}

	this.getOptions = function() {
		return this.optionItems;
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
		var l = this.element.options.length;
		for (var i = 0; i < l; i++) {
			var option = this.element.options[i];
			var selected = (option.getAttribute("selected") === null) ? false : true;
			if (selected)
				return option;
		}
	}

};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);