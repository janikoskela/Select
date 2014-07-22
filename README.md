Selex
===============
Selex is a customizable and lightweight (No external library dependencies) widget made for select-element. By default the select-element will not be rendered but user may specify if it should be rendered and should it be displayed or hidden. The appearance of the widget is mainly controlled via themes which are just a bunch of CSS rules.

Usage
==============
See the <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Constructor parameters
===============
Name| Type | Example value | Default | Applies to native select | Description
---|---|---------------|-----|------------|------
options|Array of object(s) |[{ text: "option", value: "optionValue"}]| - | true |Options
theme|String|"default"|-|True|Defines what theme is to be used. Basically this will define the class of the root element
targetElement|Element| - |-|True|The element where Selex is rendered
defaultValue|String|"optionValue"|-|True|An option is searched with this value, first option that matches is picked
width|String | "100%", "12px", "1em"|"100%"|True|Width for the select box
fontSize|String | "12px", "1em", "50%"|-|True|The font size which is to be defined to the root element
fontFamily|String|"verdana"|-|False|The font family which is to be defined to the root element
orientation|String|"right", "left"|"right"|False|Defines the side where arrow points
onOptionChange|Function| - |-|True|A callback which is called when option changes
optionLimit|Number|5|-|False |Specifies how many options will be displayed. If not specified all options will be displayed
displayNativeSelectBox|Boolean|True|False|True|Controls whether native select box is displayed. Cannot be displayed if renderNativeSelectBox is false. If this is true and renderNativeSelectBox is true then only native select box is rendered
renderNativeSelectBox|Boolean|True|False|True|Controls whether native select box is rendered

Public methods
===============
Name|Parameters|Description
----|----------|------|-----------
render|-|Renders the select box
getSelectedText|-|Returns the selected options text/label
getSelectedValue|-|Returns the selected options value

Implementations
=============
 - https://pilvi.com

Browser compatibility
==============
A browser with CSS3 support is required.

So far tested with:
 - Safari, Version 7.0.5 (9537.77.4)

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
