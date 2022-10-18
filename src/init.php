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

//This creates the utdesign system category for the new blocks. It should probably be split out into its own include file.
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

if(class_exists('WP_Block_Editor_Context')){
	add_filter('block_categories_all', 'utdesign_blocks_category', 10, 2);
}else{
	add_filter('block_categories', 'utdesign_blocks_category', 10, 2);
}


/**
 * Deregister the gutenberg styles. This could probably be moved into plugin.php
 */
add_action( 'wp_print_styles', 'wps_deregister_styles', 100 );
function wps_deregister_styles() {
    wp_dequeue_style( 'wp-block-library' );
}

//Adds a secondary color control to Customizer. All the secondary color code should probably be split out into its own include file.
function ukds_customizecolor_register( $wp_customize ) {
		class UTK_Customize_Secondary_Color_Control extends WP_Customize_Control {

		public $type = 'utk_secondary_color';

		public function render_content() {
		?>
		<ul>
      	<li class="customize-section-description-container section-meta">
				<?php if ( ! empty( $this->label ) ){ ?>
					<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>

				<?php }
				if ( ! empty( $this->description ) ){ ?>
					<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>

				<?php }
				if ( ! empty( $this->value('secondary_color') ) ){ ?>
					<!-- <span class="description customize-control-description">Chosen: <?php echo esc_html( $this->value('secondary_color') ); ?></span> -->
				<?php } ?>
			</li>
				<li class="customize-control customize-control-radio">
				<?php foreach ( $this->choices as $color_attributes ) : ?>
					<span class="customize-inside-control-row">
					<input name="secondary_color_<?php echo esc_attr( $this->id ); ?>" id="secondary_color_<?php echo esc_attr( $this->id ); ?>_<?php echo esc_attr( $color_attributes['name'] ); ?>" type="radio" value="<?php echo esc_attr( json_encode($color_attributes) ); ?>" <?php $this->link('secondary_color'); checked( $this->value('secondary_color'), json_encode($color_attributes) ); ?> >
						<label for="secondary_color_<?php echo esc_attr( $this->id ); ?>_<?php echo esc_attr( $color_attributes['name'] ); ?>">

							<div class="color_sample <?php echo esc_attr($color_attributes['text']); ?>" style="background-color: <?php echo esc_attr( $color_attributes['color'] ); ?>; width: 1rem; height: 1rem;display: inline-block;margin-bottom: -0.2rem;"></div>

              <?php echo esc_attr( $color_attributes['name'] ); ?>
						</label>
					</input>
				</span>
				<?php endforeach; ?>
			</li>
		<?php }

	}

	$wp_customize->add_setting('site_secondary_color', array());

	include 'colors.php';

	$wp_customize->add_control(new UTK_Customize_Secondary_Color_Control(
    	$wp_customize,
    	'utk_secondary_color',
    	array(
        	'label' => __('Secondary Color Options'),
        	'section' => 'utkds-color-settings',
        	'settings' => [
            	'secondary_color' => 'site_secondary_color',
        	],
        	// specify the kind of input field
        	'choices' => $colors,
        	'description' => __('Choose a secondary color to appear throughout your site.'),
        	'priority' => 80
    	)
	));

	$wp_customize->add_section('utkds-color-settings' , array(
      'title' => __('Secondary Color','utthehill'),
      'description' => __('<p>This is the secondary color information used throughout the Gutenberg editor.</p>','utthehill'),
   ));
}

add_action( 'customize_register', 'ukds_customizecolor_register' );

//Make Customizer secondary color value avaliable in Gutenberg
if( get_theme_mod('site_secondary_color') ){
	function utkwds_secondary_color_script(){
		wp_register_script( 'sc-handle-header', '' );
		wp_enqueue_script( 'sc-handle-header' );
		wp_add_inline_script( 'sc-handle-header', 'const secondaryColor = ' . get_theme_mod('site_secondary_color') );
	}
	add_action( 'enqueue_block_editor_assets', 'utkwds_secondary_color_script', 100 );
}

//This adds a javascript constant called currentScreen to the editors that returns which editor is currently in use, such as the page editor or the widget editor.
//This should probably be split out into its own include file.
function utkwds_current_screen(){

	$current_screen = get_current_screen();

	wp_register_script( 'screen-handle-header', '' );
	wp_enqueue_script( 'screen-handle-header' );

	//$js_code = 'console.log(' . json_encode($current_screen, JSON_HEX_TAG) . ')';
	//wp_add_inline_script( 'screen-handle-header', $js_code );

	wp_add_inline_script( 'screen-handle-header', 'const currentScreen = ' . json_encode($current_screen, JSON_HEX_TAG) );
}
add_action( 'enqueue_block_editor_assets', 'utkwds_current_screen', 100 );

//$post_editor_context = new WP_Block_Editor_Context( array( 'post' => get_post() ) );

//$js_code = '<script>console.log(' . json_encode($post_editor_context, JSON_HEX_TAG) . ')</script>';
//echo $js_code;

add_filter( 'allowed_block_types_all', 'misha_blacklist_blocks' );
 
function misha_blacklist_blocks( $allowed_blocks ) {
	// get all the registered blocks
	$blocks = WP_Block_Type_Registry::get_instance()->get_all_registered();

	// then disable some of them
	unset( $blocks[ 'core/verse' ] );
	unset( $blocks[ 'core/calendar' ] );
	//unset( $blocks[ 'core/cover' ] );
	unset( $blocks[ 'core/preformatted' ] );
	unset( $blocks[ 'core/pullquote' ] );
	unset( $blocks[ 'core/separator' ] );
	unset( $blocks[ 'core/tag-cloud' ] );
	unset( $blocks[ 'core/search' ] );
	//unset( $blocks[ 'core/columns' ] );
	//unset( $blocks[ 'core/column' ] );
	//unset( $blocks[ 'core/navigation' ] );
	//unset( $blocks[ 'core/site-logo' ] );
	//unset( $blocks[ 'core/site-title' ] );
	//unset( $blocks[ 'core/site-tagline' ] );
	unset( $blocks[ 'core/avatar' ] );
	//unset( $blocks[ 'core/post-title' ] );
	//unset( $blocks[ 'core/post-excerpt' ] );
	unset( $blocks[ 'core/comments-query-loop' ] );
	unset( $blocks[ 'core/post-comments-form' ] );
	//unset( $blocks[ 'core/loginout' ] );
	//unset( $blocks[ 'core/term-description' ] );
	//unset( $blocks[ 'core/media-text' ] );

	// return the new list of allowed blocks
	return array_keys( $blocks );
	
}