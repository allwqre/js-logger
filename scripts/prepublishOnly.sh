#!/usr/bin/env sh

BRANCH=$(git branch --show-current)
[[ $BRANCH == *"_WIP" ]] && exit 1

rm -rf dist
npm install

npx --no -- prettier -cu 'lib/**/*'
npx --no -- eslint 'lib/**/*'

npm run build

