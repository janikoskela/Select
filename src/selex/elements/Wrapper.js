SELEX.ELEMENTS.Wrapper = function(userDefinedSettings) {

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
                this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(this);
                this.nativeSelectBox.attach();
                if (this.nativeSelectBox.isDisabled())
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
        if (this.width !== undefined)
            this.setWidth(this.width);
        else {
            var width = this.widgetWrapper.getOptionsMenu().getWidth();
            this.setWidth(width);
        }
        return this.element;
    }

    function renderWidget() {
        that.widgetWrapper = new SELEX.ELEMENTS.WIDGET.Wrapper(userDefinedSettings, that, that.nativeSelectBox);
        var widgetWrapperElem = that.widgetWrapper.render();
        that.element.appendChild(widgetWrapperElem);
        //that.widgetWrapper.getOptionsMenu().getOptionsMenuList().adjustHeight();
        that.widgetWrapper.getOptionsMenu().hide();
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
        this.widgetWrapper.getOptionsMenu().enableLoadingMode();
        this.widgetWrapper.getWidgetSubWrapper().enableLoadingMode();
    }

    this.disableLoadingMode = function() {
        this.loadingMode = false;
        this.widgetWrapper.getOptionsMenu().disableLoadingMode();
        this.widgetWrapper.getWidgetSubWrapper().disableLoadingMode();
    }

    this.getTargetElement = function() {
        return this.targetElement;
    }

    this.getNativeSelect = function() {
        return this.nativeSelectBox;
    }

    this.getWidgetWrapper = function() {
        return this.widgetWrapper;
    }

    this.show = function() {
        this.element.show();
    }

    this.hide = function() {
        this.element.hide();
    }

    this.enable = function() {
        this.element.removeAttribute("disabled");
    }

    this.disable = function() {
        this.element.setAttribute("disabled", true);
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }
};
