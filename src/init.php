<?php
/**
 * Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

//this creates the utdesign system category for the new blocks
function utdesign_blocks_category($categories, $post) {
	return array_merge(
		$categories,
		array(
			array(
				'slug' => 'utdesign_system',
				'title' => 'UT Components',
				'icon' => 'welcome-learn-more'
			),
			array(
				'slug' => 'utdesign_layout',
				'title' => 'UT Layout',
				'icon' => 'welcome-learn-more'
			),
			array(
				'slug' => 'utdesign_content',
				'title' => 'UT Content',
				'icon' => 'welcome-learn-more'
			)
		)
	);
};

add_filter('block_categories', 'utdesign_blocks_category', 10, 2);

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function utds_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'utds-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'utds-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'utds-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'utds-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-utds', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'utds-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'utds-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'utds-cgb-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'utds_cgb_block_assets' );

/**
 * Deregister the gutenberg styles
 */
add_action( 'wp_print_styles', 'wps_deregister_styles', 100 );
function wps_deregister_styles() {
    wp_dequeue_style( 'wp-block-library' );
}

//Make Customizer secondary color value avaliable in Gutenberg//Add script for calendar block in the editor
if( get_theme_mod('site_secondary_color') ){
	function utksds_secondary_color_script(){
		wp_register_script( 'sc-handle-header', '' );
		wp_enqueue_script( 'sc-handle-header' );
		wp_add_inline_script( 'sc-handle-header', 'const secondaryColor = ' . get_theme_mod('site_secondary_color') );
	}
	add_action( 'enqueue_block_editor_assets', 'utksds_secondary_color_script', 100 );
}