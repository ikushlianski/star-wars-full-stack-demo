# Star Wars API

## Project setup
- have lerna installed globally `npm i -g lerna` or use `npx`
- add a new package with `npx lerna create <package-name>`
- install all dependencies `npx lerna bootstrap`
- to install a local dependency specifically for one package, run `npx lerna add --scope=<your-package> -D @types/react-dom`

## Pre-commit hooks
Pre-commit hooks use native Git hooks. The following should be done for hooks to work:

- ensure the `pre-commit` hook file in `git-hooks` directory is executable
- ensure your git config knows about the `git-hooks` folder. If needed, run `git config core.hooksPath ./git-hooks` (done automatically after you do install).

