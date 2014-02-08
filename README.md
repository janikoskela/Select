SimpleSelectBox
===============
A lightweight select box which is not depended on any external library. See the <a href="http://knaitti.org/SimpleSelectBox/">demo</a>.
Usage
==============
Using is simple: Just determine a root element for the select box. Select box fills the root element according to its size.

Below is a simple usage example. A more comprehensive example can be found from index.html

```javascript
var obj = new Urhola.SelectBox({
      parentElement: document.getElementById("wrapper"),
      options: [{ label: "foo", value: "foo" }, { label: "bar", value: "bar" }],
      defaultValue: "bar"
}).render();
```
Public methods
===============
 - render()
 - show()
 - hide()
 - getSelectedLabel()
 - openOptionList()
 - closeOptionList()
 - getOptions()
 - setOrientation(orientation)
 - setOptions(arrayObject)

Tested browsers
==============
 - Safari: Version 7.0.1 (9537.73.11)

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
