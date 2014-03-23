var Urhola = {

	SelectBox: function(userDefinedSettings) {

		var wrapper = undefined;
		var container = undefined;
		var selector = undefined;
		var valueContainer = undefined;
		var selectedValue = undefined;
		var selectedLabel = undefined;
		var optionsContainer = undefined;
		var valueContainerText = undefined;
		var arrow = undefined;
		var self = this;

		// Allowed settings which can be overriden by the user
		var settings = {
			options: [],
			wrapperClass: undefined,
			parentElement: undefined,
			defaultValue: undefined,
			orientation: "right",
			onChange: undefined,
			optionLimit: 5
		};

		init();

		function init() {
			settings = Urhola.Utils.mergeSettings(userDefinedSettings, settings);
			Urhola.SelectBox.validateSettings(settings);
			wrapper = createWrapper();
			container = createContainer();
			selector = createSelector();
			valueContainer = createValueContainer();
			optionsContainer = createOptionsContainer();
		}

		this.setOptions = function(options) {
			Urhola.SelectBox.validateOptionList(options);
			settings.options = options;
			addOptionsToContainer(optionsContainer);
			updateValueContainerText();
		}

		this.setOptionLimit = function(limit) {
			self.closeOptionList();
			settings.optionLimit = limit;
			self.openOptionList();
		}

		this.setOrientation = function(orientation) {
			settings.orientation = orientation;
			self.render();
		}

		this.getOptions = function() {
			return getOptions();
		}

		this.closeOptionList = function() {
			Urhola.Dom.addStyleToElement(optionsContainer, "display", "none");
			Urhola.Dom.addClassToElement(arrow, "arrow arrowDown");
		}

		this.openOptionList = function() {
			Urhola.Dom.addStyleToElement(optionsContainer, "display", "block");
			Urhola.Dom.addClassToElement(arrow, "arrow arrowUp");
			var height = optionsContainer.firstChild.offsetHeight;
			adjustOptionsContainerHeight(height);
			adjustOptionsContainerWidth();
		}

		this.getSelectedValue = function() {
			return selectedValue;
		}

		this.getSelectedLabel = function() {
			return selectedLabel;
		}

		this.hide = function() {
			wrapper.addStyleToElement("display", "none");
			return this;
		}

		this.show = function() {
			wrapper.addStyleToElement("display", "block");
			return this;
		}

		this.render = function() {
			var rootElement = getParentElement();
			rootElement.innerHTML = "";
			Urhola.Dom.appendChildToElement(wrapper, rootElement);
			Urhola.Dom.appendChildToElement(container, wrapper);
			var orientation = getOrientation();
			if (orientation === "right") {
				Urhola.Dom.appendChildToElement(valueContainer, container);
				Urhola.Dom.appendChildToElement(selector, container);
			}
			else {
				Urhola.Dom.appendChildToElement(selector, container);
				Urhola.Dom.appendChildToElement(valueContainer, container);
			}
			Urhola.Dom.appendChildToElement(optionsContainer, wrapper);
			addOptionsToContainer(optionsContainer);
			return this;
		}

		function setDefaultOption() {
			var defaultValue = getDefaultValue();
			var option = getOptionByValue(defaultValue);
			setSelectedOption(option);
		}

		function setSelectedOption(option) {
			selectedLabel = option.label;
			selectedValue = option.value;
			valueContainerText.innerHTML = "";
			Urhola.Dom.appendTextToElement(selectedLabel, valueContainerText);
		}

		function updateValueContainerText() {
			var option = getOptionByValue(selectedValue);
			setSelectedOption(option);
		}

		function addOptionsToContainer(parent) {
			parent.innerHTML = "";
			var options = getOptions();
			for (var i = 0; i < options.length; i++) {
				var label = options[i].label;
				var value = options[i].value;
				var li = Urhola.Dom.createElement("li");
				Urhola.Dom.addPropertyToElement(li, "label", label);
				Urhola.Dom.addPropertyToElement(li, "value", value);
				Urhola.Dom.appendTextToElement(label, li);
				li.addEventListener("click", optionClicked);
				Urhola.Dom.appendChildToElement(li, parent);
			}
			return parent;
		}

		function adjustOptionsContainerWidth() {
			var width =  wrapper.offsetWidth + "px";
			Urhola.Dom.addStyleToElement(optionsContainer, "width", width);
		}

		function adjustOptionsContainerHeight(listItemOffsetHeight) {
			var limit = getOptionLimit();
			var height = limit * listItemOffsetHeight;
			height += "px"
			Urhola.Dom.addStyleToElement(optionsContainer, "height", height);
		}

		function getOptionByValue(value) {
			var options = getOptions();
			for (var i = 0; i < options.length; i++) {
				if (options[i].value === value)
					return options[i];
			}
			return options[0];
		}

		function optionClicked(e) {
			var target = e.target;
			var onChange = getOnChange();
			selectedValue = Urhola.Dom.getElementAttribute(target, "value");
			selectedLabel = Urhola.Dom.getElementAttribute(target, "label");
			valueContainerText.innerHTML = selectedLabel;
			if (typeof onChange === "function")
				onChange(selectedLabel, selectedValue, self);		
		}

		function createValueContainerText(text) {
			var textNode = Urhola.Dom.createTextNode(text);
			return textNode;
		}

		function createOptionsContainer() {
			var className = "optionsContainer";
			var container = Urhola.Dom.createElement("ul");
			Urhola.Dom.addClassToElement(container, className);
			return container;
		}

		function createValueContainer() {
			var className = "valueContainer";
			var valueContainer = Urhola.Dom.createElement("li");
			valueContainerText = Urhola.Dom.createElement("span");
			Urhola.Dom.appendChildToElement(valueContainerText, valueContainer);
			Urhola.Dom.addClassToElement(valueContainer, className);
			setDefaultOption();
			return valueContainer;
		}

		function createSelector() {
			var className = "selector";
			var selector = Urhola.Dom.createElement("li");
			Urhola.Dom.addClassToElement(selector, className);
			arrow = Urhola.Dom.createElement("div");
			Urhola.Dom.addClassToElement(arrow, "arrow arrowDown");
			Urhola.Dom.appendChildToElement(arrow, selector);
			return selector;
		}

		function toggleOptionList(e) {
			var optionsContainerDisplayValue = Urhola.Dom.getElementStyleValue(optionsContainer, "display");
			if (optionsContainerDisplayValue === "block")
				self.closeOptionList();
			else
				self.openOptionList();
		}

		function createWrapper() {
			var className = getWrapperClass();
			var wrapper = Urhola.Dom.createElement("div");
			wrapper.addEventListener("click", toggleOptionList);
			wrapper.addEventListener("mouseleave", mouseLeave);
			Urhola.Dom.addClassToElement(wrapper, className);
			return wrapper;
		}

		function mouseLeave(e) {
			self.closeOptionList();
		}

		function createContainer() {
			var className = "container";
			var container = Urhola.Dom.createElement("ul");
			Urhola.Dom.addClassToElement(container, className);
			return container;
		}

		function getOrientation() {
			return settings.orientation;
		}

		function getOptionLimit() {
			return settings.optionLimit;
		}

		function getOptions() {
			return settings.options;
		}

		function getWrapperClass() {
			return settings.wrapperClass;
		}

		function getParentElement() {
			return settings.parentElement;
		}

		function getDefaultValue() {
			return settings.defaultValue;
		}

		function getOnChange() {
			return settings.onChange;
		}
	},

	Dom: {

		getElementById: function(id) {
			return document.getElementById(id);
		},

		createElement: function(tagName, id, classNames) {
			var elem = document.createElement(tagName);
			if (id !== undefined)
				elem.id = id;
			if (Urhola.Utils.isArray(classNames)) {
				for (var i = 0; i < classNames.length; i++)
					elem.className = classNames[i];
			}
			else if (typeof classNames === "string")
				elem.className = className;
			return elem;
		},

		addIdToElement: function(elem, id) {
			elem.id = id;
			return elem;
		},

		addClassToElement: function(elem, className) {
			elem.className = className;
			return elem;
		},

		addStyleToElement: function(elem, name, value) {
			elem.style[name] = value;
			return elem;
		},

		getElementStyleValue: function(elem, name) {
			return elem.style[name];
		},

		getElementAttribute: function(elem, name) {
			return elem.getAttribute(name);
		},

		addPropertyToElement: function(elem, name, value) {
			elem.setAttribute(name, value);
			return elem;
		},

		appendChildToElement: function(child, elem) {
			elem.appendChild(child);
			return parent;
		},

		createTextNode: function(text) {
			return document.createTextNode(text);
		},

		appendTextToElement: function(text, elem) {
			var node = Urhola.Dom.createTextNode(text);
			Urhola.Dom.appendChildToElement(node, elem);
			return node;
		}
	},

	Utils: {
		mergeSettings: function(a, b) {
			for (var key in b) {
				if (a[key] !== undefined)
					b[key] = a[key];
			}
			return b;
		},

		isArray: function(arr) {
			if (Array.isArray)
				return Array.isArray(arr);
			return false;
		}
	}
}

Urhola.SelectBox.validateOptionList = function(options) {
	if (Object.prototype.toString.call(options) !== '[object Array]')
		throw new Error("Options must be an object array! Each array object must contain label and value attributes!");
}

Urhola.SelectBox.validateElement = function(parentElement) {
	if (typeof parentElement !== "object")
		throw new Error("Parent element must be an element!");
}

Urhola.SelectBox.validateSettings = function(settings) {
	Urhola.SelectBox.validateOptionList(settings.options);
	Urhola.SelectBox.validateElement(settings.parentElement);
}