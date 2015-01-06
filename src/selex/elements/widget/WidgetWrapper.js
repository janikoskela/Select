SELEX.ELEMENTS.WIDGET.Wrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex;

    this.tabIndex = Facade.publish("NativeSelectBox").getTabIndex() || 0;

    this.closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut || true;

    this.locked = false;

    this.render = function() {
        this.element = SELEX.UTILS.createElement(this.type, this.className);
        this.element.setAttribute("tabindex", this.tabIndex);
        if (userDefinedSettings.closeWhenCursorOut === true)
            this.element.addEventListener("mouseleave", onMouseLeave.bind(this));
        document.addEventListener("click", onMouseLeave.bind(this));
        this.element.addEventListener("click", function(e) {
            e.stopPropagation();
        });
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));

        var widgetSubWrapper = Facade.subscribe("WidgetSubWrapper", new SELEX.ELEMENTS.WIDGET.SubWrapper(Facade));
        var widgetSubWrapperElem = widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);

        var optionsMenu = Facade.subscribe("OptionsMenu", new SELEX.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(Facade));
        var optionsMenuElem = optionsMenu.render();
        this.element.appendChild(optionsMenuElem);

        return this.element;
    }

    this.lock = function() {
        this.locked = true;
    }

    this.unLock = function() {
        this.locked = false;
    }

    this.getElement = function() {
        return this.element;
    }

    this.getClass = function() {
        return this.className;
    }

    this.focus = function() {
        this.element.focus();
    }

    function onKeyDown(e) {
        if (this.locked === true)
            return;
        switch(e.keyCode) {
            case KEY_CODES.UP:
            case KEY_CODES.DOWN:
                e.preventDefault();
                break;
        }
        return false;
    }

    function onKeyUp(e) {
        if (this.locked === true)
            return;
        switch(e.keyCode) {
            case KEY_CODES.UP:
                Facade.publish("OptionsMenuList").hoverPreviousOption();
                break;
            case KEY_CODES.DOWN:
                Facade.publish("OptionsMenuList").hoverNextOption();
                break;
            case KEY_CODES.ENTER:
                Facade.publish("OptionsMenuList").selectHoveredOption();
                break;
            default:
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                Facade.publish("OptionsMenuList").searchByFirstChar(firstChar);
        }
    }

    function onMouseLeave(e) {
        Facade.publish("OptionsMenu").hide();
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

};