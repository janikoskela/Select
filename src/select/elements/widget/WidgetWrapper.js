SELECT.ELEMENTS.WIDGET.Wrapper = function(Facade) {

    var userDefinedSettings = Facade.publish("UserDefinedSettings");

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex = Facade.publish("NativeSelectBox").getTabIndex() || 0;

    this.closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut || true;

    this.locked = false;

    this.poller;

    this.positionLeft;

    this.positionTop;

    this.pollingInterval = userDefinedSettings.optionMenuPositionRefreshRate || 500;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        this.element.setAttribute("tabindex", this.tabIndex);
        if (userDefinedSettings.closeWhenCursorOut === true) {
            this.element.addEventListener("mouseleave", function(e) {
                var toElem = e.toElement;
                if (SELECT.UTILS.isEmpty(toElem)) {
                    Facade.publish("OptionsMenu:hide");
                    return;
                }
                var optionsMenuElem = Facade.publish("OptionsMenu:getElement");
                if (!SELECT.UTILS.isDescendant(optionsMenuElem, toElem) && toElem != optionsMenuElem)
                    Facade.publish("OptionsMenu:hide");
            });
        }
        document.addEventListener("click", function(e) {
            Facade.publish("OptionsMenu:hide");
        });
        this.element.addEventListener("click", function(e) {
            e.stopPropagation();
        });
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));
        this.element.addEventListener("touchmove", touchScroll.bind(this));
        this.element.addEventListener("scroll", touchScroll.bind(this));

        var widgetSubWrapper = Facade.subscribe("WidgetSubWrapper", new SELECT.ELEMENTS.WIDGET.SubWrapper(Facade));
        var widgetSubWrapperElem = widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);

        var optionsMenu = Facade.subscribe("OptionsMenu", new SELECT.ELEMENTS.WIDGET.OPTIONS_MENU.OptionsMenu(Facade));
        var optionsMenuElem = optionsMenu.render();
        document.body.appendChild(optionsMenuElem);
        this.poller = setInterval(this.poll.bind(this), this.pollingInterval);

        return this.element;
    }

    this.detach = function() {
        if (this.poller !== undefined)
            clearInterval(this.poller);
    }

    this.poll = function() {
        var pos = this.getPosition();
        var top = pos.top;
        var left = pos.left;
        if (this.positionTop === undefined)
            this.positionTop = top;
        if (this.positionLeft === undefined)
            this.positionLeft = left;
        if (top !== this.positionTop || left != this.positionLeft) {
            Facade.publish("OptionsMenu").setPosition(left, top);
            this.positionLeft = left;
            this.positionTop = top;
        }
    }

    this.getPosition = function() {
        return SELECT.UTILS.getElementPosition(this.element);
    }

    this.lock = function() {
        this.locked = true;
    }

    this.unLock = function() {
        this.locked = false;
    }

    this.enableTabNavigation = function() {
        this.element.setAttribute("tabindex", this.tabIndex);
    }

    function touchScroll(e) {
        e.stopPropagation();
        return false;
    }

    function onKeyDown(e) {
        if (this.locked === true)
            return;
        switch(e.keyCode) {
            case KEY_CODES.UP:
            case KEY_CODES.DOWN:
                e.preventDefault();
                e.stopPropagation();
                break;
        }
        return false;
    }

    function onKeyUp(e) {
        if (this.locked === true)
            return false;
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
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    function onMouseLeave(e) {
        Facade.publish("OptionsMenu:hide");
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

};

SELECT.ELEMENTS.WIDGET.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);