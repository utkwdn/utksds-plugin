/**
 * Gutenberg Blocks
 *
 * All blocks related JavaScript files should be imported here.
 * You can create a new block folder in this dir and include code
 * for that block here as well.
 *
 * All blocks should be included here since this is the file that
 * Webpack is compiling as the input file.
 */

// import './base/base.js';
import './card/card.js';
import './accordion/accordion.js';
import './jumbotron/jumbotron.js';

// DO NOT TOUCH
wp.domReady( function() {
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-primary',
		label: 'Button Primary',
		isDefault: true,
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-secondary',
		label: 'Button Secondary',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-success',
		label: 'Button Success',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-danger',
		label: 'Button Danger',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-warning',
		label: 'Button Warning',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-info',
		label: 'Button Info',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-light',
		label: 'Button Light',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'btn-dark',
		label: 'Button Dark',
	} );
} );
