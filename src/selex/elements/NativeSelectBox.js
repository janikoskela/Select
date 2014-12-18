SELEX.ELEMENTS.NativeSelectBox = function(params) {

	this.type = "select";
	this.element;
	this.options = params.options || [];
	this.optionItems = [];

	this.createFromExistingSelect = function(elem) {
		this.element = elem;
		for (var i = 0; i < this.element.options.length; i++) {
			var option = this.element.options[i];
			var optionItem = new SELEX.ELEMENTS.NativeSelectBoxItem().createFromExistingOption(option);
			this.optionItems.push(optionItem);
		}
		return this;
	}

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