SELEX.ELEMENTS.NativeSelectBox = function(params) {

	this.type = "select";
	this.width = params.width;
	this.changeCallback = params.changeCallback;
	this.element;
	this.tabIndex = params.tabIndex || 0;
	this.fontSize;
	this.placeholder = params.placeholder;
	this.options = params.options || [];
	this.optionItems = [];

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.onchange = this.onOptionChange;
		this.renderOptions(this.options);
		return this.element;
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

	this.setFontSize = function(fontSize) {
		this.fontSize = fontSize;
		this.element.setStyle("font-size", this.fontSize);
	}

	this.setPlaceholder = function(placeholder) {
		this.placeholder = placeholder;
		var placeholderInstance = new SELEX.ELEMENTS.NativeSelectBoxItem();
		var elem = placeholderInstance.render();
		placeholderInstance.setText(placeholder);
		elem.setAttribute("data-selected", true);
		elem.setAttribute("data-disabled", true);
		this.element.appendChild(elem);
	}

	this.enable = function() {
		this.element.removeAttribute("data-disabled");
	}

	this.disable = function() {
		this.element.setAttribute("data-disabled", true);
	}

	this.setTabIndex = function(tabIndex) {
		this.tabIndex = tabIndex;
		this.element.setAttribute("tabindex", this.tabIndex);
	}

	this.onOptionChange = function(e) {
		var value = e.target.selectedOptions[0].value;
		var text = e.target.selectedOptions[0].text;
		if (typeof self.changeCallback === "function") {
			self.changeCallback(value, text);
		}
	}

	this.setOption = function(value) {
		this.element.value = value;
	}

	this.getElement = function() {
		return this.element;
	}

	this.setWidth = function(width) {
		this.width = width;
		this.element.setStyle("width", this.width);
	}

	this.hide = function() {
		this.element.hide();
	}

	this.show = function() {
		this.element.show();
	}

};