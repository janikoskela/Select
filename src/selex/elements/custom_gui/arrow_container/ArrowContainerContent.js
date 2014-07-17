SELEX.ELEMENTS.CUSTOM_GUI.ARROW_CONTAINER.ArrowContainerContent = function() {

	var CLASS_NAME_ARROW_DOWN = "arrow-down";
	var CLASS_NAME_ARROW_UP = "arrow-up";

	this.type = "div";
	this.element;
	this.className = CLASS_NAME_ARROW_DOWN;

	this.render = function() {
		this.element = document.createElement(this.type);
		this.element.setClass(this.className);
		return this.element;
	}

	this.getElement = function() {
		return this.element;
	}

	this.toggleClass = function() {
		if (this.className === CLASS_NAME_ARROW_DOWN) {
			this.className = CLASS_NAME_ARROW_UP;
			this.element.setClass(CLASS_NAME_ARROW_UP);
		}
		else {
			this.className = CLASS_NAME_ARROW_DOWN;
			this.element.setClass(CLASS_NAME_ARROW_DOWN);
		}
	}
}