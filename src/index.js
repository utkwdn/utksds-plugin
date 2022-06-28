// remove default button styles, declare default and/or plugin created blocks to selectively disable
// This was from the original plugin, but I haven't been able to get it to work yet
// I have opted to disable the blocks in init.php.
// -mp


wp.domReady( function() {

	
	wp.blocks.unregisterBlockType( 'core/verse' );



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