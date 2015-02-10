#!/bin/bash

DESTINATION_FILE_NAME="../dist/Select.js"
DESTINATION_MINIFIED_FILE_NAME="Select.min.js"
DESTINATION_MINIFIED_COMPRESSED_FILE_NAME="Select.min.js.gz"
WRAPPER_FILE_NAME="Select.js"
TEMP_FILE="temp"

merge() {
	cwd=$(pwd)
	> "$DESTINATION_FILE_NAME"
	
	sed '$ d' "$WRAPPER_FILE_NAME" > $TEMP_FILE
	cat $TEMP_FILE >> $DESTINATION_FILE_NAME
	rm $TEMP_FILE

	find ${cwd} ! -name $WRAPPER_FILE_NAME -name '*.js' | while read F; do
	    	cat "$F" >> $DESTINATION_FILE_NAME
	done
	lastLine=$(tail -r $WRAPPER_FILE_NAME |egrep -m 1 .)
	echo "$lastLine" >> "$DESTINATION_FILE_NAME"
}

minify() {
	uglifyjs -o $DESTINATION_MINIFIED_FILE_NAME $WRAPPER_FILE_NAME
}

compress() {
	tar -cvzf $DESTINATION_MINIFIED_COMPRESSED_FILE_NAME $DESTINATION_MINIFIED_FILE_NAME
}

cd "src/select"
merge;
cd "../../"
cd "src/dist"
minify;
compress;