SELEX.ELEMENTS.WIDGET.Wrapper = function(params, wrapper) {

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex = params.tabIndex;

    this.widgetSubWrapper;

    this.optionsMenu;

    this.wrapper = wrapper;

    this.closeWhenCursorOut = params.closeWhenCursorOut || true;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type);
        this.element.setClass(this.className);
        if (this.tabIndex !== undefined)
            this.element.setAttribute("tabindex", this.tabIndex);
        if (this.closeWhenCursorOut) {
            this.element.addEventListener("mouseleave", onMouseLeave.bind(this));
            this.element.addEventListener("blur", onMouseLeave.bind(this));
        }
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));

        this.widgetSubWrapper = new SELEX.ELEMENTS.WIDGET.SubWrapper(params, this);
        var widgetSubWrapperElem = this.widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);


        this.optionsMenu = new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(params, this);
        var optionsMenuElem = this.optionsMenu.render();
        this.element.appendChild(optionsMenuElem);

        return this.element;
    }

    this.getWidgetSubWrapper = function() {
        return this.widgetSubWrapper;
    }

    this.getOptionsMenu = function() {
        return this.optionsMenu;
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
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                this.optionsMenu.searchByFirstChar(firstChar);
        }
    }

    function onMouseLeave(e) {
        this.optionsMenu.hide();
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

};