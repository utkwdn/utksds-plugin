<?php
/**
 * Main file.
 *
 * @package OtterBlocks
 *
 * Plugin Name:       University of Tennessee UI Design System
 * Description:       Create beautiful posts, pages, and landing pages with Gutenberg Blocks and Template Library.
 * Version:           1
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

define( 'OTTER_BLOCKS_BASEFILE', __FILE__ );
define( 'OTTER_BLOCKS_URL', plugins_url( '/', __FILE__ ) );
define( 'OTTER_BLOCKS_PATH', dirname( __FILE__ ) );
define( 'OTTER_BLOCKS_DEV', false );

$vendor_file = OTTER_BLOCKS_PATH . '/vendor/autoload.php';
if ( is_readable( $vendor_file ) ) {
	require_once $vendor_file;
}

add_action(
	'plugins_loaded',
	function () {
		// call this only if Gutenberg is active.
		if ( function_exists( 'register_block_type' ) ) {
			require_once dirname( __FILE__ ) . '/class-otter-blocks.php';
			Otter_Blocks::instance();
		}
	}
);

add_filter(
	'themeisle_sdk_products',
	function ( $products ) {
		$products[] = __FILE__;

		return $products;
	}
);

add_action(
	'plugin_action_links_' . plugin_basename( __FILE__ ),
	function( $links ) {
		array_unshift(
			$links,
			sprintf( '<a href="%s">%s</a>', admin_url( 'options-general.php?page=otter' ), __( 'Settings', 'otter-blocks' ) )
		);
		return $links;
	}
);
