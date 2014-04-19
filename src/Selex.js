var Urhola = {

	Selex: function(userDefinedSettings) {

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
			classes: undefined,
			targetElement: undefined,
			defaultOption: undefined,
			orientation: "left",
			onOptionChange: undefined,
			optionLimit: 5,
			sort: undefined,
			onFocus: undefined,
			onFocusOut: undefined,
			tabIndex: 0,
			height: undefined,
			width: undefined,
			fontSize: undefined,
			valueContainerName: undefined,
			attributes: undefined,
			placeHolder: undefined
		};

		init();

		function init() {
			settings = Urhola.Utils.mergeSettings(userDefinedSettings, settings);
			Urhola.Validations.validateOptionList(getOptions());
			Urhola.Validations.validateElement(getTargetElement());
			wrapper = createWrapper();
			container = createContainer();
			selector = createSelector();
			valueContainer = createValueContainer();
			optionsContainer = createOptionsContainer();
		}

		this.setOptions = function(options) {
			Urhola.Validations.validateOptionList(options);
			setOptions(options);
			addOptionsToContainer(optionsContainer);
			setDefaultOption();
		}

		this.setOptionLimit = function(limit) {
			self.closeOptionList();
			setOptionLimit(limit);
			self.openOptionList();
		}

		this.setOrientation = function(orientation) {
			setOrientation(orientation);
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
			var firstChild = optionsContainer.firstChild;
			if (firstChild !== null) {
				var height = optionsContainer.firstChild.offsetHeight;
				adjustOptionsContainerHeight(height);
				adjustOptionsContainerWidth();
			}
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
			Urhola.Dom.addStyleToElement(wrapper, "display", "none");
			return this;
		}

		this.setTabIndex = function(index) {
			Urhola.Dom.addElementAttribute(wrapper, "tabIndex", index);
		}

		this.getTabIndex = function() {
			return Urhola.Dom.getElementAttribute(wrapper, "tabIndex");
		}

		this.show = function() {
			Urhola.Dom.addStyleToElement(wrapper, "display", "block");
			return this;
		}

		this.getAttribute = function(name) {
			return Urhola.Dom.getElementAttribute(wrapper, name);
		}

		this.removeAttribute = function(name) {
			Urhola.Dom.removeElementAttribute(wrapper, name);
		}

		this.addAttributes = function(attributes) {
			addWrapperAttributes(wrapper, attributes);
		}

		this.empty = function() {
			while (optionsContainer.firstChild) {
			    optionsContainer.removeChild(optionsContainer.firstChild);
			}
		}

		this.render = function() {
			var rootElement = getTargetElement();
			if (rootElement.jquery !== undefined) {
				rootElement = rootElement[0];
				if (rootElement === undefined || rootElement.length === 0)
					return;
			}
			if (getTabIndex === undefined) {
				var rootTabIndex = Urhola.Dom.getElementAttribute(rootElement, "tabIndex");
				if (rootTabIndex !== undefined) {
					setTabIndex(tabIndex);
				}
			}
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
			setDefaultOption();
			return this;
		}

		function setDefaultOption() {
			var defaultOption = getDefaultOption();
			var option;
			switch(typeof defaultOption) {
				case "string":
				case "number":
					option = getOptionByValue(defaultOption);
					break;
				case "object":
					var label = (defaultOption.label === undefined) ? defaultOption.name : defaultOption.label;
					var value = defaultOption.value;
					option = getOptionByValueAndLabel(value, label);
					break;
				default:
					var placeHolderText = getPlaceHolderText();
					if (placeHolderText !== undefined) {
						setPlaceHolderText(placeHolderText);
						return;
					}
					else
						option = getFirstOption();
					break;
			}
			if (option !== undefined)
				setSelectedOption(option);
		}

		function getFirstOption() {
			return optionsContainer.childNodes[0];
		}

		function setPlaceHolderText(text) {
			valueContainerText.innerHTML = text;
		}

		function getValuesFromOptionElement(li) {
			var value = Urhola.Dom.getElementAttribute(li, "value");
			var label = Urhola.Dom.getElementAttribute(li, "label");
			return { value: value, label: label };
		}

		function setSelectedOption(option) {
			selectedLabel = Urhola.Dom.getElementAttribute(option, "label");
			selectedValue = Urhola.Dom.getElementAttribute(option, "value");
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
				var option = options[i];
				var label, value; 
				var li = Urhola.Dom.createElement("li");
				switch(typeof option) {
					case "string":
						value = option;
						label = option;
						break;
					case "object":
						value = option.value;
						label = (option.label === undefined) ? ((option.name === undefined) ? value : option.name) : option.label;
						break;
					default:
						throw Error("Unsupported option data format!");
				}
				Urhola.Dom.addElementAttribute(li, "label", label);
				Urhola.Dom.addElementAttribute(li, "value", value);
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
				case undefined:
					return options;
					break;
				default:
					throw Error("Unsupported sort type \"" + sortType + "\"");
			}
			return options;
		}

		function getOptionLabel(option) {
			switch(typeof option) {
				case "string":
					return option.toLowerCase();
					break;
				case "object":
					var label = (option.label === undefined) ? option.name : option.label;
					if (label === undefined)
						label = option.value;
					return label.toLowerCase();
					break;
			}
		}

		function sortByDesc(optionA, optionB) {
			var a = getOptionLabel(optionA);
			var b = getOptionLabel(optionB);
			if (a > b)
				return 1;
			if (a < b)
				return -1;
			return 0;
		}

		function sortByAsc(optionA, optionB) {
			var a = getOptionLabel(optionA);
			var b = getOptionLabel(optionB);			
			if (a > b)
				return -1;
			if (a < b)
				return 1;
			return 0;
		}

		function adjustOptionsContainerWidth() {
			var width = wrapper.offsetWidth + "px";
			Urhola.Dom.addStyleToElement(optionsContainer, "width", width);
		}

		function adjustOptionsContainerHeight(listItemOffsetHeight) {
			var listItemCount = optionsContainer.childNodes.length;
			var limit = getOptionLimit();
			var count = limit;
			if (listItemCount < limit)
				count = listItemCount;
			var height = count * listItemOffsetHeight;
			height += "px"
			Urhola.Dom.addStyleToElement(optionsContainer, "height", height);
		}

		function getOptionByValue(value) {
			var listItems = optionsContainer.childNodes;
			for (var i = 0; i < listItems.length; i++) {
				var listItem = listItems[i];
				var listItemValue = Urhola.Dom.getElementAttribute(listItem, "value");
				if (listItemValue == value)
					return listItem;
			}
		}

		function getOptionByValueAndLabel(value, label) {
			var listItems = optionsContainer.childNodes;
			for (var i = 0; i < listItems.length; i++) {
				var listItem = listItems[i];
				var listItemValue = Urhola.Dom.getElementAttribute(listItem, "value");
				var listItemLabel = listItem.innerHTML;
				if (listItemValue == value && listItemLabel == label)
					return listItem;
			}
			return listItems[0];
		}

		function optionClicked(e) {
			var target = e.target;
			var onChange = getOnChange();
			selectedValue = Urhola.Dom.getElementAttribute(target, "value");
			selectedLabel = Urhola.Dom.getElementAttribute(target, "label");
			Urhola.Dom.addElementAttribute(valueContainer, "value", selectedValue);
			valueContainerText.innerHTML = selectedLabel;
			if (typeof onChange === "function")
				onChange(selectedLabel, selectedValue, e);		
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
			valueContainerText = Urhola.Dom.createElement("div");
			var name = getValueContainerName();
			if (name !== undefined)
				Urhola.Dom.addElementAttribute(valueContainer, "name", name);
			var fontSize = getFontSize();
			if (fontSize !== undefined)
				Urhola.Dom.addStyleToElement(valueContainerText, "fontSize", fontSize);
			Urhola.Dom.appendChildToElement(valueContainerText, valueContainer);
			Urhola.Dom.addClassToElement(valueContainer, className);
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

		function onKeyUp(e) {
			var keyCode = e.keyCode;
			switch(keyCode) {
				case 38:
					onArrowKeyUp(e);
					break;
				case 40:
					onArrowKeyDown(e);
					break;
				case 13:
					onEnter(e);
					break;
				default:
					searchByFirstChar(String.fromCharCode(e.which)[0]);
			} 
		}

		function setListElementHovered(li) {
			Urhola.Dom.addElementAttribute(li, "hovered", true);
		}

		function setListElementNotHovered(li) {
			Urhola.Dom.addElementAttribute(li, "hovered", false);
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
								optionsContainer.scrollTop = next.offsetTop;
								return;
							}
						}
					}
				}
				if (label[0].toLowerCase() === query.toLowerCase() && isElementHovered(li) === false) {
					if (hovered !== undefined)
						setListElementNotHovered(hovered);
					setListElementHovered(li);
					optionsContainer.scrollTop = li.offsetTop;
					return;
				}
			}
		}

		function onArrowKeyUp(e) {
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
				optionsContainer.scrollTop = target.offsetTop;
				setListElementHovered(target);
			}
		}

		function onArrowKeyDown(e) {
			if (!self.isOptionListDisplayed())
				self.openOptionList();
			var hovered = getHoveredOption();
			var firstListElement = optionsContainer.childNodes[0];
			var target = hovered;
			if (target === undefined || target === null)
				target = firstListElement;
			else {
				setListElementNotHovered(hovered);
				target = hovered.nextSibling;
				if (target === undefined || target === null) {
					target = firstListElement;
				}
				optionsContainer.scrollTop = target.offsetTop;
			}
			setListElementHovered(target);
			return false;
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
				setSelectedOption(hoveredElem);
				var onChange = getOnChange();
				if (typeof onChange === "function")
					onChange(selectedLabel, selectedValue, e);
				self.closeOptionList();
			}
		}

		function createWrapper() {
			var classNames = getClasses();
			var tabIndex = getTabIndex();
			var wrapper = Urhola.Dom.createElement("div");
			var height = getHeight();
			var attributes = getWrapperAttributes();
			if (height !== undefined)
				Urhola.Dom.addStyleToElement(wrapper, "height", height);
			var width = getWidth();
			if (width !== undefined) {
				if (typeof width === "number")
					width = width + "px";
				Urhola.Dom.addStyleToElement(wrapper, "width", width);
			}
			Urhola.Dom.addElementAttribute(wrapper, "tabindex", tabIndex);
			wrapper.addEventListener("click", toggleOptionList);
			wrapper.addEventListener("mouseleave", mouseLeave);
			wrapper.addEventListener("focus", focusHandler, true);
			wrapper.addEventListener("blur", focusOutHandler, true);
			wrapper.addEventListener("keyup", onKeyUp);
			wrapper.addEventListener("keydown", onKeyDown);
			Urhola.Dom.addClassToElement(wrapper, classNames);
			addWrapperAttributes(wrapper, attributes);
			return wrapper;
		}

		function addWrapperAttributes(wrapper, attributes) {
			switch(typeof attributes) {
				case "object":
					if (attributes.length > 0) {
						for (var i = 0; i < attributes.length; i++) {
							var name = attributes[i].name;
							var value = attributes[i].value;
							Urhola.Dom.addElementAttribute(wrapper, name, value);
						}
					}
					else {
						if (attributes.name !== undefined && attributes.value !== undefined)
							Urhola.Dom.addElementAttribute(wrapper, attributes.name, attributes.value);
						else {
							for (var name in attributes) {
								var value = attributes[name];
								Urhola.Dom.addElementAttribute(wrapper, name, value);
							}
						}
					}
					break;
				case "string":
				case "number":
					Urhola.Dom.addElementAttribute(wrapper, attributes, "");
					break;
			}
		}

		function onKeyDown(e) {
			/* to prevent window to be scrolled down */
			e.preventDefault();
			return false;
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

		function setOrientation(orientation) {
			settings.orientation = orientation;
		}

		function getOptionLimit() {
			return settings.optionLimit;
		}

		function setOptionLimit(limit) {
			settings.optionLimit = limit;
		}

		function getOptions() {
			return settings.options;
		}

		function setOptions(options) {
			settings.options = options;
		}

		function getClasses() {
			return settings.classes;
		}

		function getTargetElement() {
			return settings.targetElement;
		}

		function getDefaultOption() {
			return settings.defaultOption;
		}

		function getHeight() {
			return settings.height;
		}

		function getOnChange() {
			return settings.onOptionChange;
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

		function setTabIndex(index) {
			settings.tabIndex = index;
		}

		function getFontSize() {
			return settings.fontSize;
		}

		function getWidth() {
			return settings.width;
		}

		function getValueContainerName() {
			return settings.valueContainerName;
		}

		function getWrapperAttributes() {
			return settings.attributes;
		}

		function getPlaceHolderText() {
			return settings.placeHolder;
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

		addElementAttribute: function(elem, name, value) {
			elem.setAttribute(name, value);
			return elem;
		},

		removeElementAttribute: function(elem, name) {
			elem.removeAttribute(name);
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
	},

	Validations: {
		validateOptionList: function(options) {
			if (typeof options !== "object" || options === undefined)
				throw new Error("Invalid options format!");
		},

		validateElement: function(element) {
			if (typeof element !== "object")
				throw new Error("Invalid element!");
		}
	}
};

var Selex = function(userDefinedSettings) {
	return new Urhola.Selex(userDefinedSettings);
};