(function () {

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
	SELEX.MEDIATOR = {};
	SELEX.ELEMENTS = {};
	SELEX.ELEMENTS.WIDGET = {};
	SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER = {};
	SELEX.ELEMENTS.WIDGET.OPTIONS_MENU = {};
	SELEX.EXCEPTIONS = {};

	Selex = function(userDefinedSettings) {

		this.wrapper;

		init(userDefinedSettings);

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELEX.EXCEPTIONS.InvalidOptionsErrorException();
			this.wrapper = new SELEX.ELEMENTS.Wrapper(userDefinedSettings);
			this.wrapper.render();
		}

		this.render = function() {
		}

		this.hide = function() {
		}

		this.show = function() {
		}

		this.getSelectedText = function() {
		}

		this.getSelectedValue = function() {
		}

		this.disable = function() {

		}

		this.enable = function() {

		}

		this.setOptions = function(options) {

		}

	}

}());