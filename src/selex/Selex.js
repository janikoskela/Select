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
	var SELEX = {};
	SELEX.CONFIG = {};
	SELEX.UTILS = {};
	SELEX.HELPERS = {};
	SELEX.SETTINGS = {};
	SELEX.ELEMENTS = {};
	SELEX.ELEMENTS.WIDGET = {};
	SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.OPTIONS_MENU = {};
	SELEX.ELEMENTS.WIDGET.LOADING_OVERLAY = {};
	SELEX.EXCEPTIONS = {};
	var MUTATION_OBSERVER = window.MutationObserver || window.WebKitMutationObserver;
	var ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT = "select";

	Selex = function(userDefinedSettings) {

		var Facade = new SELEX.Facade();
		var that = this;
		init();

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELEX.EXCEPTIONS.InvalidOptionsErrorException();
			Facade.subscribe("UserDefinedSettings", userDefinedSettings);
			Facade.subscribe("Wrapper", new SELEX.ELEMENTS.Wrapper(Facade));
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
	}

}(jQuery || {}));