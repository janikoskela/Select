Select [![Build Status](https://travis-ci.org/janikoskela/Select.svg?branch=master)](https://travis-ci.org/janikoskela/Select)
===============
Lightweight HTML5 widget made to function as a <i>select</i>-element.

Widget requires a <i>select</i>-element to be passed to the constructor (See the examples). When widget is rendered the given <i>select</i> is then hidden. Widget aims to delegate events to the hidden <i>select</i> so that the user can attach events to it normally. This enables that the widget can be easily detached and removed if wanted.

Demo
==============
<a href="http://janikoskela.github.io/Select">DEMO</a>

Required widget settings
===============
Name| Type | Description
---|---|---------------|-----|------------|------
el|Element (<i>select</i>)| Widget is rendered based on this element

Optional widget settings
===============
Name| Type | Default | Description
---|---|---------------|-----|------------|------
theme|String|"select-js-theme-light"|Defines what theme is to be used. Basically this will simply define the class of the root element
width|String|-|Width for the select box. If not defined widgets width is based on the widest option
orientation|String|"right"|Defines the side where arrow points
placeholder|String|-|Sets a placeholder text
sort|String/function|-|Sorts options. Options are "asc" & "desc"
optionMenuWidth|String|-|Determines the width of option menu. Overrides the width of the widget
closeWhenCursorOut|Boolean|True|Determines if option menu will be closed when cursor leaves select box
loadingText|String|"Loading"|The text which is used in loading mode
useSearchInput|boolean|false|Renders search input if true
searchInputPlaceholder|String|""|Sets search inputs placeholder text
noResultsMessage|String|"No results"|No results message
usePolling|Boolean|false|Given <i>select</i> is polled to monitor its changes. See <a href="#monitoring">Monitoring</a> below
pollingInterval|Integer|100|polling interval speed in ms
renderOptionMenuToBody|Boolean|false|If true option menu is appended to body element. If false option menu is rendered inside widget
openOptionMenuUponHover|Boolean|false|If true option menu is opened when widget is hovered
animationSpeed|Integer|150|Animation speed in ms. 0 disables animations

API
===============
Name|Parameters|Description
----|----------|------|-----------
attach|-|Attaches & renders widget
detach|-|Detaches & removes widget and its references
show|-|Shows widget
hide|-|Hides widget
enable|-|Enables widget
disable|-|Disabled widget
toggleLoadingMode|-|Enables or disables loading mode
toggleInputSearch|-|Enables or disables input search
isOptionMenuOpen|-|Returns true if option menu is open, false if not
setTheme|String|Sets theme
getTheme|-|Gets current theme
remove|-|Removes widget and the given select. Removes all references also

Monitoring
===============
When polling is enabled widget monitors given <i>select</i> to look for changed attributes or options. In case of widget finding any changes widget refreshes itself accordingly. Following changes on <i>select</i> are monitored:
 - whether it becomes visible or hidden
 - whether it becomes enabled or disabled
 - whether options are added or removed

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
