#!/bin/bash -e

babel=node_modules/.bin/babel
webpack=node_modules/.bin/webpack

src=./src
lib=lib
tests=tests

rm -rf $lib
$babel ./$src --stage 0 -d $lib --ignore $tests

NODE_ENV=production $webpack $src/index.js $lib/umd/ReactRangeslider.js
NODE_ENV=production $webpack -p $src/index.js $lib/umd/ReactRangeslider.min.js

printf "\nGzip: Minified size `gzip -c $lib/umd/ReactRangeslider.min.js | wc -c | awk {'print $1/1000'}` bytes\n"
