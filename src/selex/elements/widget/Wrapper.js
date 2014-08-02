SELEX.ELEMENTS.CUSTOM_GUI.Wrapper = function(onMouseLeaveCallback) {

    this.type = "div";
    this.onMouseLeaveCallback = onMouseLeaveCallback;

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex;

    this.render = function() {
        this.element = document.createElement(this.type);
        this.element.setClass(this.className);
        this.element.addEventListener("mouseleave", this.onMouseLeave.bind(this));
        return this.element;
    }

    this.onMouseLeave = function() {
        if (typeof this.onMouseLeaveCallback === "function")
            this.onMouseLeaveCallback();
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

}