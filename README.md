# Star Wars API

## Project setup
- have lerna installed globally `npm i -g lerna` or use `npx`
- install all dependencies `npx lerna bootstrap`
- from the root, run `npm i` to install some common dev packages and also set up git hooks automatically
- create `.env` file in each package, based on the package's `.env.example` file
- to launch the api and client, run `npm start` in each application

## Working with Lerna and packages
- add new packages with `npx lerna create <package-name>`
- to install a local dependency specifically for one package, run `npx lerna add --scope=<your-package> <package-name>`

## Pre-commit hooks
Pre-commit hooks use native Git hooks. The following should be done for hooks to work:

- ensure the `pre-commit` hook file in `git-hooks` directory is executable
- ensure your git config knows about the `git-hooks` folder. If needed, run `git config core.hooksPath ./git-hooks` (done automatically after you do `npm install` in the root).

