Selex [![Build Status](https://travis-ci.org/janikoskela/Selex.svg?branch=master)](https://travis-ci.org/janikoskela/Selex)
===============
Widget requires a <i>select</i>-element to be passed to the constructor (See the examples). When widget is rendered the given <i>select</i> is then hidden. Widget aims to delegate events to the hidden <i>select</i> so that the user can attach events to it normally. This enables that the widget can be easily detached and removed if wanted.

Usage
==============
Using is simple and can be done with following code (after Selex library has been imported):

	var settings = {
		targetElement: document.getElementById("select")
	};
	var selexInstance = new Selex(settings);
	selexInstance.render();
	
See more comprehensive <a href="https://github.com/janikoskela/Selex/tree/master/examples">examples</a>

Required widget settings
===============
Name| Type | Description
---|---|---------------|-----|------------|------
targetElement|Element (<i>select</i>)| Widget is rendered based on this element

Optional widget settings
===============
Name| Type | Default | Description
---|---|---------------|-----|------------|------
theme|String|"plain"|Defines what theme is to be used. Basically this will simply define the class of the root element
width|String|-|Width for the select box
orientation|String|"right"|Defines the side where arrow points
placeholder|String|-|Sets a placeholder text
sort|String|-|Sorts options
optionMenuWidth|String|-|Determines the width of option menu. Overrides the width of the widget
closeWhenCursorOut|Boolean|True|Determines if option menu will be closed when cursor leaves select box
loadingText|text|"Loading"|The text which is used in loading mode
useSearchInput|boolean|false|Renders search input if true

Public methods
===============
Name|Parameters|Description
----|----------|------|-----------
render|-|Renders widget
show|-|Shows widget
hide|-|Hides widget
enable|-|Enables widget
disable|-|Disabled widget
toggleLoadingMode|-|Enables or disables loading mode

Browser compatibility
==============

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
