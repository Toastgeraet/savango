#!/bin/bash 
git checkout dist
git merge main
MSYS_NO_PATHCONV=1 ./node_modules/vite/bin/vite.js build --base='/savango/'
git add -f dist && git commit -m 'adding dist subtree'
git subtree push --prefix dist origin gh-pages
git checkout main