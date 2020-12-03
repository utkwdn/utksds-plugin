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

//to create a new block, either create a new directory, along with js and scss files, or copy an existing directory with a new name. The block will be available once it is assigned a new name, and imported below

import './card/card.js';
import './accordion/accordion.js';
import './jumbotron/jumbotron.js';
import './media-object/media-object.js';
import './button/button.js';
import './table/table.js';
import './alert/alert.js';
import './lead/lead.js';

// remove default button styles, declare default and/or plugin created blocks to selectively disable
wp.domReady( function() {
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );

	const blocktodisable = [
		'core/verse',
		'core/pullquote',
		'core/tag-cloud',
		'core/archives',
		'core/calendar',
		'core/categories',
		'core/latest-comments',
//		'core/latest-posts',
		'core/search',
		'core/social-icons',
		'core/audio',
		'core/cover',
		'core/preformatted',
		'core/media-text',
//  	'core/buttons',
    'core/text-columns',
    'core/columns',
    'core/html',
    'core/more',
    'core/nextpage',
    'core/separator',
    'core/spacer',
    'core/group',

		'core-embed/flickr',
		'core-embed/wordpress',
		'core-embed/meetup-com',
		'core-embed/cloudup',
		'core-embed/collegehumor',
		'core-embed/funnyordie',
		'core-embed/photobucket',
		'core-embed/reddit',
		'core-embed/reverbnation',
		'core-embed/hulu',
		'core-embed/smugmug',
		'core-embed/speaker-deck',
		'core-embed/spotify',
		'core-embed/animoto',
		'core-embed/crowdsignal',
		'core-embed/dailymotion',
		'core-embed/imgur',
		'core-embed/scribd',
		'core-embed/screencast',
		'core-embed/issuu',
		'core-embed/kickstarter',
		'core-embed/slideshare',
		'core-embed/tiktok',
		'core-embed/ted',
		'core-embed/tumblr',
		'core-embed/videopress',
		'core-embed/wordpress-tv',
		'core-embed/amazon-kindle',
		'core-embed/mixcloud',

	];

	const disabledBlocks = blocktodisable.map( blockSlug => wp.blocks.unregisterBlockType( blockSlug ) );
	return disabledBlocks;
} );
