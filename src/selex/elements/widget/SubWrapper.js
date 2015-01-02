SELEX.ELEMENTS.WIDGET.SubWrapper = function(userDefinedSettings, widgetWrapper, nativeSelectBox) {

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = userDefinedSettings.orientation || "right";

    this.element;

    this.arrowContainer;

    this.valueContainer;

    this.widgetWrapper = widgetWrapper;

    this.nativeSelectBox = nativeSelectBox;

    this.optionsMenu;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        this.element.addEventListener("click", onClick.bind(this));

        this.arrowContainer = new SELEX.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(userDefinedSettings);
        var arrowContainerElem = this.arrowContainer.render();

        this.valueContainer = new SELEX.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(userDefinedSettings, this);
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

    this.getNativeSelect = function() {
        return this.nativeSelectBox;
    }
    
    this.enableLoadingMode = function() {
        this.valueContainer.enableLoadingMode();
    }

    this.disableLoadingMode = function() {
        this.valueContainer.disableLoadingMode();
    }

    this.getWidgetWrapper = function() {
        return this.widgetWrapper;
    }

    this.getValueContainer = function() {
        return this.valueContainer;
    }

    this.getArrowContainer = function() {
        return this.arrowContainer;
    }

    function onClick(e) {
        if (this.nativeSelectBox.isDisabled() === false) {
            this.optionsMenu = this.widgetWrapper.getOptionsMenu();
            this.optionsMenu.toggle();
        }
    }

};