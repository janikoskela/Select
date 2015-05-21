SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox = function(Sandbox, el) {
	var that = this;
	var userDefinedSettings = Sandbox.publish("UserDefinedSettings");
	var dataAttrPrefix = "selectjs";
	this.optionItems = [];
	this.observer;
	this.element = el;
	this.usePolling = userDefinedSettings.usePolling || false;
	this.pollingInterval = userDefinedSettings.pollingInterval || 100;
	this.isElemHidden;
	this.isElemDisabled;
	this.optionsCount;
	this.loadingMode;

	this.attach = function() {
		this.optionItems = [];
		var optionsLength = this.element.options.length;
		this.optionsCount = optionsLength;
		for (var i = 0; i < optionsLength; i++) {
			var option = this.element.options[i];
			var optionItem = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxItem(Sandbox, option);
			this.optionItems.push(optionItem);
		}
		if (this.usePolling) {
			this.poller = setInterval(this.observeForChanges.bind(this), this.pollingInterval);
			this.isElemHidden = this.isHidden();
			this.isElemDisabled = this.isDisabled();
		}
		else if (MUTATION_OBSERVER !== undefined && this.observer === undefined) {
			attachDomObserver();
		}
		if (Sandbox.publish("Wrapper").responsiveFallback > 0 && SELECT.UTILS.isTouchDevice())
			this.element.addEventListener("change", onChange.bind(this));
		return this.element;
	}

	function onChange(e) {
		Sandbox.publish("ValueContainer:refresh");
	}

	this.open = function() {
        setTimeout(function() {
            var event = document.createEvent("MouseEvents");
            event.initEvent("mousedown", true, true);
            that.element.dispatchEvent(event);
        });
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

	this.observeForChanges = function() {
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
		var theme = this.getPrefixedDataAttribute("theme");
		if (!SELECT.UTILS.isEmpty(theme) && theme != Sandbox.publish("Wrapper:getTheme"))
			Sandbox.publish("Wrapper:setTheme", theme);
		var loading = this.getPrefixedDataAttribute("loading-mode");
		if (!SELECT.UTILS.isEmpty(loading)) {
			loading = (loading == "true");
			if (this.loadingMode != loading) {
				this.loadingMode = loading;
				if (loading) {
					Sandbox.publish("Wrapper:enableLoadingMode");
				}
				else {
					Sandbox.publish("Wrapper:disableLoadingMode");
				}
			}
		}
		if (SELECT.UTILS.isElement(userDefinedSettings.appendOptionMenuTo)) 
			Sandbox.publish("WidgetWrapper:refresh");
		Sandbox.publish("ValueContainer:refresh");
	}

	this.getOptions = function() {
		return this.optionItems;
	}

	function attachDomObserver() {
		that.observer = new MUTATION_OBSERVER(function(mutations, observer) {
			if (mutations.length > 0) {
				that.attach();
				Sandbox.publish("OptionsMenuList:refresh");
				Sandbox.publish("ValueContainer:refresh");
			}
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

	this.getPrefixedDataAttribute = function(name) {
		return this.element.getDataAttribute(dataAttrPrefix + "-" + name);
	}

};

SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);