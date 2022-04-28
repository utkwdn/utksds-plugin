/**
 * External Dependencies
 */
 const path = require( 'path' );

 /**
  * WordPress Dependencies
  */
 const defaultConfig = require( '@wordpress/scripts/config/webpack.config.js' );

 const {
	getWebpackEntryPoints,
} = require( '@wordpress/scripts/utils' );

var allEntries = getWebpackEntryPoints();

/**
 * add frontend scripts here
 */
Object.assign(allEntries, getWebpackEntryPoints(),
  {"frontend/disable": path.resolve( process.cwd(), 'src/frontend', 'disable.js' )},
);
 
 module.exports = {
     ...defaultConfig,
     ...{
         entry: allEntries,
     }
 }