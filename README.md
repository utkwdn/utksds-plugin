![Power T](https://images.utk.edu/designsystem/2020/assets/i/icon-114x114.png)

# University of Tennessee, Knoxville Design System WordPress Plugin

## Requirements

- npm [npm Docs: Installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)
- Node.js 14 (using a [Node version manager](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm#using-a-node-version-manager-to-install-node-js-and-npm) is highly recommended)
- [The UT Design System Framework](https://github.utk.edu/ocm/utkds-framework)

It is required that the design framework project be placed **in the same directory** as this project, since they share resources.

## Installing this project

1.  make sure you are running Node.js 14 prior to install
2.  run `npm install` to install dependencies

## Recommended development configuration

To test or develop this project locally, install WordPress, but do not install this plugin. Instead, create symlink to the root directory of this project and place that symlink in your WordPress installation's plugins directory.

## Creating New Blocks

This project was designed to be as simple as possible. To that end, all that you need to do to create a new block is to navigate to the `/wp-data/-wp-content/plugins/utds/src` subdirectory, create a new folder and source files for your desired block, and import it in the `blocks.js` file. For example: import `'./newblock/newblock.js';` Additionally, you could simply copy another block's folder, rename the folder and files, and then change the name of the block within the `registerBlockType` function within the copied directory's .js file. Please be sure to assign the block a unique name, and ensure that it is being assigned to the correct category, or unexpected results may occur.

## Selectively Disabling/Enabling Blocks

Inside the `blocks.js` file in the `src` directory, there is a section, indicated by a comment, that will allow developers to selectively toggle available blocks by passing the respective wordpress block slug to the `blocktodisable` array. The function is as simple as adding/removing the respective slug from the array.

## Styling Blocks and Editor Views

Within each block are `.scss` files, one of which is called `editor.scss`. These files can really be called anything, but I recommend maintaining the convention of calling editor specific scss files as such. These files are imported in the block's respective .js file. SASS/SCSS can be used as usual within these files, and they will be automatically processed into css by npm/yarn when the `npm start` or `yarn start` command is run.

## Potential and Known Issues

Occasionally, there have been problems with incompatible dependencies. For this reason, I recommend using yarn/yarnpkg instead of npm, to ensure that the same version of repective dependencies is maintained across all instances of the plugin.

There have also been problems with permissions in some cases, typically with media files and uploads of static assets, such as photos. This will probably not be an issue for MAC or Windows users, but directory permissions/ownership may need to be modified for docker users.

Below you will find some information on how to run scripts.

> You can find the most recent version of this guide [here](https://github.com/ahmadawais/create-guten-block).

## `npm start`

- Use to compile and run the block in development mode.
- Watches for any changes and reports back any errors in your code.

## `npm run build`

- Use to build production code for your block inside `dist` folder.
- Runs once and reports back the gzip file sizes of the produced code.

## `npm run eject`

- Use to eject your plugin out of `create-guten-block`.
- Provides all the configurations so you can customize the project as you want.
- It's a one-way street, `eject` and you have to maintain everything yourself.
- You don't normally have to `eject` a project because by ejecting you lose the connection with `create-guten-block` and from there onwards you have to update and maintain all the dependencies on your own.

---
