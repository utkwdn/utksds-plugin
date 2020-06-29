<?php
/**
 * Plugin Name: gutenstrap_old
 * Description: reference only!
 * Author: Werner, Patrick
 * Version: 0.0.0
 * License: Do what you want license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

// Define WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE.
if ( ! defined( 'WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE' ) ) {
	define( 'WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE', __FILE__ );
}

// Include the main WP_Bootstrap_Blocks class.
if ( ! class_exists( \WP_Bootstrap_Blocks\WP_Bootstrap_Blocks::class ) ) {
	require_once plugin_dir_path( WP_BOOTSTRAP_BLOCKS_PLUGIN_FILE ) . 'src/class-wp-bootstrap-blocks.php';
}

// Initialize plugin
\WP_Bootstrap_Blocks\WP_Bootstrap_Blocks::instance();
