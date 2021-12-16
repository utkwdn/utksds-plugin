<?php
/**
 * Plugin Name: Design System Gutenberg Block Plugin
 * Description: utds — is a Gutenberg plugin created via create-guten-block.
 * Author: University of Tennessee, Office of Communications and Marketing
 * Author URI: https://communications.utk.edu/
 * Version: 0.0.9
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

require 'plugin-update-checker/plugin-update-checker.php';
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/utkwdn/utksds-plugin',
	__FILE__,
	'utksds-plugin'
);

//Set the branch that contains the stable release.
//$myUpdateChecker->setBranch('main');
$myUpdateChecker->getVcsApi()->enableReleaseAssets();

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';

/*
The following code exists to bring class names on core Wordpress blocks into alignment with Bootstrap naming conventions.
Wordpress provides filters to add custom classes to its blocks, but when using Bootstrap, there are two problems with the filter's behavior:

1. It adds the classes to container div instead of the element itself
2. The filter prepends "is-style-" to he beginning of any custom class

This code removes the extraneous "is-style-" addition and puts the class on the element Bootstrap expects it to be on.

Our first approach to adding Bootstrap classes to the button block was to use wp.blocks.registerBlockStyle in blocks.js. This added the classes to $block['attrs']['className'] and prepended "is-style-" to each class. While this method worked, it required creating a seperate style for every possible combination of Bootstrap button classes. This would have ended up with somewhere in the ballpark of 164 options available to choose from on the button block. This presented an overwhelming number of options for page editors, so we explored other ways to extend the button block.

As of this writing, we settled on a set of three groups of radio options. The first selects color based on Bootstrap's criteria (primary, secodary, info, danger, warning, etc.). The second selects fill (full, outline, or text). The last selection offers size (small, normal, large, and block). The block editor outputs temporary classes to the container div. These temporary classes only reflect what the editor chose from the three groups of options. They're not intended to be used with CSS. They exist solely to assist the PHP filter in generating the correct Bootstrap classes.

Once the selections are chosen, the block content ($block_content) and block array ($block) are passed to the PHP filter. Unfortunately, the classes from the radio selections are not stored in $block['attrs']['className']. So far, I haven't found them anywhere else in the $block array. This makes reading and modifying the selected classes more difficult than the original implementation. I read the selected classes by parsing the entire $block_content using 'wp-block-button ' as the beginning of the desired text and '">' as the end. Everything in between should be the classes from the radio selections. It splits them into an array to make them easier to work with, and reads each of the three options, outputing a class string of the correct Bootstrap class(es) based on the editor's selections. In then removes the radio selection classes from the container div and adds the Bootstrap class string to the button's a tag using 'wp-block-button__link' as a guide to know where to add the string.

I anticipate a similar method will be used to add Bootstrap classes to the other core Wordpress blocks.
*/
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
		
		$color_classes = array(
			'btn-primary',
			'btn-secondary',
			'btn-success',
			'btn-danger',
			'btn-warning',
			'btn-info',
			'btn-light',
			'btn-dark',
		);
		
		$fill_classes = array(
			'btn-fill',
			'btn-outline',
			'btn-link',
		);
		
		$size_classes = array(
			'btn-sm',
			'btn-normal',
			'btn-lg',
			'btn-block',
		);
		
		$btnOptions['fill'] = array_intersect($fill_classes, $custom_classes);
		$btnOptions['fill'] = implode(' ', $btnOptions['fill']);
		
		$btnOptions['color'] = array_intersect($color_classes, $custom_classes);
		$btnOptions['color'] = implode(' ', $btnOptions['color']);
		
		$btnOptions['size'] = array_intersect($size_classes, $custom_classes);
		$btnOptions['size'] = implode(' ', $btnOptions['size']);
		
		$btnClasses = '';
		if(isset($btnOptions['fill']) && $btnOptions['fill'] == 'btn-fill'){
			$btnClasses .= $btnOptions['color'];
		}elseif(isset($btnOptions['fill']) && $btnOptions['fill'] == 'btn-outline'){
			$btnColor = str_replace('btn', '', $btnOptions['color']);
			$btnClasses .= $btnOptions['fill'] . $btnColor;
		}elseif(isset($btnOptions['fill']) && $btnOptions['fill'] == 'btn-link'){
			$btnClasses .= $btnOptions['fill'];
		}
		if(isset($btnOptions['size']) && $btnOptions['size'] != 'btn-normal'){
			$btnClasses .= ' ' . $btnOptions['size'];
		}

		// Apply the Bootstrap button link classes.
		$block_content = str_replace(
			'wp-block-button__link',
			'wp-block-button__link btn ' . $btnClasses,
			$block_content
		);
	}
	
	if ( $block['blockName'] === 'core/table' ) {
		$start = 'wp-block-table ';
		$end = '">';
		
		$string = ' ' . $block_content;
		$ini = strpos($string, $start);
    	if ($ini == 0) return '';
    	$ini += strlen($start);
    	$len = strpos($string, $end, $ini) - $ini;
    	$parsed_classes = substr($string, $ini, $len);
		
		// Clean up the Wordpress classes so they don't have any bootstrap fragments from the button settings
		$class_needle = 'wp-block-table '.$parsed_classes;
		$block_content = str_replace($class_needle, 'wp-block-table', $block_content);
		
		$parsed_classes = str_replace('is-style-', '', $parsed_classes);
		
		//turn $parsed_classes into array
		$custom_classes = explode( ' ', $parsed_classes );
		
		//create arrays of possible options
		$table_classes = array(
			'table-dark',
			'table-striped',
			'table-bordered',
			'table-borderless',
			'table-hover',
			'table-sm'
		);
		
		$thead_classes = array(
			'thead-light',
			'thead-dark'
		);
		
		$container_classes = array(
			'table-responsive'
		);
		
		//check intersection of option arrays with $parsed_classes array
		$selected_table_classes = array_intersect($table_classes, $custom_classes);
		$selected_thead_classes = array_intersect($thead_classes, $custom_classes);
		$selected_container_classes = array_intersect($container_classes, $custom_classes);
		
		//build strings of classes based on findings
		$table_class_string = 'table '.implode(' ', $selected_table_classes);
		$thead_class_string = implode(' ', $selected_thead_classes);
		$container_class_string = implode(' ', $selected_container_classes);
		
		//put strings of classes where they belong in table html
		if(isset($table_class_string) && $table_class_string != ''){
			$block_content = str_replace('<table>', '<table class="'.$table_class_string.'">', $block_content);
		}
		if(isset($thead_class_string) && $thead_class_string != ''){
			$block_content = str_replace('<thead>', '<thead class="'.$thead_class_string.'">', $block_content);
		}
		if(isset($container_class_string) && $container_class_string != ''){
			$block_content = str_replace('<table', '<div class="'.$container_class_string.'"><table', $block_content);
			$block_content = str_replace('</table>', '</table></div>', $block_content);
		}
	}
	
	if ( $block['blockName'] === 'core/image' ) {
		$start = 'wp-block-image ';
		$end = '">';
		
		$string = ' ' . $block_content;
		$ini = strpos($string, $start);
    	if ($ini == 0) return '';
    	$ini += strlen($start);
    	$len = strpos($string, $end, $ini) - $ini;
    	$parsed_classes = substr($string, $ini, $len);
		
		$custom_classes = explode( ' ', $parsed_classes );
		
		if(in_array('is-style-framed', $custom_classes)){
			$caption_start = '<figcaption>';
			$caption_end = '</figcaption>';
			$caption_ini = strpos($string, $caption_start);
    		if ($caption_ini != 0){
    			$caption_ini += strlen($caption_start);
    			$caption_len = strpos($string, $caption_end, $caption_ini) - $caption_ini;
    			$parsed_caption = substr($string, $caption_ini, $caption_len);
			}else{
				$parsed_caption = '';
			}
			
			$figclass_start = '<figure class="';
			$figclass_end = '">';
			$figclass_ini = strpos($string, $figclass_start);
    		if ($figclass_ini != 0){
    			$figclass_ini += strlen($figclass_start);
    			$figclass_len = strpos($string, $figclass_end, $figclass_ini) - $figclass_ini;
    			$figclass = substr($string, $figclass_ini, $figclass_len);
			}else{
				$figclass = '';
			}
			
			$figclasses = explode( ' ', $figclass );
			
			$block_content = strip_tags($block_content, ['a', 'img']);
			
			$new_content = '<div class="';
			foreach($custom_classes as $id=>$class){
				if($class != 'is-style-framed'){
					if($id==0){
						$new_content .= 'wp-block-image '.$class.' ';
					}else{
						$new_content .= $class.' ';
					}
				}else{
					if($id==0){
						$new_content .= 'wp-block-image ';
					}
				}
			}
			$new_content .= '">';
			$new_content .= '<figure class="framed-figure ';
			foreach($figclasses as $figure_class){
				$new_content .= $figure_class.' ';
			}
			$new_content .= '"><div class="framed">';
			$new_content .= str_replace($parsed_caption, '', $block_content);
			$new_content .= '</div>';
			if(isset($parsed_caption) && $parsed_caption != ''){
				$new_content .= '<figcaption>'.$parsed_caption.'</figcaption>';
			}
			$new_content .= '</figure></div>';
			
			$block_content = $new_content;
			
		}
		
		/*$block_content = strip_tags($block_content, ['a', 'img']);
		
		$block_content = str_replace(
			'wp-image',
			$parsed_classes.' wp-image',
			$block_content
		);
		
		$block_content = str_replace('is-style-framed', 'framed', $block_content);
		
		$block_content = str_replace('is-style-', '', $block_content);
		$block_content = str_replace('<figure', '<div', $block_content);
		$block_content = str_replace('</figure', '</div', $block_content);*/
	}
	
	if ( $block['blockName'] === 'core/list' ) {
		
		$block_content = str_replace('is-style-', '', $block_content);
	}
	
	if ( $block['blockName'] === 'core/heading' ) {
		$block_content = str_replace('is-style-', '', $block_content);
	}

	return $block_content;

}, 5, 2 );
