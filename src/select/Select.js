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
	SELECT.SANDBOX = {};
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

		var Sandbox = new SELECT.SANDBOX.Sandbox();
		var that = this;

		init();

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELECT.EXCEPTIONS.InvalidOptionsErrorException();
			if (userDefinedSettings.el instanceof jQuery)
				userDefinedSettings.el = $(userDefinedSettings.el)[0];
			Sandbox.subscribe("UserDefinedSettings", userDefinedSettings);
			Sandbox.subscribe("Wrapper", new SELECT.ELEMENTS.Wrapper(Sandbox));
		}

		this.attach = function() {
			return Sandbox.publish("Wrapper:render");
		}

		this.hide = function() {
			Sandbox.publish("Wrapper:hide");
			return this;
		}

		this.show = function() {
			Sandbox.publish("Wrapper:show");
			return this;
		}

		this.detach = function() {
			Sandbox.publish("Wrapper:detach");
			return this;
		}

		this.disable = function() {
			Sandbox.publish("Wrapper:disable");
			return this;
		}

		this.enable = function() {
			Sandbox.publish("Wrapper:enable");
			return this;
		}

		this.toggleLoadingMode = function() {
			Sandbox.publish("Wrapper:toggleLoadingMode");
			return this;
		}

		this.toggleInputSearch = function() {
			Sandbox.publish("OptionsMenu:toggleInputSearch");
			return this;
		}

		this.isOptionMenuOpen = function() {
			var result = !Sandbox.publish("OptionsMenu:isHidden");
			if (SELECT.UTILS.isEmpty(result))
				return false;
			return result;
		}

		this.setTheme = function(theme) {
			Sandbox.publish("Wrapper:setTheme", theme);
			Sandbox.publish("OptionsMenu:setTheme", theme);
			return this;
		}

		this.getTheme = function() {
			return Sandbox.publish("Wrapper:getTheme");
		}

		this.remove = function() {
			Sandbox.publish("Wrapper:remove");
		}
	}

}(jQuery || {}));