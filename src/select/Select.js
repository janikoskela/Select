(function ($) {
	var SEARCH_MODES = {};
	SEARCH_MODES.BY_FIRST_KEY = "firstKey";
	var KEY_CODES = {};
	KEY_CODES.UP = 38;
	KEY_CODES.DOWN = 40;
	KEY_CODES.ENTER = 13;
	var SORT_TYPES = {};
	SORT_TYPES.ASC = "asc";
	SORT_TYPES.DESC = "desc";
	var SELECT = {};
	SELECT.CONFIG = {};
	SELECT.UTILS = {};
	SELECT.HELPERS = {};
	SELECT.SETTINGS = {};
	SELECT.ELEMENTS = {};
	SELECT.ELEMENTS.WIDGET = {};
	SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER = {};
	SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER = {};
	SELECT.ELEMENTS.WIDGET.OPTIONS_MENU = {};
	SELECT.ELEMENTS.WIDGET.LOADING_OVERLAY = {};
	SELECT.ELEMENTS.NATIVE_SELECT = {};
	SELECT.EXCEPTIONS = {};
	var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver;
	var ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT = "select";

	Select = function(userDefinedSettings) {

		var Facade = new SELECT.Facade();
		var that = this;
		init();

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELECT.EXCEPTIONS.InvalidOptionsErrorException();
			if (userDefinedSettings.el instanceof jQuery)
				userDefinedSettings.el = $(userDefinedSettings.el)[0];
			Facade.subscribe("UserDefinedSettings", userDefinedSettings);
			Facade.subscribe("Wrapper", new SELECT.ELEMENTS.Wrapper(Facade));
		}

		this.attach = function() {
			Facade.publish("Wrapper:render");
			return this;
		}

		this.hide = function() {
			Facade.publish("Wrapper:hide");
			return this;
		}

		this.show = function() {
			Facade.publish("Wrapper:show");
			return this;
		}

		this.detach = function() {
			Facade.publish("Wrapper:detach");
			return this;
		}

		this.disable = function() {
			Facade.publish("Wrapper:disable");
			return this;
		}

		this.enable = function() {
			Facade.publish("Wrapper:enable");
			return this;
		}

		this.toggleLoadingMode = function() {
			Facade.publish("Wrapper:toggleLoadingMode");
			return this;
		}

		this.toggleInputSearch = function() {
			Facade.publish("OptionsMenu:toggleInputSearch");
			return this;
		}

		this.isOptionMenuOpen = function() {
			var result = !Facade.publish("OptionsMenu:isHidden");
			if (SELECT.UTILS.isEmpty(result))
				return false;
			return result;
		}
	}

}(jQuery || {}));