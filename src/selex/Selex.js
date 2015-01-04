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

		var that = this;

		this.wrapper;

		init(userDefinedSettings);

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELEX.EXCEPTIONS.InvalidOptionsErrorException();
			that.wrapper = new SELEX.ELEMENTS.Wrapper(userDefinedSettings);
		}

		this.attach = function() {
			this.wrapper.render();
			return this;
		}

		this.hide = function() {
			this.wrapper.hide();
			return this;
		}

		this.show = function() {
			this.wrapper.show();
			return this;
		}

		this.detach = function() {
			this.wrapper.detach();
		}

		this.disable = function() {
			this.wrapper.disable();
			return this;
		}

		this.enable = function() {
			this.wrapper.enable();
			return this;
		}

		this.toggleLoadingMode = function() {
			this.wrapper.toggleLoadingMode();
		}
	}

}(jQuery));