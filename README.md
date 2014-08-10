Selex
===============
Selex is a customizable and lightweight (No external library dependencies) widget made for <i>select</i>-element.

Usage
==============
See the <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Constructor parameters
===============
Name| Type | Default | Applies to native select | Description
---|---|---------------|-----|------------|------
options|Array of object(s) | - | True |Options
theme|String|-|True|Defines what theme is to be used. Basically this will define the class of the root element
targetElement|Element |-|True|The element where Selex is rendered
defaultValue|String|-|True|An option is searched with this value, first option that matches is picked
width|String |-|True|Width for the select box
fontSize|String |-|True|The font size which is to be defined to the root element
fontFamily|String|-|False|The font family which is to be defined to the root element
orientation|String|"right"|False|Defines the side where arrow points
onOptionChange|Function |-|True|A callback which is called when option changes
optionLimit|Number|-|False |Specifies how many options will be displayed. If not specified all options will be displayed
displayNativeSelectBox|Boolean|False|True|Controls whether native select box is displayed. Cannot be displayed if renderNativeSelectBox is false. If this is true and renderNativeSelectBox is true then only native select box is rendered
renderNativeSelectBox|Boolean|False|True|Controls whether native select box is rendered
placeholder|String|-|True|Sets a placeholder text
sort|String|-|True|Sorts options
searchMode|String|-|False|Searches options with pressed key

Public methods
===============
Name|Parameters|Description
----|----------|------|-----------
render|-|Renders widget or native select box
getSelectedText|-|Returns the selected options text/label
getSelectedValue|-|Returns the selected options value
show|-|Shows widget or native select box
hide|-|Hides widget or native select box
enable|-|Enables widget or native select box
disable|-|Disabled widget or native select box
setOptions|Array of object(s)|Sets new options

Implementations
=============
 - https://pilvi.com

Browser compatibility
==============
A browser with CSS3 support is required.

So far tested with (Any help on this would be greatly appreciated):
 - Safari, Version 7.0.5 (9537.77.4)

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
