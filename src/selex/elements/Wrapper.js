SELEX.ELEMENTS.Wrapper = function(theme, fontSize, fontFamily) {

    this.type = "div";

    this.className = theme || "selex";

    this.fontSize = fontSize || "12px";

    this.fontFamily = fontFamily || "verdana";

    this.width = "100%";

    this.element;

    this.render = function() {
        this.element = document.createElement(this.type);
        this.element.setClass(this.className);
        this.element.setStyle("fontSize", this.fontSize);
        this.element.setStyle("fontFamily", this.fontFamily);
        return this.element;
    }

    this.setWidth = function(width) {
        this.width = width;
        this.element.setStyle("width", this.width);
    }
}