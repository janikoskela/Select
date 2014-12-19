SELEX.ELEMENTS.NativeSelectBox = function(params, wrapper) {
	var that = this;
	this.type = "select";
	this.element;
	this.options = params.options || [];
	this.optionItems = [];
	this.observer;
	this.wrapper = wrapper;

	this.createFromExistingSelect = function(elem) {
		this.element = elem;
		var optionsLength = this.element.options.length;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELEX.ELEMENTS.NativeSelectBoxItem().createFromExistingOption(option);
			this.optionItems.push(optionItem);
		}
		if (MUTATION_OBSERVER !== undefined)
			attachDomObserver();
		return this;
	}

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.onchange = this.onOptionChange;
		this.renderOptions(this.options);
		if (MUTATION_OBSERVER !== undefined)
			attachDomObserver();
		return this.element;
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

	this.setSelectedOption = function(value) {
		for (var i = 0; i < this.optionItems.length; i++) {
			if (this.optionItems[i].getValue() == value) {
				this.optionItems[i].setSelected();
			}
			else
				this.optionItems[i].removeSelected();
		}
	}

	this.getElement = function() {
		return this.element;
	}

	this.hide = function() {
		this.element.hide();
	}

};