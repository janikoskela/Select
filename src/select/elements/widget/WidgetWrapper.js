SELECT.ELEMENTS.WIDGET.Wrapper = function(Sandbox) {

    var userDefinedSettings = Sandbox.publish("UserDefinedSettings");

    this.type = "div";

    this.className = "widget-wrapper";

    this.element;

    this.tabIndex = Sandbox.publish("NativeSelectBox").getTabIndex() || 0;

    this.closeWhenCursorOut = userDefinedSettings.closeWhenCursorOut || true;

    this.locked = false;

    this.positionLeft;

    this.positionTop;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        this.element.setAttribute("tabindex", this.tabIndex);
        if (userDefinedSettings.closeWhenCursorOut === true) {
            this.element.addEventListener("mouseleave", function(e) {
                var toElem = e.toElement;
                if (SELECT.UTILS.isEmpty(toElem)) {
                    Sandbox.publish("OptionsMenu:hide");
                    return;
                }
                var optionsMenuElem = Sandbox.publish("OptionsMenu:getElement");
                if (!SELECT.UTILS.isDescendant(optionsMenuElem, toElem) && toElem != optionsMenuElem)
                    Sandbox.publish("OptionsMenu:hide");
            });
        }
        document.addEventListener("click", function(e) {
            Sandbox.publish("OptionsMenu:hide");
        });
        this.element.addEventListener("click", function(e) {
            e.stopPropagation();
        });
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));
        this.element.addEventListener("touchmove", touchScroll.bind(this));
        this.element.addEventListener("scroll", touchScroll.bind(this));

        var widgetSubWrapper = Sandbox.subscribe("WidgetSubWrapper", new SELECT.ELEMENTS.WIDGET.SubWrapper(Sandbox));
        var widgetSubWrapperElem = widgetSubWrapper.render();
        this.element.appendChild(widgetSubWrapperElem);

        return this.element;
    }

    this.refresh = function() {
        var pos = this.getPosition();
        var top = pos.top;
        var left = pos.left;
        if (this.positionTop === undefined)
            this.positionTop = top;
        if (this.positionLeft === undefined)
            this.positionLeft = left;
        if (top !== this.positionTop || left != this.positionLeft) {
            Sandbox.publish("OptionsMenu").setPosition(left, top);
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
                Sandbox.publish("OptionsMenuList").hoverPreviousOption();
                break;
            case KEY_CODES.DOWN:
                Sandbox.publish("OptionsMenuList").hoverNextOption();
                break;
            case KEY_CODES.ENTER:
                Sandbox.publish("OptionsMenuList").selectHoveredOption();
                break;
            default:
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                Sandbox.publish("OptionsMenuList").searchByFirstChar(firstChar);
        }
        e.stopPropagation();
        e.preventDefault();
        return false;
    }

    function onMouseLeave(e) {
        Sandbox.publish("OptionsMenu:hide");
    }

    this.setTabIndex = function(tabIndex) {
        this.tabIndex = tabIndex;
        this.element.setAttribute("tabindex", tabIndex);
    }

    this.getWidthByLongestOption = function() {
        var options = Sandbox.publish("NativeSelectBox").getOptions();
        var origOption = Sandbox.publish("NativeSelectBox").getSelectedOption();
        var l = options.length;
        var widest = 0;
        for (var i = 0; i < l; i++) {
            var option = options[i];
            Sandbox.publish("NativeSelectBox").setSelectedOption(option.getValue());
            Sandbox.publish("ValueContainer:refresh");
            var width = Sandbox.publish("Wrapper:getElement").offsetWidth;
            if (width > widest) {
                widest = width;
            }
        }
        console.log(widest)
        Sandbox.publish("NativeSelectBox").setSelectedOption(origOption.value);
        Sandbox.publish("ValueContainer:refresh");
        return widest;
    }

};

SELECT.ELEMENTS.WIDGET.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);