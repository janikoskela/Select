SELEX.ELEMENTS.WIDGET.SubWrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = userDefinedSettings.orientation || "right";

    this.element;

    this.locked = false;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        this.element.addEventListener("click", onClick.bind(this));

        var arrowContainer = Facade.subscribe("ArrowContainer", new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(Facade));
        var arrowContainerElem = arrowContainer.render();

        var valueContainer = Facade.subscribe("ValueContainer", new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(Facade));
        var valueContainerElem = valueContainer.render();

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
    
    this.lock = function() {
        this.locked = true;
    }

    this.unLock = function() {
        this.locked = false;
    }

    function onClick(e) {
        if (this.locked === true)
            return;
        var nativeSelectBox = Facade.publish("NativeSelectBox");
        if (nativeSelectBox.isDisabled() === false)
            Facade.publish("OptionsMenu").toggle();
    }

};

SELEX.ELEMENTS.WIDGET.SubWrapper.prototype = Object.create(SELEX.ELEMENTS.Element.prototype);