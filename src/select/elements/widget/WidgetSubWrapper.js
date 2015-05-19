SELECT.ELEMENTS.WIDGET.SubWrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    var ORIENTATION_LEFT = "left";

    var ORIENTATION_RIGHT = "right";

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.orientation = userDefinedSettings.orientation || "right";

    this.element;

    this.locked = false;

    this.renderOptionMenuToBody = userDefinedSettings.renderOptionMenuToBody || false;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        this.element.addEventListener("click", onClick.bind(this));

        var arrowContainer = Sandbox.subscribe("ArrowContainer", new SELECT.ELEMENTS.WIDGET.ARROW_CONTAINER.ArrowContainer(Sandbox));
        var arrowContainerElem = arrowContainer.render();

        var valueContainer = Sandbox.subscribe("ValueContainer", new SELECT.ELEMENTS.WIDGET.VALUE_CONTAINER.ValueContainer(Sandbox));
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

    this.isNativeOptionListUsed = function() {
        return this.useNativeOptionList;
    }

    this.renderOptionMenu = function() {
        var optionsMenu = Sandbox.subscribe("OptionsMenu", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(Sandbox));
        var optionsMenuElem = optionsMenu.render();
        if (this.renderOptionMenuToBody) {
            document.body.appendChild(optionsMenuElem);
        }
        else
            Sandbox.publish("WidgetWrapper:getElement").appendChild(optionsMenuElem);
        if (Sandbox.publish("OptionsMenu").useAnimations === true)
            Sandbox.publish("OptionsMenu:slideUp", Sandbox.publish("OptionsMenu").animationSpeed); //animations wont work otherwise
    }

    function onClick(e) {
        if (this.locked === true || Sandbox.publish("NativeSelectBox:isDisabled"))
            return;
        if (Sandbox.publish("Wrapper:isNativeOptionListUsed")) {
            Sandbox.publish("NativeSelectBox:open");
            return;
        }
        if (Sandbox.publish("OptionsMenu") === undefined) {
            this.renderOptionMenu();
        }
        Sandbox.publish("OptionsMenu:toggle");
    }

};

SELECT.ELEMENTS.WIDGET.SubWrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);