Selex [![Build Status](https://travis-ci.org/janikoskela/Selex.svg?branch=master)](https://travis-ci.org/janikoskela/Selex)
===============
Selex is a customizable and lightweight (No external library dependencies) widget made to function as a <i>select</i>-element.

Selex includes a special feature where one can choose to include a native <i>select</i>-element (which contains the same data as the widget) inside the wrapper. This is done because sometimes it's easier to manage a native element rather than using widgets public methods. Native <i>select</i>-element can be hidden or it can be displayed. In case of displaying the <i>select</i>-element the widget will be automatically hidden.

Usage
==============
See the <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Constructor parameters
===============
Name| Type | Default | Description
---|---|---------------|-----|------------|------
options|Array of object(s) | - |Options. This will be diregarded if targetElement is <i>select</i>
theme|String|"plain"|Defines what theme is to be used. Basically this will simply define the class of the root element
targetElement|Element |-|The element where Selex is rendered. If this is <i>select</i> then widget is created based on it. 
defaultValue|String|-|An option is searched with this value, first option that matches is picked
width|String |-|Width for the select box
fontSize|String |-|The font size which is to be defined to the root element
fontFamily|String|-|The font family which is to be defined to the root element
orientation|String|"right"|Defines the side where arrow points
onOptionChange|Function |-|A callback which is called when option changes
optionLimit|Number|- |Specifies how many options will be displayed. If not specified all options will be displayed
placeholder|String|-|Sets a placeholder text
sort|String|-|Sorts options
searchMode|String|-|Searches options with pressed key(s). Search by first key (default) is currently the only search mode
optionMenuWidth|String|-|Determines the width of option menu. Overrides width param
closeWhenCursorOut|Boolean|True|Determines if option menu will be closed when cursor leaves select box

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
getSelectedOption|-|Returns the selected option

Implementations
=============
 - https://pilvi.com

Browser compatibility
==============
A browser with CSS3 support is required.

So far tested with (Any help on this would be greatly appreciated):
 - Safari, Version 7.0.5 (9537.77.4)
 - Google Chrome, Version 36.0.1985.143

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
