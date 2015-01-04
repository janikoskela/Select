SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function(Facade) {

	this.type = "div";
	this.element;
	this.className = "arrow-container";

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.setClass(this.className);
		var arrowContainerContentInstance = Facade.subscribe("ArrowContainerContent", new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent(Facade));
		var elem = arrowContainerContentInstance.render();
		this.element.appendChild(elem);
		return this.element;
	}

	this.getElement = function() {
		return this.element;
	}

	this.getWidth = function() {
		return this.element.offsetWidth;
	}
};