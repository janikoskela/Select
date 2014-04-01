var Selex = {

	Core: function(userDefinedSettings) {

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
			settings = Selex.Utils.mergeSettings(userDefinedSettings, settings);
			Selex.Validations.validateOptionList(settings.options);
			Selex.Validations.validateElement(settings.parentElement);
			wrapper = createWrapper();
			container = createContainer();
			selector = createSelector();
			valueContainer = createValueContainer();
			optionsContainer = createOptionsContainer();
		}

		this.setOptions = function(options) {
			Selex.validateOptionList(options);
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
			Selex.Dom.addStyleToElement(optionsContainer, "display", "none");
			Selex.Dom.addClassToElement(arrow, "arrow arrowDown");
		}

		this.openOptionList = function() {
			Selex.Dom.addStyleToElement(optionsContainer, "display", "block");
			Selex.Dom.addClassToElement(arrow, "arrow arrowUp");
			var height = optionsContainer.firstChild.offsetHeight;
			adjustOptionsContainerHeight(height);
			adjustOptionsContainerWidth();
		}

		this.isOptionListDisplayed = function() {
			return (Selex.Dom.getElementStyleValue(optionsContainer, "display") == "none") ? false : true;
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
			Selex.Dom.appendChildToElement(wrapper, rootElement);
			Selex.Dom.appendChildToElement(container, wrapper);
			var orientation = getOrientation();
			if (orientation === "right") {
				Selex.Dom.appendChildToElement(valueContainer, container);
				Selex.Dom.appendChildToElement(selector, container);
			}
			else {
				Selex.Dom.appendChildToElement(selector, container);
				Selex.Dom.appendChildToElement(valueContainer, container);
			}
			Selex.Dom.appendChildToElement(optionsContainer, wrapper);
			addOptionsToContainer(optionsContainer);
			setDefaultOption();
			return this;
		}

		function setDefaultOption() {
			var defaultValue = getDefaultValue();
			var option = getOptionByValue(defaultValue);
			setSelectedOption(option);
		}

		function getValuesFromOptionElement(li) {
			var value = Selex.Dom.getElementAttribute(li, "value");
			var label = Selex.Dom.getElementAttribute(li, "label");
			return { value: value, label: label };
		}

		function setSelectedOption(option) {
			selectedLabel = Selex.Dom.getElementAttribute(option, "label");
			selectedValue = Selex.Dom.getElementAttribute(option, "value");
			valueContainerText.innerHTML = "";
			Selex.Dom.appendTextToElement(selectedLabel, valueContainerText);
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
				var option = options[i];
				var label, value; 
				var li = Selex.Dom.createElement("li");
				switch(typeof option) {
					case "string":
						value = option;
						label = option;
						break;
					case "object":
						value = option.value;
						label = (option.label === undefined) ? value : option.label;
						break;
					default:
						throw Error("Unsupported option data format!");
				}
				Selex.Dom.addPropertyToElement(li, "label", label);
				Selex.Dom.addPropertyToElement(li, "value", value);
				Selex.Dom.addPropertyToElement(li, "index", i);
				Selex.Dom.appendTextToElement(label, li);
				li.addEventListener("click", optionClicked);
				Selex.Dom.appendChildToElement(li, parent);
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
			Selex.Dom.addStyleToElement(optionsContainer, "width", "100%");
		}

		function adjustOptionsContainerHeight(listItemOffsetHeight) {
			var limit = getOptionLimit();
			var height = limit * listItemOffsetHeight;
			height += "px"
			Selex.Dom.addStyleToElement(optionsContainer, "height", height);
		}

		function getOptionByValue(value) {
			var listItems = optionsContainer.childNodes;
			for (var i = 0; i < listItems.length; i++) {
				var listItem = listItems[i];
				if (listItem.value === value)
					return listItem;
			}
			return listItems[0];
		}

		function optionClicked(e) {
			var target = e.target;
			var onChange = getOnChange();
			selectedValue = Selex.Dom.getElementAttribute(target, "value");
			selectedLabel = Selex.Dom.getElementAttribute(target, "label");
			valueContainerText.innerHTML = selectedLabel;
			if (typeof onChange === "function")
				onChange(selectedLabel, selectedValue, self);		
		}

		function createValueContainerText(text) {
			var textNode = Selex.Dom.createTextNode(text);
			return textNode;
		}

		function createOptionsContainer() {
			var className = "optionsContainer";
			var container = Selex.Dom.createElement("ul");
			Selex.Dom.addClassToElement(container, className);
			return container;
		}

		function createValueContainer() {
			var className = "valueContainer";
			var valueContainer = Selex.Dom.createElement("li");
			valueContainerText = Selex.Dom.createElement("span");
			Selex.Dom.appendChildToElement(valueContainerText, valueContainer);
			Selex.Dom.addClassToElement(valueContainer, className);
			return valueContainer;
		}

		function createSelector() {
			var className = "selector";
			var selector = Selex.Dom.createElement("li");
			Selex.Dom.addClassToElement(selector, className);
			arrow = Selex.Dom.createElement("div");
			Selex.Dom.addClassToElement(arrow, "arrow arrowDown");
			Selex.Dom.appendChildToElement(arrow, selector);
			return selector;
		}

		function toggleOptionList(e) {
			var optionsContainerDisplayValue = Selex.Dom.getElementStyleValue(optionsContainer, "display");
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
			Selex.Dom.addPropertyToElement(li, "hovered", true);
		}

		function setListElementNotHovered(li) {
			Selex.Dom.addPropertyToElement(li, "hovered", false);
		}

		function searchByFirstChar(query) {
			query = query.toLowerCase();
			var listElements = optionsContainer.childNodes;
			var hovered = getHoveredOption();
			for (var i = 0; i < listElements.length; i++) {
				var li = listElements[i];
				var label = Selex.Dom.getElementAttribute(li, "label");
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
				var index = Selex.Dom.getElementAttribute(target, "index");
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
			var wrapper = Selex.Dom.createElement("div");
			Selex.Dom.addPropertyToElement(wrapper, "tabindex", tabIndex);
			wrapper.addEventListener("click", toggleOptionList);
			wrapper.addEventListener("mouseleave", mouseLeave);
			wrapper.addEventListener("focus", focusHandler, true);
			wrapper.addEventListener("blur", focusOutHandler, true);
			wrapper.addEventListener("keyup", onKeyPress);
			Selex.Dom.addClassToElement(wrapper, className);
			return wrapper;
		}

		function mouseLeave(e) {
			self.closeOptionList();
		}

		function createContainer() {
			var className = "container";
			var container = Selex.Dom.createElement("ul");
			Selex.Dom.addClassToElement(container, className);
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
			if (Selex.Utils.isArray(classNames)) {
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
			var node = Selex.Dom.createTextNode(text);
			Selex.Dom.appendChildToElement(node, elem);
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
	},

	Validations: {
		validateOptionList: function(options) {
			if (typeof options !== "object")
				throw new Error("Invalid options format!");
		},

		validateElement: function(element) {
			if (typeof element !== "object")
				throw new Error("Parent element must be an element!");
		}
	}
};