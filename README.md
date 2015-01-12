Selex [![Build Status](https://travis-ci.org/janikoskela/Selex.svg?branch=master)](https://travis-ci.org/janikoskela/Selex)
===============
Widget requires a <i>select</i>-element to be passed to the constructor (See the examples). When widget is rendered the given <i>select</i> is then hidden. Widget aims to delegate events to the hidden <i>select</i> so that the user can attach events to it normally. This enables that the widget can be easily detached and removed if wanted.

Oh, by the way Selex requires no external libraries.

Demo
==============
<a href="http://janikoskela.github.io/Selex">DEMO</a>

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
width|String|-|Width for the select box. If not defined widgets width is based on the widest option
orientation|String|"right"|Defines the side where arrow points
placeholder|String|-|Sets a placeholder text
sort|String|-|Sorts options
optionMenuWidth|String|-|Determines the width of option menu. Overrides the width of the widget
closeWhenCursorOut|Boolean|True|Determines if option menu will be closed when cursor leaves select box
loadingText|String|"Loading"|The text which is used in loading mode
useSearchInput|boolean|false|Renders search input if true
noResultsMessage|String|"No results"|No results message

Public methods
===============
Name|Parameters|Description
----|----------|------|-----------
attach|-|Attaches & renders widget
detach|-|Detaches & removes widget
show|-|Shows widget
hide|-|Hides widget
enable|-|Enables widget
disable|-|Disabled widget
toggleLoadingMode|-|Enables or disables loading mode
toggleInputSearch|-|Enables or disables input search

Delegations
===============
Delegated events from widget to hidden <i>select</i>:
 - change event is fired when widgets selected option changes

Delegated changes from hidden <i>select</i> to widget:
 - widget gets refreshed when an option or options are removed or added from the hidden <i>select</i>

TODO:
 - widget should listen hidden <i>selects</i> attribute changes (i.e. if it gets disabled) and update widget accordingly. However I have not found any reasonable way to achieve this since Mutation Observer does not detect attribute changes on <i>select</i> (<a href="http://stackoverflow.com/questions/10411824/webkit-mutation-observer-callback-not-triggered-when-select-box-attributes-chan">link</a>). Polling is an option which should be considered properly.

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
