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
			theme: undefined,
			parentElement: undefined,
			defaultValue: undefined,
			orientation: "right",
			onChange: undefined,
			optionLimit: 5,
			sort: "desc",
			onFocus: undefined,
			onFocusOut: undefined,
			tabIndex: 1
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

		this.isOptionListDisplayed = function() {
			return (Urhola.Dom.getElementStyleValue(optionsContainer, "display") == "none") ? false : true;
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

		function getValuesFromOptionElement(li) {
			var value = Urhola.Dom.getElementAttribute(li, "value");
			var label = Urhola.Dom.getElementAttribute(li, "label");
			return { value: value, label: label };
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
			options = sortOptions(options);
			for (var i = 0; i < options.length; i++) {
				var label = options[i].label;
				var value = options[i].value;
				var li = Urhola.Dom.createElement("li");
				Urhola.Dom.addPropertyToElement(li, "label", label);
				Urhola.Dom.addPropertyToElement(li, "value", value);
				Urhola.Dom.addPropertyToElement(li, "index", i);
				Urhola.Dom.appendTextToElement(label, li);
				li.addEventListener("click", optionClicked);
				Urhola.Dom.appendChildToElement(li, parent);
			}
			return parent;
		}

		function sortOptions(options) {
			var sortType = getSort();
			switch(sortType) {
				case "desc":
					options.sort(sortByDesc);
					break;
				case "asc":
					options.sort(sortByAsc);
					break;
				default:
					throw Error("Unsupported sort type \"" + sortType + "\"");
			}
			return options;
		}

		function sortByDesc(optionA, optionB) {
			var a = optionA.label;
			var b = optionB.label;
			if (a > b)
				return 1;
			if (a < b)
				return -1;
			return 0;
		}

		function sortByAsc(optionA, optionB) {
			var a = optionA.label;
			var b = optionB.label;
			if (a > b)
				return -1;
			if (a < b)
				return 1;
			return 0;
		}

		function adjustOptionsContainerWidth() {
			Urhola.Dom.addStyleToElement(optionsContainer, "width", "100%");
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

		function focusHandler(e) {
			var callback = getOnFocus();
			if (typeof callback === "function")
				callback();
		}

		function focusOutHandler(e) {
			var callback = getOnFocusOut();
			if (typeof callback === "function")
				callback();
		}

		function onKeyPress(e) {
			var keyCode = e.keyCode;
			switch(keyCode) {
				case 38:
					onKeyUp(e);
					break;
				case 40:
					onKeyDown(e);
					break;
				case 13:
					onEnter(e);
					break;
				default:
					searchByFirstChar(String.fromCharCode(e.which)[0]);
			} 
		}

		function setListElementHovered(li) {
			Urhola.Dom.addPropertyToElement(li, "hovered", true);
		}

		function setListElementNotHovered(li) {
			Urhola.Dom.addPropertyToElement(li, "hovered", false);
		}

		function searchByFirstChar(query) {
			query = query.toLowerCase();
			var listElements = optionsContainer.childNodes;
			var hovered = getHoveredOption();
			for (var i = 0; i < listElements.length; i++) {
				var li = listElements[i];
				var label = Urhola.Dom.getElementAttribute(li, "label");
				if (typeof hovered === "object") {
					if (getValuesFromOptionElement(hovered).label[0].toLowerCase() === query) {
						var next = hovered.nextSibling;
						if (typeof next === "object" && next !== null) {
							if (getValuesFromOptionElement(next).label[0].toLowerCase() === query) {
								setListElementNotHovered(hovered);
								setListElementHovered(next);
								next.scrollIntoView();
								return;
							}
						}
					}
				}
				if (label[0].toLowerCase() === query.toLowerCase() && isElementHovered(li) === false) {
					if (hovered !== undefined)
						setListElementNotHovered(hovered);
					setListElementHovered(li);
					li.scrollIntoView();
					return;
				}
			}
		}

		function onKeyUp(e) {
			if (!self.isOptionListDisplayed())
				self.openOptionList();
			var hovered = getHoveredOption();
			var lastListElement = optionsContainer.childNodes[optionsContainer.childNodes.length - 1];
			if (hovered === undefined || hovered === null) {
				setListElementHovered(lastListElement);
			}
			else {
				setListElementNotHovered(hovered);
				var target = hovered.previousSibling;
				if (target === undefined || target === null) {
					target = lastListElement;
				}
				target.scrollIntoView();
				setListElementHovered(target);
			}
		}

		function onKeyDown(e) {
			if (!self.isOptionListDisplayed())
				self.openOptionList();
			var hovered = getHoveredOption();
			var firstListElement = optionsContainer.childNodes[0];
			if (hovered === undefined || hovered === null) {
				setListElementHovered(firstListElement);
			}
			else {
				setListElementNotHovered(hovered);
				var target = hovered.nextSibling;
				if (target === undefined || target === null) {
					target = firstListElement;
				}
				var index = Urhola.Dom.getElementAttribute(target, "index");
				var optionLimit = getOptionLimit();
				if (index >= optionLimit)
					prevSibling(target, optionLimit - 1).scrollIntoView();
				if (index == 0)
					target.scrollIntoView();
				setListElementHovered(target);
			}
		}

		function prevSibling(elem, count) {
			var pointer = elem;
			for (var i = 0; i < count; i++)
				pointer = pointer.previousSibling;
			return pointer;
		}

		function getHoveredOption() {
			var optionElements = optionsContainer.childNodes;
			for (var i = 0; i < optionElements.length; i++) {
				var li = optionElements[i];
				if (isElementHovered(li))
					return li;
			}
		}

		function isElementHovered(elem) {
			return (elem.getAttribute("hovered") == "true") ? true : false;
		}

		function onEnter(e) {
			var hoveredElem = getHoveredOption();
			if (hoveredElem !== null && typeof hoveredElem === "object") {
				var option = getValuesFromOptionElement(hoveredElem);
				setSelectedOption(option);
				self.closeOptionList();
			}
		}

		function createWrapper() {
			var className = getTheme();
			var tabIndex = getTabIndex();
			var wrapper = Urhola.Dom.createElement("div");
			Urhola.Dom.addPropertyToElement(wrapper, "tabindex", tabIndex);
			wrapper.addEventListener("click", toggleOptionList);
			wrapper.addEventListener("mouseleave", mouseLeave);
			wrapper.addEventListener("focus", focusHandler, true);
			wrapper.addEventListener("blur", focusOutHandler, true);
			wrapper.addEventListener("keyup", onKeyPress);
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

		function getTheme() {
			return settings.theme;
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

		function getSort() {
			return settings.sort;
		}

		function getOnFocus() {
			return settings.onFocus;
		}

		function getOnFocusOut() {
			return settings.onFocusOut;
		}

		function getTabIndex() {
			return settings.tabIndex;
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