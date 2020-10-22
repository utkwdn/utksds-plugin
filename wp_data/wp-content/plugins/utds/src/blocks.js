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
import './media-object/media-object.js';

// DO NOT TOUCH
wp.domReady( function() {
	wp.blocks.unregisterBlockStyle( 'core/button', 'outline' );
	wp.blocks.unregisterBlockStyle( 'core/button', 'fill' );
	// begin unregistered blocks - can we pass this as an array?
	wp.blocks.unregisterBlockType( 'core/verse' );
	wp.blocks.unregisterBlockType( 'core/pullquote' );
	wp.blocks.unregisterBlockType( 'core/tag-cloud' );
	wp.blocks.unregisterBlockType( 'core/archives' );
	wp.blocks.unregisterBlockType( 'core/calendar' );
	wp.blocks.unregisterBlockType( 'core/categories' );
	wp.blocks.unregisterBlockType( 'core/latest-comments' );
	wp.blocks.unregisterBlockType( 'core/latest-posts' );
	wp.blocks.unregisterBlockType( 'core/search' );
	wp.blocks.unregisterBlockType( 'core/social-icons' );
	wp.blocks.unregisterBlockType( 'core-embed/flickr' );
	wp.blocks.unregisterBlockType( 'core-embed/wordpress' );
	wp.blocks.unregisterBlockType( 'core-embed/meetup-com' );
	wp.blocks.unregisterBlockType( 'core-embed/cloudup' );
	wp.blocks.unregisterBlockType( 'core-embed/collegehumor' );
	wp.blocks.unregisterBlockType( 'core-embed/funnyordie' );
	wp.blocks.unregisterBlockType( 'core-embed/photobucket' );
	wp.blocks.unregisterBlockType( 'core-embed/reddit' );
	wp.blocks.unregisterBlockType( 'core-embed/reverbnation' );
	wp.blocks.unregisterBlockType( 'core-embed/hulu' );
	wp.blocks.unregisterBlockType( 'core-embed/smugmug' );
	wp.blocks.unregisterBlockType( 'core-embed/speaker-deck' );
	wp.blocks.unregisterBlockType( 'core-embed/spotify' );
	wp.blocks.unregisterBlockType( 'core-embed/animoto' );
	wp.blocks.unregisterBlockType( 'core-embed/crowdsignal' );
	wp.blocks.unregisterBlockType( 'core-embed/dailymotion' );
	wp.blocks.unregisterBlockType( 'core-embed/imgur' );
	wp.blocks.unregisterBlockType( 'core-embed/scribd' );
	wp.blocks.unregisterBlockType( 'core-embed/screencast' );
	wp.blocks.unregisterBlockType( 'core-embed/issuu' );
	wp.blocks.unregisterBlockType( 'core-embed/kickstarter' );
	wp.blocks.unregisterBlockType( 'core-embed/slideshare' );
	wp.blocks.unregisterBlockType( 'core-embed/tiktok' );
	wp.blocks.unregisterBlockType( 'core-embed/ted' );
	wp.blocks.unregisterBlockType( 'core-embed/tumblr' );
	wp.blocks.unregisterBlockType( 'core-embed/videopress' );
	wp.blocks.unregisterBlockType( 'core-embed/wordpress-tv' );
	wp.blocks.unregisterBlockType( 'core-embed/amazon-kindle' );
	wp.blocks.unregisterBlockType( 'core-embed/mixcloud' );
} );
