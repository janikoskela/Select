SELEX.ELEMENTS.WIDGET.SubWrapper = function(params) {

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = params.orientation || "right";

    this.element;

    this.arrowContainer;

    this.valueContainer;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
        this.element.setClass(this.className);
        this.element.addEventListener("click", onClick.bind(this));

        this.arrowContainer = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(params);
        var arrowContainerElem = this.arrowContainer.render();

        this.valueContainer = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(params);
        var valueContainerElem = this.valueContainer.render();


        switch (this.orientation) {
            case ORIENTATION_LEFT:
                this.element.appendChild(arrowContainerElem);
                arrowContainerElem.setStyle("float", this.orientation);
                this.element.appendChild(valueContainerElem);
                break;
            case ORIENTATION_RIGHT:
                this.element.appendChild(valueContainerElem);
                this.element.appendChild(arrowContainerElem);
                arrowContainerElem.setStyle("float", this.orientation);
                break;
            default:
                throw Error("Invalid orientation value \"" + this.orientation + "\"");

        }

        return this.element;
    }

    function onClick(e) {

    }

};