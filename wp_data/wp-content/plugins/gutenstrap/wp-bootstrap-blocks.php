<?php
/**
 * Plugin Name: gutenstrap
 * Description: Bootstrap Gutenberg Blocks
 * Author: Werner, Patrick
 * Version: 1.0.0
 * License: GPL2+
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
