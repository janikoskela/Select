SELECT.ELEMENTS.Wrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    var that = this;

    this.type = "div";

    this.theme = userDefinedSettings.theme || "default";

    this.commonClassName = "select-widget";

    this.className = this.theme + " " + this.commonClassName;

    this.width = userDefinedSettings.width;

    this.widgetWrapper;

    this.element;

    this.el = userDefinedSettings.el;

    this.loadingMode = false;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        var tagName = this.el.tagName.toLowerCase();
        switch(tagName) {
            case ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT:
                var parentsParent = this.el.parentNode;
                var instance = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox(Sandbox, this.el);
                Sandbox.subscribe("NativeSelectBox", instance).attach();
                if (instance.isDisabled())
                    this.disable();
                parentsParent.insertBefore(this.element, this.el);
                this.element.appendChild(this.el);
                var nativeSelectBoxWrapper = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper(Sandbox);
                var nativeSelectBoxWrapperEl = nativeSelectBoxWrapper.render();
                this.el.parentNode.replaceChild(nativeSelectBoxWrapperEl, this.el);
                nativeSelectBoxWrapperEl.appendChild(this.el);
                this.element.appendChild(nativeSelectBoxWrapperEl);
                break;
            default:
                throw new SELECT.EXCEPTIONS.InvalidTargetElementErrorException();
        }
        renderWidget();
        if (SELECT.UTILS.isEmpty(this.width)) {
            this.width = getWidthByLongestOption();
        }
        if (this.width > 0)
            this.setWidth(this.width);
        return this.element;
    }

    function renderWidget() {
        var widgetWrapperInstance = Sandbox.subscribe("WidgetWrapper", new SELECT.ELEMENTS.WIDGET.Wrapper(Sandbox));
        var widgetWrapperElem = widgetWrapperInstance.render();
        that.element.appendChild(widgetWrapperElem);
    }

    this.getTheme = function() {
        return this.theme;
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
        Sandbox.publish("OptionsMenu:lock");
        Sandbox.publish("ValueContainer:enableLoadingMode");
        Sandbox.publish("WidgetWrapper:lock");
        Sandbox.publish("WidgetSubWrapper:lock");
        Sandbox.publish("ValueContainerImage:hide");
    }

    this.disableLoadingMode = function() {
        this.loadingMode = false;
        Sandbox.publish("OptionsMenu:unLock");
        Sandbox.publish("ValueContainer:disableLoadingMode");
        Sandbox.publish("WidgetWrapper:unLock");
        Sandbox.publish("WidgetSubWrapper:unLock");
        Sandbox.publish("ValueContainerImage:show");
    }

    this.show = function() {
        this.element.show();
    }

    this.hide = function() {
        this.element.hide();
    }

    this.enable = function() {
        this.element.removeAttribute("disabled");
        Sandbox.publish("WidgetWrapper:unLock");
        Sandbox.publish("WidgetSubWrapper:unLock");
        Sandbox.publish("OptionsMenu:unLock");
        Sandbox.publish("WidgetWrapper:enableTabNavigation");
    }

    this.disable = function() {
        this.element.setAttribute("disabled", true);
        Sandbox.publish("WidgetWrapper:lock");
        Sandbox.publish("WidgetSubWrapper:lock");
        Sandbox.publish("OptionsMenu:lock");
        Sandbox.publish("WidgetWrapper:disableTabNavigation");
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }

    this.detach = function() {
        Sandbox.publish("NativeSelectBox:detach");
        Sandbox.publish("WidgetWrapper:detach");
        var parent = this.element.parentNode;
        parent.insertBefore(this.el, this.element);
        this.element.remove();
    }

    this.setTheme = function(theme) {
        this.theme = theme;
        this.className = theme + " " + this.commonClassName;
        this.element.setClass(this.className);
    }

    function getWidthByLongestOption() {
        var options = Sandbox.publish("NativeSelectBox").getOptions();
        var origOption = Sandbox.publish("NativeSelectBox").getSelectedOption();
        var l = options.length;
        var widest = 0;
        for (var i = 0; i < l; i++) {
            var option = options[i];
            Sandbox.publish("NativeSelectBox").setSelectedOption(option.getValue());
            Sandbox.publish("ValueContainer:refresh");
            var width = this.element.offsetWidth;
            if (width > widest) {
                widest = width;
            }
        }
        Sandbox.publish("NativeSelectBox").setSelectedOption(origOption.value);
        Sandbox.publish("ValueContainer:refresh");
        return widest;
    }
};
SELECT.ELEMENTS.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);