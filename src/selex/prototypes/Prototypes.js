Object.prototype.setStyle = function(name, value) {
  if (typeof value === "number") {
    value += "px";
  }
  if (this !== undefined)
    this.style[name] = value;
};

Object.prototype.getNextSibling = function() {
  return this.nextSibling;
};

Object.prototype.removeChildren = function() {
  this.innerHTML = "";
};

Object.prototype.getChildren = function() {
  return this.childNodes;
};

Object.prototype.setSelectedAttribute = function() {
  this.setAttribute("selected", true);
};

Object.prototype.removeStyle = function(name) {
  this.style[name] = null;
};

Object.prototype.remove = function() {
  var parent = this.parentNode;
  parent.removeChild(this);
};

Object.prototype.getStyle = function(name) {
  return this.style[name];
};

Object.prototype.hasClass = function(name) {
  var result = this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  if (result === null)
    return false;
  return result;
};

Object.prototype.addClass = function(name) {
  if (this.hasClass(name) === false)
   this.className += " " + name;
};

Object.prototype.clearClasses = function() {
  this.className = "";
};

Object.prototype.setDataAttribute = function(name, value) {
  this.setAttribute("data-" + name, value);
};

Object.prototype.getDataAttribute = function(name) {
  return this.getAttribute("data-" + name);
};

Object.prototype.removeDataAttribute = function(name) {
  this.removeAttribute("data-" + name);
};

Object.prototype.isHidden = function() {
  return (this.style.display === "none") ? true : false;
};

Object.prototype.show = function() {
  this.style.display = "block";
};

Object.prototype.hide = function() {
  this.style.display = "none";
};

Object.prototype.empty = function() {
  this.innerHTML = "";
};

Object.prototype.setClass = function(name) {
  this.className = name;
};

Object.prototype.clone = function() {
  var newObj = (this instanceof Array) ? [] : {};
    for (var i in this) {
      if (i == 'clone') 
        continue;
      if (this[i] && typeof this[i] == "object")
          newObj[i] = this[i].clone();
      else 
        newObj[i] = this[i];
    } 
    return newObj;
};

Object.prototype.removeClass = function(className) {
    var newClassName = "";
    var i;
    var classes = this.className.split(" ");
    for(i = 0; i < classes.length; i++) {
        if(classes[i] !== className) {
            newClassName += classes[i] + " ";
        }
    }
    this.className = newClassName;
};