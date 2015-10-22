SELECT.UTILS.attachEventListener = function(element, eventName, callback, useCapture) {
    if (SELECT.UTILS.isFunction(callback) && SELECT.UTILS.isElement(element) && SELECT.UTILS.isEventSupported(eventName)) {
        return element.addEventListener(eventName, callback, useCapture);
    }
    return false;
};

SELECT.UTILS.isEventSupported = function(eventName) {
    var tagNames = {
      'select':'input','change':'input',
      'submit':'form','reset':'form',
      'error':'img','load':'img','abort':'img'
    }
    var el = document.createElement(tagNames[eventName] || 'div');
    eventName = 'on' + eventName;
    var isSupported = (eventName in el);
    if (!isSupported) {
        el.setAttribute(eventName, 'return;');
        isSupported = typeof el[eventName] == 'function';
    }
    el = null;
    return isSupported;
};

SELECT.UTILS.createElement = function(type, classes) {
	var elem = document.createElement(type);
	if (typeof classes === "string")
		elem.setClass(classes);
	return elem;
};

SELECT.UTILS.getElement = function(elem) {
    if (elem instanceof jQuery)
        return $(elem)[0];
    return elem;
};

SELECT.UTILS.isFunction = function(func) {
    if (typeof func == "function")
        return true;
    return false;
};

SELECT.UTILS.callFunc = function(obj, functionName, args) {
    if (typeof obj == "object") {
        var func = obj[functionName];
        if (typeof func == "function") {
            if (!SELECT.UTILS.isArray(args))
                return func.call(obj, args);
            else
                return func.apply(obj, args);
        }
    }
};

SELECT.UTILS.isArray = function(obj) {
    return ('isArray' in Array) ? Array.isArray(obj) : Object.prototype.toString.call(obj) == '[object Array]';
};

SELECT.UTILS.isElement = function(o) {
	//Returns true if it is a DOM element   
    o = SELECT.UTILS.getElement(o); 
  	return (
    	typeof HTMLElement === "object" ? o instanceof HTMLElement : //DOM2 
    	o && typeof o === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName==="string"
	);
};

SELECT.UTILS.triggerEvent = function(type, targetElem) {
	var e;
	if(typeof(document.createEvent) != 'undefined') {
	    e = document.createEvent('HTMLEvents');
	    e.initEvent(type, true, true);
	    targetElem.dispatchEvent(e);
	} else if(typeof(document.createEventObject) != 'undefined') {
	    try {
	        e = document.createEventObject();
	        targetElem.fireEvent('on' + type.toLowerCase(), e);
	    } catch(err){ }
	}
};

SELECT.UTILS.isTouchDevice = function() {
    return (document.documentElement['ontouchstart'] === undefined) ? false : true;
};

SELECT.UTILS.isDescendant = function(parent, child) {
    var node = child.parentNode;
    while (node != null) {
        if (node == parent)
             return true;
        node = node.parentNode;
    }
    return false;
}

SELECT.UTILS.isEmpty = function(obj) {
    // null and undefined are "empty"
    if (obj == null || obj == undefined) return true;

    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and valueOf enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
};

SELECT.UTILS.getElementPosition = function(element) {
    var rect = element.getBoundingClientRect();
    var elementLeft,elementTop; //x and y
    var scrollTop = document.documentElement.scrollTop ? document.documentElement.scrollTop : document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft ? document.documentElement.scrollLeft : document.body.scrollLeft;
    elementTop = rect.top+scrollTop;
    elementLeft = rect.left+scrollLeft;
    return {top: elementTop, left: elementLeft}
}

SELECT.UTILS.extractDelta = function(e) {
    if (e.wheelDelta) {
        return e.wheelDelta;
    }
    if (e.detail)
    	return -e.detail * 40;
    if (e.originalEvent !== undefined) {
	    if (e.originalEvent.detail) {
	        return e.originalEvent.detail * -40;
	    }

	    if (e.originalEvent && e.originalEvent.wheelDelta) {
	        return e.originalEvent.wheelDelta;
	    }
	}
	return 0;
};

//removes elements and its childrens references
SELECT.UTILS.purge = function(elem) {
    if (elem == undefined || elem == null)
        return;
    var a = elem.attributes, i, l, n;
    if (a) {
        for (i = a.length - 1; i >= 0; i -= 1) {
            n = a[i].name;
            if (typeof elem[n] === 'function') {
                elem[n] = null;
            }
        }
    }
    a = elem.childNodes;
    if (a) {
        l = a.length;
        for (i = 0; i < l; i += 1) {
            this.purge(elem.childNodes[i]);
        }
    }
};