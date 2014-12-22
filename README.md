Selex [![Build Status](https://travis-ci.org/janikoskela/Selex.svg?branch=master)](https://travis-ci.org/janikoskela/Selex)
===============
Selex is aimed to be easily customizable and lightweight (No external library dependencies) widget made to function as a <i>select</i>-element.

Usage
==============
See the <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Widget options
===============
Name| Type | Required | Default | Description
---|---|---------------|-----|------------|------
targetElement|Element |true|-|The element where Selex is rendered. If this is <i>select</i>-element then widget is created based on its content. 
theme|String|false|"plain"|Defines what theme is to be used. Basically this will simply define the class of the root element
width|String |false|-|Width for the select box
fontSize|String |false|-|The font size which is to be defined to the root element
fontFamily|String|false|-|The font family which is to be defined to the root element
orientation|String|false|"right"|Defines the side where arrow points
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
show|-|Shows widget
hide|-|Hides widget
enable|-|Enables widget
disable|-|Disabled widget

Browser compatibility
==============

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
