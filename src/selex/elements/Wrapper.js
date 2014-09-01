SELEX.ELEMENTS.Wrapper = function(theme, fontSize, fontFamily) {

    this.type = "div";

    this.className = theme || "plain";

    this.fontSize = fontSize || "12px";

    this.fontFamily = fontFamily || "verdana";

    this.width = undefined;

    this.element;

    this.render = function() {
        this.element = document.createElement(this.type);
        this.element.setClass(this.className);
        this.element.setStyle("fontSize", this.fontSize);
        this.element.setStyle("fontFamily", this.fontFamily);
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
}