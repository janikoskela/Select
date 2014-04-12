SimpleSelectBox
===============
A lightweight select box which is not depended on any external library and is easily configurable.

Demo
=============
<a href="http://janikoskela.github.io/SimpleSelectBox.js/">Demo.</a>
Usage
==============
Using is simple: Just determine a root element for the select box and add an array with option objects. Option objects must contain label and value attributes. The root element defines select boxes size since select box fills it. Styles can be altered from <a href="https://github.com/janikoskela/SimpleSelectBox.js/blob/master/SimpleSelectBox.css">SimpleSelectBox.css</a>

Below is a simple usage example. A more comprehensive example can be found from <a href="https://github.com/janikoskela/SimpleSelectBox.js/blob/master/example.html">example.html</a>

```javascript
var selectBox = new Urhola.SelectBox({
      parentElement: document.getElementById("wrapper"),
      options: [{ label: "foo", value: "foo" }, { label: "bar", value: "bar" }],
      defaultValue: "bar"
}).render();
```
Public methods
===============
Name|Parameters|Description
----|----------|------|-----------
render|-|Renders the select box
show|-|Shows select box
hide|-|Hides select box
getSelectedLabel|-|Gets selected label
getSelectedValue|-|Gets selected value
closeOptionList|-|Closes the option list
getOptions|-|Gets the current options
setOrientation|String|Sets 
setOptions|object or array|Sets new options
setOptionLimit|integer|Sets the maximum count of options to be displayed

Implementations
=============
 - https://pilvi.com

Browser compatibility
==============
 - IE 8+
 - Chrome 8+
 - Safari 3+
 - Firefox 10+
 - Opera 10.6+

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
