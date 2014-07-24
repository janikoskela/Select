(function () {

	Selex = function(userDefinedSettings) {

		var settings = new SELEX.SETTINGS.Settings(userDefinedSettings);
		var mediator = new SELEX.MEDIATOR.Mediator(settings);

		this.render = function() {
			mediator.render();
		}

		this.hide = function() {
			mediator.hide();
		}

		this.show = function() {
			mediator.show();
		}

		this.getSelectedText = function() {
			return mediator.selectedText;
		}

		this.getSelectedValue = function() {
			return mediator.selectedValue;
		}

	}

	var SELEX = {};
	SELEX.SETTINGS = {};
	SELEX.ELEMENTS = {};
	SELEX.ELEMENTS.CUSTOM_GUI = {};
	SELEX.ELEMENTS.CUSTOM_GUI.VALUE_CONTAINER = {};
	SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER = {};

}());