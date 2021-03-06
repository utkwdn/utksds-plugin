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
import './overlay/overlay.js';
//import './document-settings/document-settings.js';
import './list/list.js';
import './quote/quote.js';
import './code/code.js';
import './paragraph/paragraph.js';
import './contact-info/contact-info.js';

// remove default button styles, declare default and/or plugin created blocks to selectively disable
wp.domReady( function() {
	
	wp.richText.unregisterFormatType( 'core/text-color' );
	wp.richText.unregisterFormatType( 'core/image' );

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
	
	if(currentScreen.is_block_editor === true && currentScreen.id !== 'widgets'){
		var utksdsAllowedBlocks = [
			'utksds/contact',
			'utksds/phones',
			'utksds/socials',
			'utksds/phone',
			'core/button',
			'core/buttons',
			'core/columns',
			'core/column',
			'core/cover',
			'core/media-text',
			'core/pullquote',
			'core/search',
			'core/verse',
		]
	}else if(currentScreen.is_block_editor === true && currentScreen.id === 'widgets'){
		var utksdsAllowedBlocks = [
			'core/button',
			'core/buttons',
			'core/columns',
			'core/column',
			'core/cover',
			'core/media-text',
			'core/pullquote',
			'core/search',
			'core/verse',
		]
	}
	
	if(typeof utksdsAllowedBlocks !== 'undefined'){
		
		//console.log(wp.blocks.getBlockTypes());
		
		wp.blocks.getBlockTypes().forEach( function ( utksdsBlockSetup ) {
    		if ( 0 <= utksdsAllowedBlocks.indexOf( utksdsBlockSetup.name )) {
      			wp.blocks.unregisterBlockType( utksdsBlockSetup.name );
    		}
  		});
	}
	
} );
