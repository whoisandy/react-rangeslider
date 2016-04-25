#!/bin/bash -e

clean() {
	rm -rf deploy
}

webpack=node_modules/.bin/webpack
pages=node_modules/.bin/gh-pages

clean
NODE_ENV=production $webpack
cp -R $PWD/index.html deploy/index.html
NODE_ENV=production $pages -d deploy
rm -rf lib
clean

printf '\nDeploy: Demo deployed to gh-pages\n'

