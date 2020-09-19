# Development Game Site

This site will be a progession through learning and understanding the inner workings of Angular, frontend development, complex algorithms, schematics, DevOps, and more. I am always looking for better ways to code games in an Angular environment, so feel free to push your own game.

[Live site](https://badassbison.github.io/game-site/)

## Contribute Your Own Game

Build the game template using `npm run new:game`. This will use custom schematics to build out the game template in the correct location, update the routing for your game, and add your game to the links in the main menu. Only update code within the folder of the game you are adding. Make sure your game is fully finished for frontend play before raising a PR. Your game should have it's own Readme with clear discription of both the game, the rules, and the code that built it.

## Other Contributions

If there are other changes you want to see or feel is needed, you can make the change yourself and raise a PR or add an issue. For all PR's, make sure the commits are clear and the PR itself tackles said goal.

## Publish This Site

This site is hosted on Github Pages. Run `npm run build:production`, then push the repo. Once the repo is merged to master the live site will be updated.

## Understanding This Repo

### src

All source code will go in the `src` folder. Custom schematics build the game project and all additions should only be within the new game project.

### docs

This is the compiled code that Github Pages uses to host the site.

### schematics

These are the custom schematics used to build the game template used for development.

## Custom NPM Scripts

### new:game

Builds the template for the new game and makes all other updates needed for the project.

### build:production

For building the docs folder, used for site deployment

### clean:branches

Deletes all branches outside of master

### clean:deps

Deletes the node_modules folder and all its contents
