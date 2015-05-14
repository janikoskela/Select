SELECT.ELEMENTS.Element = function() {};

SELECT.ELEMENTS.Element.prototype.hide = function() {
	this.element.hide();
};

SELECT.ELEMENTS.Element.prototype.show = function() {
	this.element.show();
};

SELECT.ELEMENTS.Element.prototype.getElement = function() {
	return this.element;
};

SELECT.ELEMENTS.Element.prototype.focus = function() {
	return this.element.focus();
};

SELECT.ELEMENTS.Element.prototype.blur = function() {
	return this.element.blur();
};

SELECT.ELEMENTS.Element.prototype.getClass = function() {
	return this.element.className;
};

SELECT.ELEMENTS.Element.prototype.getWidth = function() {
    var style = window.getComputedStyle(this.element);
    var display = style.display;
    var position = style.position;
    var visibility = style.visibility;
    var maxWidth = style.maxWidth.replace('px', '').replace('%', '');
    var wantedWidth = 0;

    // if its not hidden we just return normal height
    if (display !== 'none' && maxWidth !== '0') {
        return this.element.offsetWidth;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    this.element.style.position   = 'absolute';
    this.element.style.visibility = 'hidden';
    this.element.style.display    = 'block';

    wantedWidth     = this.element.offsetWidth;

    // reverting to the original values
    this.element.style.display = display;
    this.element.style.position   = position;
    this.element.style.visibility = visibility;
    return wantedWidth;
};

SELECT.ELEMENTS.Element.prototype.getHeight = function() {
    var style = window.getComputedStyle(this.element);
    var display = style.display;
    var position = style.position;
    var visibility = style.visibility;
    var maxHeight = style.maxHeight.replace('px', '').replace('%', '');
    var wantedHeight = 0;

    // if its not hidden we just return normal height
    if (display !== 'none' && maxHeight !== '0') {
        return this.element.offsetHeight;
    }

    // the element is hidden so:
    // making the el block so we can meassure its height but still be hidden
    this.element.style.position   = 'absolute';
    this.element.style.visibility = 'hidden';
    this.element.style.display    = 'block';

    wantedHeight     = this.element.offsetHeight;

    // reverting to the original values
    this.element.style.display = display;
    this.element.style.position   = position;
    this.element.style.visibility = visibility;
    return wantedHeight;
};

SELECT.ELEMENTS.Element.prototype.slideUp = function(speed) {
    var el_max_height = 0;
    var el = this.element;
    if (speed == undefined)
        speed = 200;
    speed /= 1000;
    if(el.getAttribute('data-max-height')) {
        this.element.setDataAttribute("slide", "up");
            el.style.maxHeight = '0';
    } else {
        el_max_height                  = this.getHeight() + 'px';
        el.style['transition']         = 'max-height ' + speed + 's ease-in-out';
        el.style.overflowY             = 'hidden';
        el.style.maxHeight             = '0';
        el.setAttribute('data-max-height', el_max_height);
        el.style.display               = 'block';

        // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
        setTimeout(function() {
            el.style.maxHeight = el_max_height;
        }, 10);
    }
};

SELECT.ELEMENTS.Element.prototype.slideDown = function(speed) {
    var el_max_height = 0;
    var el = this.element;
    if (speed == undefined)
        speed = 0.2;
    if(el.getAttribute('data-max-height')) {
        this.element.setDataAttribute("slide", "down");
        el.style.maxHeight = el.getAttribute('data-max-height');
    } else {
        el_max_height                  = this.getHeight() + 'px';
        el.style['transition']         = 'max-height ' + speed + 's ease-in-out';
        el.style.overflowY             = 'hidden';
        el.style.maxHeight             = '0';
        el.setAttribute('data-max-height', el_max_height);
        el.style.display               = 'block';

        // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
        setTimeout(function() {
            el.style.maxHeight = el_max_height;
        }, 10);
    }
};

SELECT.ELEMENTS.Element.prototype.slideToggle = function(speed) {
    var el_max_height = 0;
    var el = this.element;
    if (speed == undefined)
        speed = 0.3;
    if(el.getAttribute('data-max-height')) {
        // we've already used this before, so everything is setup
        if(el.style.maxHeight.replace('px', '').replace('%', '') === '0') {
            console.log("auki")
            el.style.maxHeight = el.getAttribute('data-max-height');
        } else {
            console.log("sulkee")
            el.style.maxHeight = '0';
        }
    } else {
        el_max_height                  = this.getHeight() + 'px';
        el.style['transition']         = 'max-height ' + speed + 's ease-in-out';
        el.style.overflowY             = 'hidden';
        el.style.maxHeight             = '0';
        el.setAttribute('data-max-height', el_max_height);
        el.style.display               = 'block';

        // we use setTimeout to modify maxHeight later than display (to we have the transition effect)
        setTimeout(function() {
            el.style.maxHeight = el_max_height;
        }, 10);
    }
};

SELECT.ELEMENTS.Element.prototype.isHidden = function() {
	return this.element.isHidden();
};

SELECT.ELEMENTS.Element.prototype.disable = function() {
	this.element.setAttribute("disabled", true);
};

SELECT.ELEMENTS.Element.prototype.enable = function() {
	this.element.removeAttribute("disabled");
};

SELECT.ELEMENTS.Element.prototype.isDisabled = function() {
	return this.element.isDisabled();
};

SELECT.ELEMENTS.Element.prototype.getTabIndex = function() {
	return this.element.getAttribute("tabindex");
};

SELECT.ELEMENTS.Element.prototype.setSelectedIndex = function(index) {
	this.element.selectedIndex = index;
};

SELECT.ELEMENTS.Element.prototype.empty = function() {
	this.element.removeChildren();
};

SELECT.ELEMENTS.Element.prototype.hasChildren = function() {
	return (this.element.getChildren().length > 0);
};

SELECT.ELEMENTS.Element.prototype.disableTabNavigation = function() {
    this.element.setAttribute("tabindex", "-1");
};