Element.prototype.setStyle = function(name, value) {
  if (typeof value === "number") {
    value += "px";
  }
  if (this !== undefined)
    this.style[name] = value;
};

Element.prototype.getNextSibling = function() {
  return this.nextSibling;
};

Element.prototype.removeChildren = function() {
  this.innerHTML = "";
};

Element.prototype.getChildren = function() {
  return this.childNodes;
};

Element.prototype.setSelectedAttribute = function() {
  this.setAttribute("selected", true);
};

Element.prototype.removeStyle = function(name) {
  this.style[name] = null;
};

Element.prototype.remove = function() {
  var parent = this.parentNode;
  parent.removeChild(this);
};

Element.prototype.getStyle = function(name) {
  return this.style[name];
};

Element.prototype.hasClass = function(name) {
  var result = this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
  if (result === null)
    return false;
  return result;
};

Element.prototype.addClass = function(name) {
  if (this.hasClass(name) === false)
   this.className += " " + name;
};

Element.prototype.clearClasses = function() {
  this.className = "";
};

Element.prototype.setDataAttribute = function(name, value) {
  this.setAttribute("data-" + name, value);
};

Element.prototype.getDataAttribute = function(name) {
  return this.getAttribute("data-" + name);
};

Element.prototype.removeDataAttribute = function(name) {
  this.removeAttribute("data-" + name);
};

Element.prototype.isHidden = function() {
  return (this.style.display === "none") ? true : false;
};

Element.prototype.show = function() {
  this.style.display = "block";
};

Element.prototype.hide = function() {
  this.style.display = "none";
};

Element.prototype.empty = function() {
  this.innerHTML = "";
};

Element.prototype.setClass = function(name) {
  this.className = name;
};

Element.prototype.clone = function() {
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

Element.prototype.removeClass = function(className) {
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
Element.prototype.appendFirst = function(childNode){
    if (this.firstChild)
      this.insertBefore(childNode,this.firstChild);
    else 
      this.appendChild(childNode);
};
Element.prototype.isDisabled = function() {
    return (this.getAttribute("disabled") === null) ? false : true;
};