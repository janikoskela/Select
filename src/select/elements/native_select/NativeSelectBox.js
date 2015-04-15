SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox = function(Facade, el) {
	var that = this;
	var userDefinedSettings = Facade.publish("UserDefinedSettings");
	this.optionItems = [];
	this.observer;
	this.element = el;
	this.usePolling = userDefinedSettings.usePolling || false;
	this.pollingInterval = userDefinedSettings.pollingInterval || 100;
	this.isElemHidden;
	this.isElemDisabled;
	this.optionsCount;

	this.attach = function() {
		this.optionItems = [];
		var optionsLength = this.element.options.length;
		this.optionsCount = optionsLength;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem(Facade, option);
			this.optionItems.push(optionItem);
		}
		//if (MUTATION_OBSERVER !== undefined && this.observer === undefined)
		//	attachDomObserver();
		if (this.usePolling)
			this.poller = setInterval(this.poll.bind(this), this.pollingInterval);
		if (this.usePolling) {
			this.isElemHidden = this.isHidden();
			this.isElemDisabled = this.isDisabled();
		}
		return this.element;
	}

	this.detach = function() {
		this.observer = undefined;
		if (this.poller !== undefined)
			clearInterval(this.poller);
	}

	this.triggerFocus = function() {
		SELECT.UTILS.triggerEvent("focus", this.element);
	}

	this.setValue = function(value) {
		this.element.value = value;
	}

	this.poll = function() {
		var isHidden = this.element.isHidden();
		if (isHidden !== this.isElemHidden) {
			this.isElemHidden = isHidden;
			if (isHidden)
				Facade.publish("Wrapper:hide");
			else
				Facade.publish("Wrapper:show");
		}
		var isDisabled = this.element.isDisabled();
		if (isDisabled !== this.isElemDisabled) {
			this.isElemDisabled = isDisabled;
			if (isDisabled)
				Facade.publish("Wrapper:disable");
			else
				Facade.publish("Wrapper:enable");
		}
		//if (this.observer === undefined) { //mutation observer does not detech attribute changes on <select>
			var optionsCount = this.element.options.length;
			if (optionsCount !== this.optionsCount) {
				this.optionsCount = optionsCount;
				this.attach();
				Facade.publish("OptionsMenuList").refresh();
			}
		//}
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
		var selectedIndex = this.element.selectedIndex;
		return this.element.options[selectedIndex];
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
		return this.element.options[this.element.selectedIndex];
	}

};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);