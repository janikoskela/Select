SELEX.ELEMENTS.NativeSelectBox = function(wrapper) {
	var that = this;
	this.optionItems = [];
	this.observer;
	this.wrapper = wrapper;
	this.element = this.wrapper.getTargetElement();

	this.attach = function() {
		var optionsLength = this.element.options.length;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELEX.ELEMENTS.NativeSelectBoxItem(this, option);
			this.optionItems.push(optionItem);
		}
		if (MUTATION_OBSERVER !== undefined)
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
    			for (var i = 0; i < addedNodesLength; i++) {
    				var addedNode = mutation.addedNodes[i];
    				that.wrapper.getWidgetWrapper().getOptionsMenu().getOptionsMenuList().createOptionByOptionElement(addedNode);
    			}
    			var removedNodesLength = (mutation.removedNodes === undefined) ? 0 : mutation.removedNodes.length;
    			for (i = 0; i < removedNodesLength; i++) {
    				var removedNode = mutation.removedNodes[i];
    				that.wrapper.getWidgetWrapper().getOptionsMenu().getOptionsMenuList().removeOptionByOptionElement(removedNode);
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
		return this.getSelectedOption().text;
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
	    SELEX.UTILS.triggerEvent("change", this.element);
	}

	this.getSelectedOptionValue = function() {
		return this.getSelectedOption().value;
	}

	this.getSelectedOption = function() {
		return this.element.options[this.element.selectedIndex];
	}

	this.getElement = function() {
		return this.element;
	}

	this.hide = function() {
		this.element.hide();
	}

};