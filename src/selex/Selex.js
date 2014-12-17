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

		var that = this;

		this.wrapper;

		init(userDefinedSettings);

		function init() {
			if (typeof userDefinedSettings !== "object")
				throw new SELEX.EXCEPTIONS.InvalidOptionsErrorException();
			that.wrapper = new SELEX.ELEMENTS.Wrapper(userDefinedSettings);
		}

		this.render = function() {
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

		this.getSelectedText = function() {
			var option = this.getSelectedOption();
			if (option == undefined)
				return;
			return option.getText();
		}

		this.getSelectedValue = function() {
			var option = this.getSelectedOption();
			if (option == undefined)
				return;
			return option.getValue();
		}

		this.getSelectedOption = function() {
			return this.wrapper.getWidgetWrapper().getOptionsMenu().getOptionsMenuList().getSelectedOption();
		}

		this.disable = function() {
			this.wrapper.disable();
			return this;
		}

		this.enable = function() {
			this.wrapper.enable();
			return this;
		}

		this.setOptions = function(options) {

		}

	}

}());