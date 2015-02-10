SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function(Facade) {

	this.type = "div";
	this.element;
	this.className = "arrow-container";

	this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type);
		this.element.setClass(this.className);
		var arrowContainerContentInstance = Facade.subscribe("ArrowContainerContent", new SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent(Facade));
		var elem = arrowContainerContentInstance.render();
		this.element.appendChild(elem);
		return this.element;
	}
};

SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);