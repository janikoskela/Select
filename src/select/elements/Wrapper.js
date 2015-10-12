SELECT.ELEMENTS.Wrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    var that = this;

    this.type = "div";

    this.theme = userDefinedSettings.theme || "select-js-theme-light";

    this.commonClassName = "select-widget";

    this.className = this.theme + " " + this.commonClassName;

    this.width = userDefinedSettings.width;

    this.widgetWrapper;

    this.element;

    this.el = userDefinedSettings.el;

    this.loadingMode = false;

    this.isWidthDefinedByUser;

    this.responsiveFallback = (userDefinedSettings.responsiveFallback === undefined) ? 640 : userDefinedSettings.responsiveFallback;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        if (!SELECT.UTILS.isElement(this.el))
            throw new SELECT.EXCEPTIONS.InvalidTargetElementErrorException();
        var tagName = this.el.tagName.toLowerCase();
        switch(tagName) {
            case ALLOWED_TARGET_ELEMENT_TAG_NAME_SELECT:
                var parentsParent = this.el.parentNode;
                var instance = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBox(Sandbox, this.el);
                Sandbox.subscribe("NativeSelectBox", instance).attach();
                if (instance.isDisabled())
                    this.disable();
                if (SELECT.UTILS.isElement(parentsParent))
                    parentsParent.insertBefore(this.element, this.el);
                this.element.appendChild(this.el);
                var nativeSelectBoxWrapper = new SELECT.ELEMENTS.NATIVE_SELECT.NativeSelectBoxWrapper(Sandbox);
                Sandbox.subscribe("NativeSelectBoxWrapper", nativeSelectBoxWrapper);
                var nativeSelectBoxWrapperEl = nativeSelectBoxWrapper.render();
                this.el.parentNode.replaceChild(nativeSelectBoxWrapperEl, this.el);
                nativeSelectBoxWrapperEl.appendChild(this.el);
                this.element.appendChild(nativeSelectBoxWrapperEl);
                if (userDefinedSettings.copyNativeClasses === true)
                    this.element.addClass(Sandbox.publish("NativeSelectBox:getClass"));
                break;
            default:
                throw new SELECT.EXCEPTIONS.InvalidTargetElementErrorException();
        }
        renderWidget();
        if (SELECT.UTILS.isEmpty(this.width)) {
            this.width = Sandbox.publish("WidgetWrapper:getWidthByLongestOption");
            this.isWidthDefinedByUser = false;
        }
        else
            this.isWidthDefinedByUser = true;
        if (this.width)
            this.setWidth(this.width);
        return this.element;
    }

    this.isNativeOptionListUsed = function() {
        if (this.responsiveFallback === true)
            return true;
        if (this.responsiveFallback > 0) {
            if (window.innerHeigth <= this.responsiveFallback || window.innerWidth <= this.responsiveFallback) {
                return true;
            }
        }
        return false;
    }

    function renderWidget() {
        var widgetWrapperInstance = Sandbox.subscribe("WidgetWrapper", new SELECT.ELEMENTS.WIDGET.Wrapper(Sandbox));
        var widgetWrapperElem = widgetWrapperInstance.render();
        that.element.appendChild(widgetWrapperElem);

        //we cannot allow tabindex to remain in given select since it would popup native option menu when not intended
        var tabIndex = Sandbox.publish("NativeSelectBox:getTabIndex");
        if (!SELECT.UTILS.isEmpty(tabIndex)) {
            Sandbox.publish("NativeSelectBox:removeTabIndex");
        }
    }

    this.isWidthDefinedByUser = function() {
        return this.isWidthDefinedByUser;
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

    this.getLoadingMode = function() {
        return this.loadingMode;
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
        var parent = this.element.parentNode;
        parent.insertBefore(this.el, this.element);
        this.remove();
    }

    this.setTheme = function(theme) {
        this.theme = theme;
        this.className = theme + " " + this.commonClassName;
        this.element.setClass(this.className);
    }

    this.remove = function() {
        Sandbox.publish("NativeSelectBox:detach");
        SELECT.UTILS.purge(Sandbox.publish("OptionsMenu:getElement")); //this isn't a child of wrapper
        SELECT.UTILS.purge(this.element);
        Sandbox.publish("OptionsMenu:remove");
        this.element.remove();
    }
};
SELECT.ELEMENTS.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);