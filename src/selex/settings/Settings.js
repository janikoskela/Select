SELEX.Settings = function(userDefinedSettings){
	var options = userDefinedSettings.options || [];
	var rootElement = userDefinedSettings.targetElement || undefined;
	var defaultValue = userDefinedSettings.defaultValue || undefined;
	var orientation = userDefinedSettings.orientation || "right";
	var onOptionChange = userDefinedSettings.onOptionChange || undefined;
	var optionLimit = userDefinedSettings.optionLimit;
	var sort = userDefinedSettings.sort || undefined;
	var tabIndex = userDefinedSettings.tabIndex || 0;
	var height = userDefinedSettings.height || undefined;
	var width = userDefinedSettings.width || undefined;
	var fontSize = userDefinedSettings.fontSize || undefined;
	var theme = userDefinedSettings.theme || "basic";
	var fontFamily = userDefinedSettings.fontFamily;
	var nativeSelectBoxRender = userDefinedSettings.renderNativeSelectBox || false;
	var nativeSelectBoxDisplay = userDefinedSettings.displayNativeSelectBox || false;

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
		return options;
	}

	this.getRootElement = function() {
		return rootElement;
	}

	this.getDefaultValue = function() {
		return defaultValue;
	}
}