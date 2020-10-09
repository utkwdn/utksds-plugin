<?php
/**
 * Plugin Name: utds — CGB Gutenberg Block Plugin
 * Description: utds — is a Gutenberg plugin created via create-guten-block.
 * Author: Patrick Werner
 * Author URI: http://patrickwerner.org/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

add_filter( 'render_block', function( $block_content, $block ) {
	if ( 'core/button' === $block['blockName'] && isset( $block['attrs']['className'] ) ) {
		// The Bootstrap button classes
		$allowed_button_link_classes = array(
			'btn-primary',
			'btn-secondary',
			'btn-success',
			'btn-danger',
			'btn-warning',
			'btn-info',
			'btn-light',
			'btn-dark',
			'btn-link',
			'btn-outline-primary',
			'btn-outline-secondary',
			'btn-outline-success',
			'btn-outline-danger',
			'btn-outline-warning',
			'btn-outline-info',
			'btn-outline-light',
			'btn-outline-dark',
			'btn-lg',
			'btn-sm',
			'btn-block'
		);

		// Remove allowed button link classes from the button container first.
		$block_content = str_replace( 'is-style-', '', $block_content );
		$block_content = str_replace( $allowed_button_link_classes, '', $block_content );

		// Get custom button classes set for the block.
		$block['attrs']['className'] = str_replace( 'is-style-', '', $block['attrs']['className'] );
		$custom_classes = explode( ' ', $block['attrs']['className'] );

		// Apply allowed custom button link classes.
		$block_content = str_replace(
			'wp-block-button__link',
			'wp-block-button__link btn ' . implode( ' ', array_intersect( $custom_classes, $allowed_button_link_classes ) ),
			$block_content
		);
	}

	return $block_content;

}, 5, 2 );