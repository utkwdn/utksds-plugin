<?php
/**
 * Plugin Name: UT DESIGN SYSTEM - Gutenberg Blocks Collection
 * Version: 1
 * License: GPL2+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package ATOMIC BLOCKS
 */

/**
 * Exit if accessed directly
 */
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! function_exists( 'atomic_blocks_main_plugin_file' ) ) {
	/**
	 * Returns the full path and filename of the main Atomic Blocks plugin file.
	 *
	 * @return string
	 */
	function atomic_blocks_main_plugin_file() {
		return __FILE__;
	}

	// Load the rest of the plugin.
	require_once plugin_dir_path( __FILE__ ) . 'loader.php';
}
