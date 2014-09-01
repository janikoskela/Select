SELEX.SETTINGS.Settings = function(userDefinedSettings) {
	var options = userDefinedSettings.options || [];
	var rootElement = userDefinedSettings.targetElement;
	var defaultValue = userDefinedSettings.defaultValue;
	var orientation = userDefinedSettings.orientation || "right";
	var onOptionChange = userDefinedSettings.onOptionChange;
	var optionLimit = userDefinedSettings.optionLimit;
	var sort = userDefinedSettings.sort;
	var tabIndex = userDefinedSettings.tabIndex || 0;
	var height = userDefinedSettings.height;
	var width = userDefinedSettings.width;
	var fontSize = userDefinedSettings.fontSize;
	var theme = userDefinedSettings.theme;
	var fontFamily = userDefinedSettings.fontFamily;
	var nativeSelectBoxRender = userDefinedSettings.renderNativeSelectBox || false;
	var nativeSelectBoxDisplay = userDefinedSettings.displayNativeSelectBox || false;
	var placeholder = userDefinedSettings.placeholder;
	var searchMode = userDefinedSettings.searchMode;
	var optionMenuWidth = userDefinedSettings.optionMenuWidth;
	var closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut;

	this.getCloseWhenCursorOut = function() {
		return closeWhenCursorOut;
	}

	this.getOptionMenuWidth = function() {
		return optionMenuWidth;
	}

	this.getSearchMode = function() {
		return searchMode;
	}

	this.isNativeSelectBoxToBeRendered = function() {
		return nativeSelectBoxRender;
	}

	this.isNativeSelectBoxToBeDisplayed = function() {
		return nativeSelectBoxDisplay;
	}

	this.getFontFamily = function() {
		return fontFamily;
	}

	this.getTheme = function() {
		return theme;
	}

	this.getFontSize = function() {
		return fontSize;
	}

	this.getHeight = function() {
		return height;
	}

	this.getWidth = function() {
		return width;
	}

	this.getTabIndex = function() {
		return tabIndex;
	}

	this.getSort = function() {
		return sort;
	}

	this.getOptionLimit = function() {
		return optionLimit;
	}

	this.getOnOptionChange = function() {
		return onOptionChange;
	}

	this.getOrientation = function() {
		return orientation;
	}

	this.setOptions = function(optionsObj) {
		options = optionsObj;
	}

	this.getOptions = function() {
		return options.clone();
	}

	this.getRootElement = function() {
		return rootElement;
	}

	this.getDefaultValue = function() {
		return defaultValue;
	}

	this.getPlaceholder = function() {
		return placeholder;
	}
};