SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer = function(params) {

	this.type = "div";
	this.element;
	this.className = "arrow-container";
	this.arrowContainerContent;

	this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
		this.element.setClass(this.className);

		this.arrowContainerContent = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainerContent(params);
		var elem = this.arrowContainerContent.render();

		this.element.appendChild(elem);
		return this.element;
	}

	this.getArrowContainerContent = function() {
		return this.arrowContainerContent;
	}

	this.getElement = function() {
		return this.element;
	}

	this.getWidth = function() {
		return this.element.offsetWidth;
	}
};