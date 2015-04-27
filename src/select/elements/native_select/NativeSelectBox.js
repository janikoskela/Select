SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox = function(Sandbox, el) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
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
			var optionItem = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem(Sandbox, option);
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
		if (SELECT.UTILS.isEmpty(this.element))
			Sandbox.publish("Wrapper:remove");
		var isHidden = this.element.isHidden();
		if (isHidden !== this.isElemHidden) {
			this.isElemHidden = isHidden;
			if (isHidden)
				Sandbox.publish("Wrapper:hide");
			else
				Sandbox.publish("Wrapper:show");
		}
		var isDisabled = this.element.isDisabled();
		if (isDisabled !== this.isElemDisabled) {
			this.isElemDisabled = isDisabled;
			if (isDisabled)
				Sandbox.publish("Wrapper:disable");
			else
				Sandbox.publish("Wrapper:enable");
		}
		var optionsCount = this.element.options.length;
		if (optionsCount !== this.optionsCount) {
			this.optionsCount = optionsCount;
			this.attach();
			Sandbox.publish("OptionsMenuList:refresh");
		}
		Sandbox.publish("WidgetWrapper:refresh");
		Sandbox.publish("ValueContainer:refresh");
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
    				Sandbox.publish("OptionsMenuList:refresh");
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
		this.element.value = value;
		return this;
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