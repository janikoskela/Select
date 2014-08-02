SELEX.ELEMENTS.WIDGET.SubWrapper = function(callback) {

    this.type = "div";

    this.className = "widget-sub-wrapper";

    this.element;
    this.callback = callback;

    this.render = function() {
        this.element = document.createElement(this.type);
        this.element.setClass(this.className);
        this.element.addEventListener("click", onClick.bind(this));
        return this.element;
    }

    function onClick(e) {
        if (typeof this.callback === "function")
            this.callback();
    }

}