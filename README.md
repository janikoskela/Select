Selex [![Build Status](https://travis-ci.org/janikoskela/Selex.svg?branch=master)](https://travis-ci.org/janikoskela/Selex)
===============
Widget requires a <i>select</i>-element to be passed to the constructor (See the examples). When widget is rendered the given <i>select</i> is then hidden. Widget aims to delegate events to the hidden <i>select</i> so that the user can attach events to it normally. This enables that the widget can be easily detached and removed if wanted.

Usage
==============
Using is simple and can be done with following code line (after Selex library has been imported):

	new Selex({targetElement: document.getElementById("select")}).render();
	
See more comprehensive <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Widget options
===============
Name| Type | Required | Default | Description
---|---|---------------|-----|------------|------
targetElement|Element (<i>select</i>) |true|-| Widget is rendered based on this element
theme|String|false|"plain"|Defines what theme is to be used. Basically this will simply define the class of the root element
width|String |false|-|Width for the select box
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
