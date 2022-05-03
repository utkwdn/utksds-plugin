<?php
/**
 * Plugin Name:       Design System Gutenberg Block Plugin
 * Description:       utksds is a Gutenberg plugin created via Create Block tool.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            University of Tennessee, Office of Communications and Marketing
 * Author URI:		  https://communications.utk.edu/
 * License:           GPL2+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       utksds
 *
 * @package           create-block
 */

require 'plugin-update-checker/plugin-update-checker.php';
$myUpdateChecker = Puc_v4_Factory::buildUpdateChecker(
	'https://github.com/utkwdn/utksds-plugin',
	__FILE__,
	'utksds-plugin'
);

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

//Set the branch that contains the stable release.
//$myUpdateChecker->setBranch('main');
$myUpdateChecker->getVcsApi()->enableReleaseAssets();

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_block_test_block_init() {
	$block_list = [
		'accordion',
		'accordion-fold',
		'alert',
		'button',
		'button-group',
		'calendar',
		'card',
		'card-body',
		'card-footer',
		'card-header',
		'card-heading',
		'card-image',
		'card-main',
		'card-topcap',
		'column',
		'columns',
		'contact',
		'horizontal-rule',
		'lead',
		'media-content',
		'media-object',
		'overlay',
		'overlay-main',
		'phone',
		'phones',
		'socials',
		'strip',
		'tab',
		'tabs'
	];
	foreach($block_list as $this_block){
		register_block_type( __DIR__ . '/build/blocks/' . $this_block );
	}
}
add_action( 'init', 'create_block_block_test_block_init' );

function utksds_scripts_init(){
	wp_register_script( 'disable', plugins_url('utksds-plugin') . '/build/frontend/disable.js', array( 'wp-blocks', 'wp-block-library', 'wp-i18n', 'wp-element', 'wp-editor' ), null, true );
	//wp_enqueue_script( 'disable' );
	
	register_block_type(
		'cgb/block-utds', array(
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'disable',
		)
	);

}
add_action( 'init', 'utksds_scripts_init' );

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

//disables loading remote patterns
function utksds_disable_remote_patterns(){
	return false;
}
add_filter( 'should_load_remote_block_patterns', 'utksds_disable_remote_patterns' );

//adds patterns to available patterns list
function utksds_register_patterns() {

	//disables built-in core patterns
	unregister_block_pattern( 'core/query-standard-posts' );
	unregister_block_pattern( 'core/query-medium-posts' );
	unregister_block_pattern( 'core/query-small-posts' );
	unregister_block_pattern( 'core/query-grid-posts' );
	unregister_block_pattern( 'core/query-large-title-posts' );
	unregister_block_pattern( 'core/query-offset-posts' );
	unregister_block_pattern( 'core/social-links-shared-background-color' );

	register_block_pattern(
		'utksds/profile-pattern',
    array(
        'title'       => __( 'Person Profile', 'UTKSDS' ),
        'description' => _x( 'A profile of a single person, including an image, their name, title, bio, and contact information.', 'Block pattern description', 'UTKSDS' ),
		'categories'  => array( 'buttons' ),
        'content'     => "<!-- wp:group {\"className\":\"col-lg-4 border border-dark\"} -->
		<div class=\"wp-block-group col-lg-4 border border-dark\"><!-- wp:utksds/columns {\"rowClass\":\"column-100\",\"numCols\":1,\"className\":\"bg-orange justify-content-center w-100 gx-0\"} -->
		<div class=\"wp-block-utksds-columns row bg-orange justify-content-center w-100 gx-0\"><!-- wp:utksds/column {\"colWidth\":12} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-12\"><!-- wp:image {\"align\":\"center\",\"id\":550,\"width\":200,\"height\":200,\"sizeSlug\":\"full\",\"linkDestination\":\"none\",\"className\":\"is-style-rounded mb-n5 mt-3\"} -->
		<div class=\"wp-block-image is-style-rounded mb-n5 mt-3\"><figure class=\"aligncenter size-full is-resized\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/smokey-x-01.png\" alt=\"\" class=\"wp-image-550\" width=\"200\" height=\"200\"/></figure></div>
		<!-- /wp:image --></div>
		<!-- /wp:utksds/column --></div>
		<!-- /wp:utksds/columns -->
		
		<!-- wp:utksds/columns {\"rowClass\":\"column-100\",\"numCols\":1,\"className\":\"p-5\"} -->
		<div class=\"wp-block-utksds-columns row p-5\"><!-- wp:utksds/column {\"colWidth\":12} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-12\"><!-- wp:heading -->
		<h2>Smokey X</h2>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p><strong><em>Volunteer's Best Friend</em></strong></p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>865-234-1235 | <a href=\"mailto:smokeyx@utk.edu\"><a href=\"mailto:smokeyx@utk.edu\">smokeyx@utk.edu</a></a></p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>Etiam lacus nisl, congue vel vehicula ac, porta nec quam. Vestibulum a tempus neque, vitae posuere tellus. Sed imperdiet quam eu gravida commodo. In arcu sapien, imperdiet eu lobortis et, hendrerit vitae metus. Ut orci tellus, egestas sit amet euismod sit amet, mattis ac enim. Donec condimentum velit sit amet justo consectetur facilis.</p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:utksds/column --></div>
		<!-- /wp:utksds/columns --></div>
		<!-- /wp:group -->",
    )
	);

	register_block_pattern(
		'utksds/page-pattern',
    array(
        'title'       => __( 'Starter Page', 'UTKSDS' ),
        'description' => _x( 'A sample page layout to get started.', 'Block pattern description', 'UTKSDS' ),
		'categories'  => array( 'buttons' ),
        'content'     => "<!-- wp:spacer {\"height\":50} -->
		<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:utksds/columns {\"rowClass\":\"column-30-70\",\"numCols\":2} -->
		<div class=\"wp-block-utksds-columns row\"><!-- wp:utksds/column {\"className\":\"border-end pe-3 mb-5\"} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-3 border-end pe-3 mb-5\"><!-- wp:image {\"id\":223,\"sizeSlug\":\"medium\",\"linkDestination\":\"none\",\"className\":\"is-style-framed\"} -->
		<figure class=\"wp-block-image size-medium is-style-framed\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-223\"/></figure>
		<!-- /wp:image -->
		
		<!-- wp:paragraph -->
		<p><strong>Duis Lacinia Nis</strong></p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph {\"fontSize\":\"normal\"} -->
		<p class=\"has-normal-font-size\"><em>Nunc pretium nibh ac quam finibus, rutrum tempor odio lacinia. Proin id orci in nisl molestie tincidunt non id ligula. Phasellus cursus scelerisque orci ut aliquet. Curabitur vel orci cursus, aliquam diam.</em></p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:utksds/column -->
		
		<!-- wp:utksds/column {\"colWidth\":9,\"className\":\"ps-5\"} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-9 ps-5\"><!-- wp:heading {\"className\":\"is-style-default\"} -->
		<h2 class=\"is-style-default\">Nam et Vestibulum</h2>
		<!-- /wp:heading -->
		
		<!-- wp:spacer {\"height\":25} -->
		<div style=\"height:25px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:paragraph -->
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus maximus massa vel lobortis. Pellentesque id sem aliquet, facilisis arcu nec, sagittis est. Aliquam quis eleifend urna. Donec hendrerit, purus eu elementum rhoncus, orci metus ultrices erat, congue viverra urna leo eget quam. Aenean diam leo, lobortis at euismod et, fermentum in metus. Nunc pretium nibh ac quam finibus, rutrum tempor odio lacinia. Proin id orci in nisl molestie tincidunt non id ligula. Phasellus cursus scelerisque orci ut aliquet. Curabitur vel orci cursus, aliquam diam et, sollicitudin mi. Praesent sit amet felis sed est feugiat euismod quis vulputate turpis. Suspendisse ut metus pharetra, luctus lacus a, ornare ante. In aliquet commodo diam, quis varius enim. Nulla posuere metus turpis, vel eleifend massa gravida sed.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:image {\"align\":\"right\",\"id\":223,\"width\":292,\"height\":292,\"sizeSlug\":\"thumbnail\",\"linkDestination\":\"none\",\"className\":\"d-inline-block float-end\"} -->
		<div class=\"wp-block-image d-inline-block float-end\"><figure class=\"alignright size-thumbnail is-resized\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-223\" width=\"292\" height=\"292\"/></figure></div>
		<!-- /wp:image -->
		
		<!-- wp:paragraph -->
		<p>Nunc aliquam varius commodo. Nam et vestibulum ante. Nunc in est tellus. Nam quis odio non sem faucibus faucibus vel in erat. Nulla risus mauris, vulputate nec commodo tempus, euismod vitae nunc. Vestibulum eget dapibus justo. Duis at lacinia nisl. Aenean fringilla venenatis tempor. Donec efficitur velit nec ante tincidunt accumsan sed in enim. Praesent auctor justo mattis augue tincidunt suscipit.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>Suspendisse a mauris sed quam ultricies sodales nec id orci. Donec vitae auctor leo, et auctor enim. Donec vitae velit pretium, vulputate tellus eu, interdum felis. Curabitur nec mattis enim. Integer magna felis, placerat eu sollicitudin id, dignissim at nibh. Proin tempus accumsan lorem, a ornare velit vehicula tincidunt. Morbi vel lacus arcu. Nunc eu volutpat metus, in convallis nisi. Mauris pulvinar dolor at magna consequat, et auctor diam facilisis. Integer faucibus vulputate ante non semper. Duis in neque sit amet mi dictum imperdiet. Cras non consequat lorem, eget facilisis purus. Pellentesque vel massa ultrices, porta dolor ac, ornare lectus. Maecenas venenatis consequat arcu, eget dapibus ligula auctor at.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:group {\"className\":\"my-5\"} -->
		<div class=\"wp-block-group my-5\"><!-- wp:utksds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-utlink\",\"color\":\"#1a73c5\",\"text\":\"text-white\"},\"className\":\"d-inline-block\"} -->
		<div class=\"wp-block-utksds-button d-inline-block\"><a class=\"btn save mb-3 btn-utlink btn-nrml\"><span>Explore Area 02</span><span></span></a></div>
		<!-- /wp:utksds/button -->
		
		<!-- wp:utksds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-utlink\",\"color\":\"#1a73c5\",\"text\":\"text-white\"},\"className\":\"d-inline-block\"} -->
		<div class=\"wp-block-utksds-button d-inline-block\"><a class=\"btn save mb-3 btn-utlink btn-nrml\"><span>Explore Area 01</span><span></span></a></div>
		<!-- /wp:utksds/button -->
		
		<!-- wp:utksds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-utlink\",\"color\":\"#1a73c5\",\"text\":\"text-white\"},\"className\":\"d-inline-block\"} -->
		<div class=\"wp-block-utksds-button d-inline-block\"><a class=\"btn save mb-3 btn-utlink btn-nrml\"><span>Explore Area 03</span><span></span></a></div>
		<!-- /wp:utksds/button --></div>
		<!-- /wp:group --></div>
		<!-- /wp:utksds/column --></div>
		<!-- /wp:utksds/columns -->
		
		<!-- wp:spacer {\"height\":50} -->
		<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:strip/main {\"padding\":\"p-md\"} -->
		<div class=\"wp-block-strip-main\"><div class=\"strip strip-smokey text-white p-md my-0\"><div class=\"container\"><!-- wp:utksds/columns {\"rowClass\":\"column-70-30\",\"numCols\":2} -->
		<div class=\"wp-block-utksds-columns row\"><!-- wp:utksds/column {\"colWidth\":8} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-8\"><!-- wp:quote {\"className\":\"text-white\"} -->
		<blockquote class=\"wp-block-quote text-white\"><p>Maecenas et turpis metus. Integer ut volutpat augue. Vestibulum ante lectus, aliquet vel sem in, viverra ornare dui. Mauris id nisi tortor. Quisque risus ante, tristique non vulputate aliquet, rutrum non risus. Aliquam vulputate elementum diam, ut molestie ligula egestas sit amet.</p><cite>Aliquam Volutpat</cite></blockquote>
		<!-- /wp:quote --></div>
		<!-- /wp:utksds/column -->
		
		<!-- wp:utksds/column {\"colWidth\":4} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-4\"><!-- wp:image {\"id\":223,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} -->
		<figure class=\"wp-block-image size-large\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-223\"/></figure>
		<!-- /wp:image --></div>
		<!-- /wp:utksds/column --></div>
		<!-- /wp:utksds/columns --></div></div></div>
		<!-- /wp:strip/main -->
		
		<!-- wp:spacer -->
		<div style=\"height:100px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:utksds/columns {\"rowClass\":\"column-50-50\",\"numCols\":2} -->
		<div class=\"wp-block-utksds-columns row\"><!-- wp:utksds/column {\"colWidth\":6} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-6\"><!-- wp:heading {\"level\":3} -->
		<h3><p>Vulputate Aliquet</p></h3>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p>Aliquam erat volutpat. Morbi et dictum elit, sed sagittis urna. Nam quis tempor justo, quis tempor augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque elit tortor, aliquam sed nisi ac, semper laoreet nulla. Nullam in finibus urna. Sed gravida sapien dapibus tortor facilisis pretium. Aenean accumsan arcu a enim semper, quis porta ligula tincidunt. In hac habitasse platea dictumst. Cras tempor velit eget massa convallis, bibendum aliquam felis cursus.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:utksds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-utlink\",\"color\":\"#1a73c5\",\"text\":\"text-white\"}} -->
		<div class=\"wp-block-utksds-button\"><a class=\"btn save mb-3 btn-utlink btn-nrml\"><span>Explore Vulputate</span><span></span></a></div>
		<!-- /wp:utksds/button --></div>
		<!-- /wp:utksds/column -->
		
		<!-- wp:utksds/column {\"colWidth\":6} -->
		<div class=\"wp-block-utksds-column undefined col-12 col-md-6\"><!-- wp:gallery {\"ids\":[223,217,526,527],\"columns\":2,\"linkTo\":\"none\",\"align\":\"center\"} -->
		<figure class=\"wp-block-gallery aligncenter columns-2 is-cropped\"><ul class=\"blocks-gallery-grid\"><li class=\"blocks-gallery-item\"><figure><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" data-id=\"223\" data-link=\"http://localhost:8888/wp-utk/pattern-page/5x7-placeholder-02/\" class=\"wp-image-223\"/></figure></li><li class=\"blocks-gallery-item\"><figure><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder.png\" alt=\"\" data-id=\"217\" data-link=\"http://localhost:8888/wp-utk/pattern-page/5x7-placeholder/\" class=\"wp-image-217\"/></figure></li><li class=\"blocks-gallery-item\"><figure><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-03.png\" alt=\"\" data-id=\"526\" data-full-url=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-03.png\" data-link=\"http://localhost:8888/wp-utk/page-2/5x7-placeholder-03/\" class=\"wp-image-526\"/></figure></li><li class=\"blocks-gallery-item\"><figure><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-04.png\" alt=\"\" data-id=\"527\" data-full-url=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-04.png\" data-link=\"http://localhost:8888/wp-utk/page-2/5x7-placeholder-04/\" class=\"wp-image-527\"/></figure></li></ul><figcaption class=\"blocks-gallery-caption\">Duis in neque sit amet mi dictum</figcaption></figure>
		<!-- /wp:gallery --></div>
		<!-- /wp:utksds/column --></div>
		<!-- /wp:utksds/columns -->
		
		<!-- wp:spacer {\"height\":50} -->
		<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->",
		)
		);
  }
   
  add_action( 'init', 'utksds_register_patterns' );