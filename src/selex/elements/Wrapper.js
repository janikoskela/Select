SELEX.ELEMENTS.Wrapper = function(params) {

    this.type = "div";

    this.className = params.theme || "plain";

    this.fontSize = params.fontSize;

    this.fontFamily = params.fontFamily;

    this.width = undefined;

    this.renderNativeSelectBox = params.renderNativeSelectBox || false;

    this.displayNativeSelectBox = params.displayNativeSelectBox || false;

    this.widgetWrapper;

    this.element;

    this.parentElement = params.targetElement;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
        this.element.setClass(this.className);
        if (this.fontSize !== undefined)
            this.element.setStyle("fontSize", this.fontSize);
        if (this.fontFamily !== undefined)
            this.element.setStyle("fontFamily", this.fontFamily);
        this.parentElement.appendChild(this.element);

        if (this.renderNativeSelectBox === true) {
            this.nativeSelectBox = new SELEX.ELEMENTS.NativeSelectBox(params);
            var nativeSelectBoxElem = this.nativeSelectBox.render();
            this.element.appendChild(nativeSelectBoxElem);
        }
        if (this.renderNativeSelectBox === false || (this.displayNativeSelectBox === false && this.renderNativeSelectBox === true)) {
            this.widgetWrapper = new SELEX.ELEMENTS.WIDGET.Wrapper(params);
            var widgetWrapperElem = this.widgetWrapper.render();
            this.element.appendChild(widgetWrapperElem);
        }

        return this.element;
    }

    this.show = function() {
        this.element.show();
    }

    this.hide = function() {
        this.element.hide();
    }

    this.enable = function() {
        this.element.removeAttribute("data-disabled");
    }

    this.disable = function() {
        this.element.setAttribute("data-disabled", true);
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }
};