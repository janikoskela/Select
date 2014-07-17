(function () {

	Selex = function(userDefinedSettings) {

		var settings = new SELEX.Settings(userDefinedSettings);
		var mediator = new SELEX.Mediator(settings);

		this.render = function() {
			mediator.render();
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