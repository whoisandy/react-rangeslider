#!/bin/bash -e

babel=node_modules/.bin/babel

src=./src
lib=lib

rm -rf $lib
rm -rf node_modules/
npm install
$babel ./$src --stage 0 -d $lib

printf "\nGzip: Minified size `gzip -c $lib/index.js | wc -c | awk {'print $1/1000'}` bytes\n"
