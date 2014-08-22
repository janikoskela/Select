SELEX.ELEMENTS.WIDGET.Wrapper = function(onMouseLeaveCallback, onKeyDownCallback, onKeyUpCallback, onKeyEnterCallback, onSearchCallback) {

    this.type = "div";
    this.onMouseLeaveCallback = onMouseLeaveCallback;

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex;

    this.onKeyDownCallback = onKeyDownCallback;

    this.onKeyUpCallback = onKeyUpCallback;

    this.onKeyEnterCallback = onKeyEnterCallback;

    this.onSearchCallback = onSearchCallback;

    this.render = function() {
        this.element = document.createElement(this.type);
        this.element.setClass(this.className);
        this.element.addEventListener("mouseleave", onMouseLeave.bind(this));
        this.element.addEventListener("blur", onMouseLeave.bind(this));
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));
        return this.element;
    }

    this.getClass = function() {
        return this.className;
    }

    function onKeyDown(e) {
        switch(e.keyCode) {
            case KEY_CODES.UP:
            case KEY_CODES.DOWN:
                e.preventDefault();
                break;
        }
        return false;
    }

    function onKeyUp(e) {
        switch(e.keyCode) {
            case KEY_CODES.UP:
                if (typeof this.onKeyUpCallback === "function")
                    this.onKeyUpCallback(e);
                break;
            case KEY_CODES.DOWN:
                if (typeof this.onKeyDownCallback === "function")
                    this.onKeyDownCallback(e);
                break;
            case KEY_CODES.ENTER:
                if (typeof this.onKeyEnterCallback === "function")
                    this.onKeyEnterCallback(e);
                break;
            default:
                if (typeof this.onSearchCallback === "function")
                    this.onSearchCallback(e);
        }
    }

    function onMouseLeave(e) {
        if (typeof this.onMouseLeaveCallback === "function")
            this.onMouseLeaveCallback();
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

}