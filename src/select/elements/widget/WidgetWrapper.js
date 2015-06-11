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

    this.openOptionMenuUponHover = userDefinedSettings.openOptionMenuUponHover || false;

    this.render = function() {
        this.element = SELECT.UTILS.createElement(this.type, this.className);
        this.element.setAttribute("tabindex", this.tabIndex);
        if (userDefinedSettings.closeWhenCursorOut === true) {
            this.element.addEventListener("mouseleave", function(e) {
                var toElem = e.toElement || e.relatedTarget || e.target;
                var optionsMenuElem = Sandbox.publish("OptionsMenu:getElement");
                if ((!SELECT.UTILS.isElement(toElem)) || (!SELECT.UTILS.isDescendant(optionsMenuElem, toElem) && toElem != optionsMenuElem))
                    Sandbox.publish("OptionsMenu:hide");
            });
        }
        else {
            document.addEventListener("click", function(e) {
                var toElem = e.toElement || e.relatedTarget || e.target;
                var optionsMenuElem = Sandbox.publish("Wrapper:getElement");
                if ((!SELECT.UTILS.isElement(toElem)) || (!SELECT.UTILS.isDescendant(optionsMenuElem, toElem) && toElem != optionsMenuElem))
                    Sandbox.publish("OptionsMenu:hide");
            });
        }
        this.element.addEventListener("keyup", onKeyUp.bind(this));
        this.element.addEventListener("keydown", onKeyDown.bind(this));
        this.element.addEventListener("touchmove", touchScroll.bind(this));
        this.element.addEventListener("scroll", touchScroll.bind(this));
        if (this.openOptionMenuUponHover)
            this.element.addEventListener("mouseover", mouseOver.bind(this));
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
            var optionsMenu = Sandbox.publish("OptionsMenu");
            if (!SELECT.UTILS.isEmpty(optionsMenu))
                optionsMenu.setPosition(left, top);
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

    function mouseOver(e) {
        if (SELECT.UTILS.isEmpty(Sandbox.publish("OptionsMenu"))) {
            Sandbox.publish("WidgetSubWrapper:renderOptionMenu");
        }
        Sandbox.publish("OptionsMenu:show");
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
        if (Sandbox.publish("OptionsMenu") === undefined) {
            Sandbox.publish("WidgetSubWrapper:renderOptionMenu");
            Sandbox.publish("OptionsMenu:getElement").hide();
        }
        switch(e.keyCode) {
            case KEY_CODES.UP:
                Sandbox.publish("OptionsMenuList:hoverPreviousOption");
                break;
            case KEY_CODES.DOWN:
                Sandbox.publish("OptionsMenuList:hoverNextOption");
                break;
            case KEY_CODES.ENTER:
                Sandbox.publish("OptionsMenuList:selectHoveredOption");
                break;
            default:
                var firstChar = String.fromCharCode(e.which)[0].toLowerCase();
                Sandbox.publish("OptionsMenuList:searchByFirstChar", firstChar);
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
        var paddingRight = 28; //to avoid text having ellipsis. todo: calculate this
        var options = Sandbox.publish("NativeSelectBox").getOptions();
        var origOption = Sandbox.publish("NativeSelectBox").getSelectedOption();
        var l = options.length;
        var widest = 0;
        for (var i = 0; i < l; i++) {
            var option = options[i];
            var optionValue = option.getValue();
            var optionText = option.getText();
            var optionImgUrl = option.getImageUrl();
            Sandbox.publish("ValueContainerText:setText", optionText);
            Sandbox.publish("ValueContainerImage:setImageUrl", optionImgUrl);
            var width = Sandbox.publish("WidgetWrapper:getWidth");
            if (optionValue.length > width)
                width = optionValue;
            if (width > widest) {
                widest = width;
            }
        }
        if (SELECT.UTILS.isElement(origOption) || !SELECT.UTILS.isEmpty(origOption)) {
            Sandbox.publish("ValueContainerText:setText", origOption.text);
            Sandbox.publish("ValueContainerImage:setImageUrl", origOption.getDataAttribute("image-url"));
        }
        return widest + paddingRight;
    }

};

SELECT.ELEMENTS.WIDGET.Wrapper.prototype = Object.create(SELECT.ELEMENTS.Element.prototype);