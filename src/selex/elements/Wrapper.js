SELEX.ELEMENTS.Wrapper = function(params) {

    var that = this;

    this.type = "div";

    this.className = params.theme;

    this.fontSize = params.fontSize;

    this.fontFamily = params.fontFamily;

    this.width = params.width || "100%";

    this.renderNativeSelectBox = params.renderNativeSelectBox || false;

    this.displayNativeSelectBox = params.displayNativeSelectBox || false;

    this.widgetWrapper;

    this.element;

    this.parentElement = params.targetElement;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        this.setWidth(this.width);
        if (this.fontSize !== undefined)
            this.element.setStyle("fontSize", this.fontSize);
        if (this.fontFamily !== undefined)
            this.element.setStyle("fontFamily", this.fontFamily);
        switch(this.parentElement.tagName) {
            case "SELECT":
                this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(params).createFromExistingSelect(this.parentElement, this);
                var parentsParent = this.parentElement.parentNode;
                parentsParent.insertBefore(this.element, this.parentElement);
                this.element.appendChild(this.parentElement);
                //this.parentElement.prependTo(this.element);
                //this.parentElement.hide();
                //parentsParent.appendChild(this.element);
                params.options = parseOptionsFromElement(this.parentElement);
                this.parentElement.hide();
                break;
            default:
                this.parentElement.appendChild(this.element);
                this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(params, this);
                var nativeSelectBoxElem = this.nativeSelectBox.render();
                this.element.appendChild(nativeSelectBoxElem);
                this.nativeSelectBox.hide();
        }
        renderWidget();
        return this.element;
    }

    function renderWidget() {
        that.widgetWrapper = new SELEX.ELEMENTS.WIDGET.Wrapper(params, that);
        var widgetWrapperElem = that.widgetWrapper.render();
        that.element.appendChild(widgetWrapperElem);
        that.widgetWrapper.getOptionsMenu().getOptionsMenuList().adjustHeight();
        that.widgetWrapper.getOptionsMenu().hide();
    }

    function parseOptionsFromElement(elem) {
        var options = [];
        for (var i = 0; i < elem.options.length; i++) {
            var option = elem.options[i];
            var optionValue = option.value;
            var optionText = option.text;
            var optionSelected = (option.getAttribute("selected") === null) ? false : true;
            options.push({ value: optionValue, text: optionText, selected: optionSelected });
        }
        return options;
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
        this.element.removeDataAttribute("disabled");
    }

    this.disable = function() {
        this.element.setDataAttribute("disabled", true);
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }
};
