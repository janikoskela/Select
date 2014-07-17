Object.prototype.setStyle = function(name, value) {
	this.style[name] = value;
}

Object.prototype.addClass = function(name) {
	this.className += " " + name;
}

Object.prototype.clearClasses = function() {
	this.className = "";
}

Object.prototype.hasClass = function(name) {
	return this.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
}

Object.prototype.isHidden = function() {
	return (this.style.display === "none") ? true : false;
}

Object.prototype.show = function() {
	this.style.display = "block";
}

Object.prototype.hide = function() {
	this.style.display = "none";
}

Object.prototype.empty = function() {
	this.innerHTML = "";
}

Object.prototype.setClass = function(name) {
	this.className = name;
}