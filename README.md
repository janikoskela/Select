Select [![Build Status](https://travis-ci.org/janikoskela/Select.svg?branch=master)](https://travis-ci.org/janikoskela/Select)
===============
Lightweight HTML5 widget made to function as a <i>select</i>-element.

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
useMutationObserver|Boolean|true|Given <i>select</i> is observed for option additions and removals. This is ignored if usePolling is true. If user browser doesn't support mutation observer it is replaced with polling
pollingInterval|Integer|100|polling interval speed in ms
appendOptionMenuTo|Element|-|Element where option menu is to be rendered. Might come useful for example if widgets parent hides overflows
openOptionMenuUponHover|Boolean|false|If true option menu is opened when widget is hovered
useAnimations|Boolean|true|Indicates whether animations are enabled or disabled
animationSpeed|Integer|150|Animation speed in ms
responsiveFallback|Integer|640|If screen width or height goes below this threshold (in pixels) native select option list is displayed. Pass true if you want to use native option list at all times. Passing false disables this feature
copyNativeClasses|Boolean|false|If true copies given selects classes to widget root element
allowSelectedOptionToTriggerChange|Boolean|false|If true triggers option change when selected option is selected again
onSearch|Function|-|Gets called when users search query changes
onOptionListReachedBottom|Function|-|Gets called when option list is scrolled bottom
onOptionMenuCloses|Function|-|Gets called when option menu is closed
clearSearchInputOnOptionMenuCloses|Boolean|True|Clear search input upon option menu gets closed

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
changeOption|option value, trigger change (boolean)|Changes option if given value is found. If found and given boolean is true triggers a change event to native select.
toggleNoSearchResultsMessage|-|Toggles no search results message
showNoResultsMessage|-|Shows no search results message
hideNoResultsMessage|-|Hides no search results message
hideOptionMenuLoader|-|Hides option menu loader
showOptionMenuLoader|-|Shows option menu loader

Monitoring
===============
When polling is enabled widget monitors given <i>select</i> to look for changed attributes or options. In case of widget finding any changes widget refreshes itself accordingly. Following changes on <i>select</i> are monitored:
 - whether it becomes visible or hidden
 - whether it becomes enabled or disabled
 - whether options are added or removed

Implementations
===============
 - <a href="https://kauppa.louhi.fi">Louhi Shop</a>
 - <a href="https://shop.pilvi.com">Pilvi Shop</a>
 - <a href="https://pilvi.atea.fi">Atea Shop</a>

Browser compatibility
===============
Supported browsers:
 - IE 9 (animations not supported), 10, 11
 - Chrome 42
 - Firefox 37
 - Opera 29

Unsupported browsers:
 - IE 8

Licence
=============
See the <a href="https://github.com/janikoskela/SimpleSelectBox/blob/master/LICENSE">LICENCE</a>
