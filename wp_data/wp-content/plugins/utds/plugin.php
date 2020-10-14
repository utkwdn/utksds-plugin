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
	if ( $block['blockName'] === 'core/button' ) {

		// Find the button settings in the Wordpress classes
		$start = 'wp-block-button ';
		$end = '">';
		
		$string = ' ' . $block_content;
		$ini = strpos($string, $start);
    	if ($ini == 0) return '';
    	$ini += strlen($start);
    	$len = strpos($string, $end, $ini) - $ini;
    	$parsed_classes = substr($string, $ini, $len);
		
		// Clean up the Wordpress classes so they don't have any bootstrap fragments from the button settings
		$class_needle = 'wp-block-button '.$parsed_classes;
		$block_content = str_replace($class_needle, 'wp-block-button', $block_content);

		// Translate the button settings into Bootstrap classes
		$custom_classes = explode( ' ', $parsed_classes );
		
		$btnClasses = '';
		if(isset($custom_classes[0]) && $custom_classes[0] == 'btn-fill'){
			$btnClasses .= $custom_classes[1];
		}elseif(isset($custom_classes[0]) && $custom_classes[0] == 'btn-outline'){
			$btnColor = str_replace('btn', '', $custom_classes[1]);
			$btnClasses .= $custom_classes[0] . $btnColor;
		}elseif(isset($custom_classes[0]) && $custom_classes[0] == 'btn-link'){
			$btnClasses .= $custom_classes[0];
		}
		if(isset($custom_classes[2]) && $custom_classes[2] != 'btn-normal'){
			$btnClasses .= ' ' . $custom_classes[2];
		}

		// Apply the Bootstrap button link classes.
		$block_content = str_replace(
			'wp-block-button__link',
			'wp-block-button__link btn ' . $btnClasses,
			$block_content
		);
	}

	return $block_content;

}, 5, 2 );