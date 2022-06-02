<?php
/**
 * Plugin Name:       Design System Gutenberg Block Plugin
 * Description:       utkwds is a Gutenberg plugin created via Create Block tool.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            University of Tennessee, Office of Communications and Marketing
 * Author URI:		  https://communications.utk.edu/
 * License:           GPL2+
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       utkwds
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
		'tabs',
		'accordion-depreciated',
		'accordion-fold-depreciated',
		'alert-depreciated',
		'button-depreciated',
		'calendar-depreciated',
		'card-depreciated',
		'card-body-depreciated',
		'card-footer-depreciated',
		'card-header-depreciated',
		'card-heading-depreciated',
		'card-image-depreciated',
		'card-main-depreciated',
		'card-topcap-depreciated',
		'column-depreciated',
		'columns-depreciated',
		'contact-depreciated',
		'horizontal-rule-depreciated',
		'lead-depreciated',
		'media-content-depreciated',
		'media-object-depreciated',
		'overlay-depreciated',
		'overlay-main-depreciated',
		'phone-depreciated',
		'phones-depreciated',
		'socials-depreciated',
		'strip-depreciated',
		'tab-depreciated',
		'tabs-depreciated'
	];
	foreach($block_list as $this_block){
		register_block_type( __DIR__ . '/build/blocks/' . $this_block );
	}
}
add_action( 'init', 'create_block_block_test_block_init' );

function utkwds_scripts_init(){
	wp_register_script( 'disable', plugins_url('utkwds-plugin') . '/build/frontend/disable.js', array( 'wp-blocks', 'wp-block-library', 'wp-i18n', 'wp-element', 'wp-editor' ), null, true );
	//wp_enqueue_editor( 'editor-style', plugins_url('utkwds-plugin') . '/build/frontend/disable.css' );

	wp_register_style(
		'editor-style-utds', // Handle.
		plugins_url( 'utkwds-plugin' ) . '/build/frontend/disable.css', // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);
	
	register_block_type(
		'cgb/block-utds', array(
			'editor_script' => 'disable',
			'editor_style'  => 'editor-style-utds',
		)
	);

}
add_action( 'init', 'utkwds_scripts_init' );

/**
 * Runs other plugin functions.
 */
require 'src/init.php';

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
function utkwds_disable_remote_patterns(){
	return false;
}
add_filter( 'should_load_remote_block_patterns', 'utkwds_disable_remote_patterns' );

//adds patterns to available patterns list
function utkwds_register_patterns() {

	//disables built-in core patterns
	unregister_block_pattern( 'core/query-standard-posts' );
	unregister_block_pattern( 'core/query-medium-posts' );
	unregister_block_pattern( 'core/query-small-posts' );
	unregister_block_pattern( 'core/query-grid-posts' );
	unregister_block_pattern( 'core/query-large-title-posts' );
	unregister_block_pattern( 'core/query-offset-posts' );
	unregister_block_pattern( 'core/social-links-shared-background-color' );

	register_block_pattern(
		'utkwds/profile-pattern',
    array(
        'title'       => __( 'Person Profile', 'utkwds' ),
        'description' => _x( 'A profile of a single person, including an image, their name, title, bio, and contact information.', 'Block pattern description', 'utkwds' ),
		'categories'  => array( 'buttons' ),
        'content'     => "<!-- wp:group {\"className\":\"col-lg-4 border border-dark\"} -->
		<div class=\"wp-block-group col-lg-4 border border-dark\"><!-- wp:utkwds/columns {\"rowClass\":\"column-100\",\"numCols\":1} -->
		<div class=\"row undefined\"><!-- wp:utkwds/column {\"colWidth\":12,\"className\":\"col-12\"} -->
		<div class=\"undefined col-12 col-md-12 col-12\"><!-- wp:image {\"align\":\"center\",\"id\":247,\"width\":200,\"height\":200,\"sizeSlug\":\"full\",\"linkDestination\":\"none\",\"className\":\"mb-n5 mt-3 is-style-rounded\"} -->
		<div class=\"wp-block-image mb-n5 mt-3 is-style-rounded\"><figure class=\"aligncenter size-full is-resized\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/smokey-x-01.png\" alt=\"\" class=\"wp-image-247\" width=\"200\" height=\"200\"/></figure></div>
		<!-- /wp:image --></div>
		<!-- /wp:utkwds/column --></div>
		<!-- /wp:utkwds/columns -->
		
		<!-- wp:utkwds/columns {\"rowClass\":\"column-100\",\"numCols\":1} -->
		<div class=\"row undefined\"><!-- wp:utkwds/column {\"colWidth\":12,\"className\":\"col-12\"} -->
		<div class=\"undefined col-12 col-md-12 col-12\"><!-- wp:heading -->
		<h2>Smokey X</h2>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p><strong><em>Volunteer's Best Friend</em></strong></p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>865-234-1235 | <a href=\"mailto:smokeyx@utk.edu\">smokeyx@utk.edu</a></p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>Etiam lacus nisl, congue vel vehicula ac, porta nec quam. Vestibulum a tempus neque, vitae posuere tellus. Sed imperdiet quam eu gravida commodo. In arcu sapien, imperdiet eu lobortis et, hendrerit vitae metus. Ut orci tellus, egestas sit amet euismod sit amet, mattis ac enim. Donec condimentum velit sit amet justo consectetur facilis.</p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:utkwds/column --></div>
		<!-- /wp:utkwds/columns --></div>
		<!-- /wp:group -->",
    )
	);

	register_block_pattern(
		'utkwds/page-pattern',
    array(
        'title'       => __( 'Starter Page', 'utkwds' ),
        'description' => _x( 'A sample page layout to get started.', 'Block pattern description', 'utkwds' ),
		'categories'  => array( 'buttons' ),
        'content'     => "<!-- wp:spacer {\"height\":\"50px\"} -->
		<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:utkwds/columns {\"rowClass\":\"column-50-50\",\"numCols\":2} -->
		<div class=\"row undefined\"><!-- wp:utkwds/column -->
		<div class=\"undefined col-12 col-md-3 undefined\"><!-- wp:image {\"id\":219,\"sizeSlug\":\"large\",\"linkDestination\":\"none\",\"className\":\"is-style-framed\"} -->
		<figure class=\"wp-block-image size-large is-style-framed\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-219\"/></figure>
		<!-- /wp:image -->
		
		<!-- wp:paragraph -->
		<p><strong>Duis Lacinia Nis</strong></p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p><em>Nunc pretium nibh ac quam finibus, rutrum tempor odio lacinia. Proin id orci in nisl molestie tincidunt non id ligula. Phasellus cursus scelerisque orci ut aliquet. Curabitur vel orci cursus, aliquam diam.</em></p>
		<!-- /wp:paragraph --></div>
		<!-- /wp:utkwds/column -->
		
		<!-- wp:utkwds/column {\"colWidth\":9} -->
		<div class=\"undefined col-12 col-md-9 undefined\"><!-- wp:heading -->
		<h2>Nam et Vestibulum</h2>
		<!-- /wp:heading -->
		
		<!-- wp:spacer {\"height\":\"25px\"} -->
		<div style=\"height:25px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:paragraph -->
		<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam finibus maximus massa vel lobortis. Pellentesque id sem aliquet, facilisis arcu nec, sagittis est. Aliquam quis eleifend urna. Donec hendrerit, purus eu elementum rhoncus, orci metus ultrices erat, congue viverra urna leo eget quam. Aenean diam leo, lobortis at euismod et, fermentum in metus. Nunc pretium nibh ac quam finibus, rutrum tempor odio lacinia. Proin id orci in nisl molestie tincidunt non id ligula. Phasellus cursus scelerisque orci ut aliquet. Curabitur vel orci cursus, aliquam diam et, sollicitudin mi. Praesent sit amet felis sed est feugiat euismod quis vulputate turpis. Suspendisse ut metus pharetra, luctus lacus a, ornare ante. In aliquet commodo diam, quis varius enim. Nulla posuere metus turpis, vel eleifend massa gravida sed.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:image {\"align\":\"right\",\"id\":224,\"width\":292,\"height\":292,\"sizeSlug\":\"large\",\"linkDestination\":\"none\",\"className\":\"d-inline-block float-end\"} -->
		<div class=\"wp-block-image d-inline-block float-end\"><figure class=\"alignright size-large is-resized\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-224\" width=\"292\" height=\"292\"/></figure></div>
		<!-- /wp:image -->
		
		<!-- wp:paragraph -->
		<p>Nunc aliquam varius commodo. Nam et vestibulum ante. Nunc in est tellus. Nam quis odio non sem faucibus faucibus vel in erat. Nulla risus mauris, vulputate nec commodo tempus, euismod vitae nunc. Vestibulum eget dapibus justo. Duis at lacinia nisl. Aenean fringilla venenatis tempor. Donec efficitur velit nec ante tincidunt accumsan sed in enim. Praesent auctor justo mattis augue tincidunt suscipit.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:paragraph -->
		<p>Suspendisse a mauris sed quam ultricies sodales nec id orci. Donec vitae auctor leo, et auctor enim. Donec vitae velit pretium, vulputate tellus eu, interdum felis. Curabitur nec mattis enim. Integer magna felis, placerat eu sollicitudin id, dignissim at nibh. Proin tempus accumsan lorem, a ornare velit vehicula tincidunt. Morbi vel lacus arcu. Nunc eu volutpat metus, in convallis nisi. Mauris pulvinar dolor at magna consequat, et auctor diam facilisis. Integer faucibus vulputate ante non semper. Duis in neque sit amet mi dictum imperdiet. Cras non consequat lorem, eget facilisis purus. Pellentesque vel massa ultrices, porta dolor ac, ornare lectus. Maecenas venenatis consequat arcu, eget dapibus ligula auctor at.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:group {\"className\":\"my-5\"} -->
		<div class=\"wp-block-group my-5\"><!-- wp:utkwds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-link\",\"color\":\"\",\"text\":\"\"},\"buttonText\":true} -->
		<div><a class=\"btn save mb-3 btn-link btn-nrml\"><span>Explore Area 01</span><span></span></a></div>
		<!-- /wp:utkwds/button -->
		
		<!-- wp:utkwds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-link\",\"color\":\"\",\"text\":\"\"},\"buttonText\":true} -->
		<div><a class=\"btn save mb-3 btn-link btn-nrml\"><span>Explore Area 02</span><span></span></a></div>
		<!-- /wp:utkwds/button -->
		
		<!-- wp:utkwds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-link\",\"color\":\"\",\"text\":\"\"},\"buttonText\":true} -->
		<div><a class=\"btn save mb-3 btn-link btn-nrml\"><span>Explore Area 03</span><span></span></a></div>
		<!-- /wp:utkwds/button --></div>
		<!-- /wp:group --></div>
		<!-- /wp:utkwds/column --></div>
		<!-- /wp:utkwds/columns -->
		
		<!-- wp:spacer {\"height\":\"50px\"} -->
		<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:utkwds/strip {\"imagePostion\":{\"name\":\"Smokey\",\"slug\":\"strip-smokey\",\"color\":\"#58595B\",\"text\":\"text-white\"},\"padding\":\"p-md\"} -->
		<div><div class=\"strip strip-smokey text-white p-md my-0\"><div class=\"container\"><!-- wp:utkwds/columns {\"rowClass\":\"column-50-50\",\"numCols\":2} -->
		<div class=\"row undefined\"><!-- wp:utkwds/column {\"colWidth\":8} -->
		<div class=\"undefined col-12 col-md-8 undefined\"><!-- wp:quote {\"className\":\"text-white\"} -->
		<blockquote class=\"wp-block-quote text-white\"><p>Maecenas et turpis metus. Integer ut volutpat augue. Vestibulum ante lectus, aliquet vel sem in, viverra ornare dui. Mauris id nisi tortor. Quisque risus ante, tristique non vulputate aliquet, rutrum non risus. Aliquam vulputate elementum diam, ut molestie ligula egestas sit amet.</p><cite>Aliquam Volutpat</cite></blockquote>
		<!-- /wp:quote --></div>
		<!-- /wp:utkwds/column -->
		
		<!-- wp:utkwds/column {\"colWidth\":4} -->
		<div class=\"undefined col-12 col-md-4 undefined\"><!-- wp:image {\"id\":219,\"sizeSlug\":\"large\",\"linkDestination\":\"none\"} -->
		<figure class=\"wp-block-image size-large\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-219\"/></figure>
		<!-- /wp:image --></div>
		<!-- /wp:utkwds/column --></div>
		<!-- /wp:utkwds/columns --></div></div></div>
		<!-- /wp:utkwds/strip -->
		
		<!-- wp:spacer -->
		<div style=\"height:100px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->
		
		<!-- wp:utkwds/columns {\"rowClass\":\"column-50-50\",\"numCols\":2} -->
		<div class=\"row undefined\"><!-- wp:utkwds/column {\"colWidth\":6} -->
		<div class=\"undefined col-12 col-md-6 undefined\"><!-- wp:heading -->
		<h2><p>Vulputate Aliquet</p></h2>
		<!-- /wp:heading -->
		
		<!-- wp:paragraph -->
		<p>Aliquam erat volutpat. Morbi et dictum elit, sed sagittis urna. Nam quis tempor justo, quis tempor augue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Quisque elit tortor, aliquam sed nisi ac, semper laoreet nulla. Nullam in finibus urna. Sed gravida sapien dapibus tortor facilisis pretium. Aenean accumsan arcu a enim semper, quis porta ligula tincidunt. In hac habitasse platea dictumst. Cras tempor velit eget massa convallis, bibendum aliquam felis cursus.</p>
		<!-- /wp:paragraph -->
		
		<!-- wp:utkwds/button {\"buttonColor\":{\"name\":\"Link\",\"slug\":\"btn-link\",\"color\":\"\",\"text\":\"\"},\"buttonText\":true} -->
		<div><a class=\"btn save mb-3 btn-link btn-nrml\"><span>Explore Vulputate</span><span></span></a></div>
		<!-- /wp:utkwds/button --></div>
		<!-- /wp:utkwds/column -->
		
		<!-- wp:utkwds/column {\"colWidth\":6} -->
		<div class=\"undefined col-12 col-md-6 undefined\"><!-- wp:gallery {\"columns\":2,\"linkTo\":\"none\",\"sizeSlug\":\"medium\"} -->
		<figure class=\"wp-block-gallery has-nested-images columns-2 is-cropped\"><!-- wp:image {\"id\":238,\"sizeSlug\":\"medium\",\"linkDestination\":\"none\"} -->
		<figure class=\"wp-block-image size-medium\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-02.png\" alt=\"\" class=\"wp-image-238\"/></figure>
		<!-- /wp:image -->
		
		<!-- wp:image {\"id\":239,\"sizeSlug\":\"medium\",\"linkDestination\":\"none\"} -->
		<figure class=\"wp-block-image size-medium\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-03.png\" alt=\"\" class=\"wp-image-239\"/></figure>
		<!-- /wp:image -->
		
		<!-- wp:image {\"id\":240,\"sizeSlug\":\"medium\",\"linkDestination\":\"none\"} -->
		<figure class=\"wp-block-image size-medium\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder-04.png\" alt=\"\" class=\"wp-image-240\"/></figure>
		<!-- /wp:image -->
		
		<!-- wp:image {\"id\":241,\"sizeSlug\":\"medium\",\"linkDestination\":\"none\"} -->
		<figure class=\"wp-block-image size-medium\"><img src=\"".plugin_dir_url( __FILE__ )."src/img/5x7-placeholder.png\" alt=\"\" class=\"wp-image-241\"/></figure>
		<!-- /wp:image --><figcaption class=\"blocks-gallery-caption\">Duis in neque sit amet mi dictum</figcaption></figure>
		<!-- /wp:gallery --></div>
		<!-- /wp:utkwds/column --></div>
		<!-- /wp:utkwds/columns -->
		
		<!-- wp:spacer {\"height\":\"50px\"} -->
		<div style=\"height:50px\" aria-hidden=\"true\" class=\"wp-block-spacer\"></div>
		<!-- /wp:spacer -->",
		)
		);
  }
   
  add_action( 'init', 'utkwds_register_patterns' );