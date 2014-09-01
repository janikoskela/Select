#!/bin/bash

DESTINATION_FILE_NAME="../dist/Selex.js"
DESTINATION_MINIFIED_FILE_NAME="../dist/Selex.min.js"
DESTINATION_MINIFIED_COMPRESSED_FILE_NAME="../dist/Selex.min.js.gz"
WRAPPER_FILE_NAME="Selex.js"
TEMP_FILE="temp"
BUILD_DIR="src/selex"

merge() {
	cd "src/selex"
	cwd=$(pwd)
	> "$DESTINATION_FILE_NAME"
	
	sed '$ d' "$WRAPPER_FILE_NAME" > $TEMP_FILE
	cat $TEMP_FILE >> $DESTINATION_FILE_NAME

	find ${cwd} ! -name $WRAPPER_FILE_NAME -name '*.js' | while read F; do
	    	cat "$F" >> $DESTINATION_FILE_NAME
	done
	lastLine=$(tail -r $WRAPPER_FILE_NAME |egrep -m 1 .)
	echo "$lastLine" >> "$DESTINATION_FILE_NAME"
	cd "../../"
}

minify() {
	cd "src/dist"
	uglifyjs -o "Selex.min.js" "Selex.js"
	cd "../../"
}

merge;
minify;