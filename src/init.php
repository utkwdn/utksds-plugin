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

//this creates the utdesign system category for the new blocks
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
 * Enqueue Gutenberg block assets for both frontend + backend.
 *
 * Assets enqueued:
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 *
 * @uses {wp-blocks} for block type registration & related functions.
 * @uses {wp-element} for WP Element abstraction — structure of blocks.
 * @uses {wp-i18n} to internationalize the block's text.
 * @uses {wp-editor} for WP editor styles.
 * @since 1.0.0
 */
function utds_cgb_block_assets() { // phpcs:ignore
	// Register block styles for both frontend + backend.
	wp_register_style(
		'utds-cgb-style-css', // Handle.
		plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
		is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	);

	// Register block editor script for backend.
	wp_register_script(
		'utds-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor' ), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// Register block editor styles for backend.
	wp_register_style(
		'utds-cgb-block-editor-css', // Handle.
		plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
		array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
		null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'utds-cgb-block-js',
		'cgbGlobal', // Array containing dynamic data for a JS Global.
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
			// Add more data here that you want to access from `cgbGlobal` object.
		]
	);

	/**
	 * Register Gutenberg block on server-side.
	 *
	 * Register the block on server-side to ensure that the block
	 * scripts and styles for both frontend and backend are
	 * enqueued when the editor loads.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/blocks/writing-your-first-block-type#enqueuing-block-scripts
	 * @since 1.16.0
	 */
	register_block_type(
		'cgb/block-utds', array(
			// Enqueue blocks.style.build.css on both frontend & backend.
			'style'         => 'utds-cgb-style-css',
			// Enqueue blocks.build.js in the editor only.
			'editor_script' => 'utds-cgb-block-js',
			// Enqueue blocks.editor.build.css in the editor only.
			'editor_style'  => 'utds-cgb-block-editor-css',
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'utds_cgb_block_assets' );

/**
 * Deregister the gutenberg styles
 */
add_action( 'wp_print_styles', 'wps_deregister_styles', 100 );
function wps_deregister_styles() {
    wp_dequeue_style( 'wp-block-library' );
}
//Add secondary color control to Customizer
function ukds_customizecolor_register( $wp_customize ) {
		class UTK_Customize_Secondary_Color_Control extends WP_Customize_Control {

		public $type = 'utk_secondary_color';

		public function render_content() {
		?>
			<label>
				<?php if ( ! empty( $this->label ) ){ ?>
					<span class="customize-control-title"><?php echo esc_html( $this->label ); ?></span>
				<?php }
				if ( ! empty( $this->description ) ){ ?>
					<span class="description customize-control-description"><?php echo esc_html( $this->description ); ?></span>
				<?php } 
				if ( ! empty( $this->value('secondary_color') ) ){ ?>
					<span class="description customize-control-description">Chosen: <?php echo esc_html( $this->value('secondary_color') ); ?></span>
				<?php } ?>
				<div class="secondary-color-group">
				<?php foreach ( $this->choices as $color_attributes ) : ?>
					<input name="secondary_color_<?php echo esc_attr( $this->id ); ?>" id="secondary_color_<?php echo esc_attr( $this->id ); ?>_<?php echo esc_attr( $color_attributes['name'] ); ?>" type="radio" value="<?php echo esc_attr( json_encode($color_attributes) ); ?>" <?php $this->link('secondary_color'); checked( $this->value('secondary_color'), json_encode($color_attributes) ); ?> >
						<label for="secondary_color_<?php echo esc_attr( $this->id ); ?>_<?php echo esc_attr( $color_attributes['name'] ); ?>" class="color-option">
							<span><?php echo esc_attr( $color_attributes['name'] ); ?></span>
							<div class="color_sample <?php echo esc_attr($color_attributes['text']); ?>" style="background-color: <?php echo esc_attr( $color_attributes['color'] ); ?>">Sample Text.</div>
						</label>
					</input>
				<?php endforeach; ?>
				</div>
			</label>
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
	function utksds_secondary_color_script(){
		wp_register_script( 'sc-handle-header', '' );
		wp_enqueue_script( 'sc-handle-header' );
		wp_add_inline_script( 'sc-handle-header', 'const secondaryColor = ' . get_theme_mod('site_secondary_color') );
	}
	add_action( 'enqueue_block_editor_assets', 'utksds_secondary_color_script', 100 );
}


function utksds_current_screen(){
		
	$current_screen = get_current_screen();
		
	wp_register_script( 'screen-handle-header', '' );
	wp_enqueue_script( 'screen-handle-header' );
		
	//$js_code = 'console.log(' . json_encode($current_screen, JSON_HEX_TAG) . ')';
	//wp_add_inline_script( 'screen-handle-header', $js_code );
		
	wp_add_inline_script( 'screen-handle-header', 'const currentScreen = ' . json_encode($current_screen, JSON_HEX_TAG) );
}
add_action( 'enqueue_block_editor_assets', 'utksds_current_screen', 100 );

//$post_editor_context = new WP_Block_Editor_Context( array( 'post' => get_post() ) );

//$js_code = '<script>console.log(' . json_encode($post_editor_context, JSON_HEX_TAG) . ')</script>';
//echo $js_code;