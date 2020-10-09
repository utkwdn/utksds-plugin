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

// modify default block styles
// DO NOT TOUCH unless you're sure of what you're doing!
wp.domReady( function() {
	// button style overrides
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'bootstrap-default',
		label: 'Bootstrap Default',
		isDefault: true,
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'bootstrap-primary',
		label: 'Bootstrap Primary',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'bootstrap-success',
		label: 'Bootstrap Success',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'bootstrap-default-lg',
		label: 'Bootstrap Default Large',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'bootstrap-primary-lg',
		label: 'Bootstrap Primary Large',
	} );
	wp.blocks.registerBlockStyle( 'core/button', {
		name: 'bootstrap-success-lg',
		label: 'Bootstrap Success Large',
	} );

	// table style overrides
	function setBlockDefaultWPTable( className, blockName ) {
		return blockName === 'core/table' ?
			// [ 'wp-block-table', 'table' ] :
			'table' :
			className;
	}

	// Adding the filter
	wp.hooks.addFilter(
		'blocks.getBlockDefaultClassName',
		'utds/block-filters',
		setBlockDefaultWPTable
	);
} );
