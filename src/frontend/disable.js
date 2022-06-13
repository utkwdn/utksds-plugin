//The imports below allow all the non-block javascript to compile.
import './styles/index.js';
import './code/code.js';
import './heading/heading.js';
import './image/image.js';
import './list/list.js';
import './paragraph/paragraph.js';
import './quote/quote.js';
import './table/table.js';

// remove default button styles, declare default and/or plugin created blocks to selectively disabled.
// The following could should probably be spun off into './disable/disable.js' and this file renmaed to index.js.
// NOTE: Doing so would require modifying the code that registers the non-block javascript in plugin.php and the custom entrypoint in webpack.config.js
wp.domReady( () => {

	//console.log(wp.blocks.getBlockTypes());

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

	if(document.body.classList.contains( 'block-editor-page' ) && !document.body.classList.contains( 'widgets-php' )){
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
	}else if(document.body.classList.contains( 'block-editor-page' ) && document.body.classList.contains( 'widgets-php' )){
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