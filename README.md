# Gutenberg-Bootstrap Plugin

## Set up Instructions

For the initial set up, you'll need a working local setup consisting of WAMP (windows machines), MAMP (OS X), or MySQL, PHP7, and Apache/Nginx.
Alternatively, you can simply use docker, by running ```docker-compose up -d``` in the root directory.

## Getting Started

All of the plugin-specific files are found in ```/wp-data/wp-content/plugins/utds/src```.
This project utilizes node/npm, or yarn, along with webpack to build browser compliant JS from ES6, and a SCSS processor for writing .scss files in lieu of css.
In order to see your changes to files in /src/ reflected as newly built and/or modified blocks, run ```yarn start``` in the root directory.

## Creating New Blocks

This project was designed to be as simple as possible. To that end, all that you need to do to create a new block is to navigate to the ```/wp-data/-wp-content/plugins/utds/src``` subdirectory, create a new folder and source files for your desired block, and import it in the ```blocks.js``` file. For example: import ```'./newblock/newblock.js';``` Additionally, you could simply copy another block's folder, rename the folder and files, and then change the name of the block within the ```registerBlockType``` function within the copied directory's .js file. Please be sure to assign the block a unique name, and ensure that it is being assigned to the correct category, or unexpected results may occur.

## Selectively Disabling/Enabling Blocks

Inside the ```blocks.js``` file in the ```src``` directory, there is a section, indicated by a comment, that will allow developers to selectively toggle available blocks by passing the respective wordpress block slug to the ```blocktodisable``` array. The function is as simple as adding/removing the respective slug from the array.

## Styling Blocks and Editor Views

Within each block are ```.scss``` files, one of which is called ```editor.scss```. These files can really be called anything, but I recommend maintaining the convention of calling editor specific scss files as such. These files are imported in the block's respective .js file. SASS/SCSS can be used as usual within these files, and they will be automatically processed into css by npm/yarn when the ```npm start``` or ```yarn start``` command is run.

## Potential and Known Issues

Occasionally, there have been problems with incompatible dependencies. For this reason, I recommend using yarn/yarnpkg instead of npm, to ensure that the same version of repective dependencies is maintained across all instances of the plugin.

There have also been problems with permissions in some cases, typically with media files and uploads of static assets, such as photos. This will probably not be an issue for MAC or Windows users, but directory permissions/ownership may need to be modified for docker users.