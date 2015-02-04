SELEX.ELEMENTS.Wrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    var that = this;

    this.type = "div";

    this.className = userDefinedSettings.theme || "plain";

    this.width = userDefinedSettings.width;

    this.widgetWrapper;

    this.element;

    this.targetElement = userDefinedSettings.targetElement;

    this.loadingMode = false;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        var tagName = this.targetElement.tagName.toLowerCase();
        switch(tagName) {
            case ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT:
                var instance = new SELEX.ELEMENTS.NativeSelectBox(Facade, this.targetElement);
                var nativeSelectBox = Facade.subscribe("NativeSelectBox", instance);
                nativeSelectBox.attach();
                if (nativeSelectBox.isDisabled())
                    this.disable();
                var parentsParent = this.targetElement.parentNode;
                parentsParent.insertBefore(this.element, this.targetElement);
                this.element.appendChild(this.targetElement);
                this.targetElement.hide();
                break;
            default:
                throw new SELEX.EXCEPTIONS.InvalidTargetElementErrorException();
        }
        renderWidget();
        if (this.width !== undefined) {
            this.setWidth(this.width);
            if (userDefinedSettings.optionMenuWidth === undefined)
                Facade.publish("OptionsMenu").setWidth(this.width);
        }
        else {
            var width = Facade.publish("OptionsMenu").getWidth();
            this.setWidth(width);
        }
        return this.element;
    }

    function renderWidget() {
        var widgetWrapperInstance = Facade.subscribe("WidgetWrapper", new SELEX.ELEMENTS.WIDGET.Wrapper(Facade));
        var widgetWrapperElem = widgetWrapperInstance.render();
        that.element.appendChild(widgetWrapperElem);
        Facade.publish("OptionsMenu").hide();
    }

    this.getWidth = function() {
        return this.width;
    }

    this.toggleLoadingMode = function() {
        if (this.loadingMode === false)
            this.enableLoadingMode();
        else
            this.disableLoadingMode();
    }

    this.enableLoadingMode = function() {
        this.loadingMode = true;
        Facade.publish("OptionsMenu:lock");
        Facade.publish("ValueContainer:enableLoadingMode");
        Facade.publish("WidgetWrapper:lock");
        Facade.publish("WidgetSubWrapper:lock");
        Facade.publish("ValueContainerImage:hide");
    }

    this.disableLoadingMode = function() {
        this.loadingMode = false;
        Facade.publish("OptionsMenu:unLock");
        Facade.publish("ValueContainer:disableLoadingMode");
        Facade.publish("WidgetWrapper:unLock");
        Facade.publish("WidgetSubWrapper:unLock");
        Facade.publish("ValueContainerImage:show");
    }

    this.show = function() {
        this.element.show();
    }

    this.hide = function() {
        this.element.hide();
    }

    this.enable = function() {
        this.element.removeAttribute("disabled");
        Facade.publish("WidgetWrapper:unLock");
        Facade.publish("WidgetSubWrapper:unLock");
        Facade.publish("OptionsMenu:unLock");
        Facade.publish("WidgetWrapper:enableTabNavigation");
    }

    this.disable = function() {
        this.element.setAttribute("disabled", true);
        Facade.publish("WidgetWrapper:lock");
        Facade.publish("WidgetSubWrapper:lock");
        Facade.publish("OptionsMenu:lock");
        Facade.publish("WidgetWrapper:disableTabNavigation");
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }

    this.detach = function() {
        var parent = this.element.parentNode;
        this.targetElement.show();
        parent.insertBefore(this.targetElement, this.element);
        this.element.remove();
    }
};
SELEX.ELEMENTS.Wrapper.prototype = Object.create(SELEX.ELEMENTS.Element.prototype);