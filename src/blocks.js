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

import { registerBlockType } from '@wordpress/blocks';

//to create a new block, either create a new directory, along with js and scss files, or copy an existing directory with a new name. The block will be available once it is assigned a new name, and imported below

import './card/card.js';
import './accordion/accordion.js';
//import './jumbotron/jumbotron.js';
import './media-object/media-object.js';
import './button/button.js';
import './table/table.js';
import './image/image.js';
import './alert/alert.js';
import './lead/lead.js';
import './strip/strip.js';
import './columns/columns.js';
import './calendar/calendar.js';
import './horizontal-rule/horizontal-rule.js';
//import './cover/cover.js';
import './heading/heading.js';
import './tabs/tabs.js';
//import './remote-data/remote-data.js';


// remove default button styles, declare default and/or plugin created blocks to selectively disable
wp.domReady( function() {
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );

	const allowedEmbedBlocks = [
    	'twitter',
    	'youtube',
		'soundcloud',
		'flickr',
		'vimeo',
  	];
  	wp.blocks.getBlockVariations( 'core/embed' ).forEach( function ( blockVariation ) {
    	if ( -1 === allowedEmbedBlocks.indexOf( blockVariation.name )) {
      		wp.blocks.unregisterBlockVariation( 'core/embed', blockVariation.name );
    	}
  	});
	
	const blocktodisable = [
		'core/verse',
		'core/pullquote',
		'core/tag-cloud',
		'core/archives',
		'core/calendar',
		'core/categories',
		'core/latest-comments',
		'core/search',
		//'core/social-icons',
		'core/audio',
		'core/cover',
		'core/preformatted',
		'core/media-text',
    	'core/text-columns',
		'core/columns',
		'core/button',
    	'core/more',
    	'core/nextpage',
    	'core/separator',
    	'core/spacer',
    	'core/group',
		//'core/embed',
	];

	const disabledBlocks = blocktodisable.map( blockSlug => wp.blocks.unregisterBlockType( blockSlug ) );
	return disabledBlocks;
	
} );
