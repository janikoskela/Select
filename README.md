Selex
===============
The fundemental point of Selex is to offer a select box which is lightweight, contains common select box functionality and has customizable graphics. 

Lightweight is primarily achieved by having no external dependencies (i.e. jQuery). The appereance of Selex is controlled with <a href="https://github.com/janikoskela/Selex/tree/master/themes">themes</a> which are a set of CSS rules and images one can easily modify.

Selex supports the native select box by allowing user to decide whether it should be rendered and displayed. By default native select box will not be rendered.

Usage
==============
See the <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Constructor parameters
===============
Name| Type | Example value | Default | Description
---|---|---------------|-----|------------
options|Array of object(s) |[{ text: "option", value: "optionValue"}]| - |Options
defaultValue|String|"optionValue"|-|An option is searched with this value, first option that matches is picked
width|String | "100%", "12px", "1em"|"100%"|Width for the select box
theme|String|"default"|-|Defines what theme is to be used. Basically this will define the class of the root element
fontSize|String | "12px", "1em", "50%"|-|The font size which is to be defined to the root element
fontFamily|String|"verdana"|-|The font family which is to be defined to the root element
orientation|String|"right", "left"|"right"|Defines the side where arrow points
onOptionChange|Function| - |-|A callback which is called when option changes
targetElement|Element| - |-|The element where Selex is rendered
optionLimit|Number|5|-|Specifies how many options will be displayed. If not specified all options will be displayed. This isn't applied to native select box
displayNativeSelectBox|Boolean|True|False|Controls whether native select box is displayed. Cannot be displayed if renderNativeSelectBox is false. If this is true and renderNativeSelectBox is true then only native select box is rendered
renderNativeSelectBox|Boolean|True|False|Controls whether native select box is rendered

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

So far Selex is tested with:
 - Safari, Version 7.0.5 (9537.77.4)

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
