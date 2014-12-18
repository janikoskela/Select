Selex [![Build Status](https://travis-ci.org/janikoskela/Selex.svg?branch=master)](https://travis-ci.org/janikoskela/Selex)
===============
Selex is a customizable and lightweight (No external library dependencies) widget made to function as a <i>select</i>-element.

Usage
==============
See the <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Widget options
===============
Name| Type | Required | Default | Description
---|---|---------------|-----|------------|------
targetElement|Element |true|-|The element where Selex is rendered. If this is <i>select</i>-element then widget is created based on its content. 
options|Array of object(s) | false | - |Options. This will be diregarded if targetElement is <i>select</i>-element
theme|String|false|"plain"|Defines what theme is to be used. Basically this will simply define the class of the root element
defaultValue|String|false|-|An option is searched with this value, first option that matches is picked
width|String |false|-|Width for the select box
fontSize|String |false|-|The font size which is to be defined to the root element
fontFamily|String|false|-|The font family which is to be defined to the root element
orientation|String|false|"right"|Defines the side where arrow points
onOptionChange|Function |false|-|A callback which is called when option changes
optionLimit|Number|false|- |Specifies how many options will be displayed. If not specified all options will be displayed
placeholder|String|false|-|Sets a placeholder text
sort|String|false|-|Sorts options
searchMode|String|false|-|Searches options with pressed key(s). Search by first key (default) is currently the only search mode
optionMenuWidth|String|false|-|Determines the width of option menu. Overrides width param
closeWhenCursorOut|Boolean|false|True|Determines if option menu will be closed when cursor leaves select box

Public methods
===============
Name|Parameters|Description
----|----------|------|-----------
render|-|Renders widget
getSelectedText|-|Returns the selected options text/label
getSelectedValue|-|Returns the selected options value
show|-|Shows widget
hide|-|Hides widget
enable|-|Enables widget
disable|-|Disabled widget
setOptions|Array of object(s)|Sets new options
getSelectedOption|-|Returns the selected option

Browser compatibility
==============

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
