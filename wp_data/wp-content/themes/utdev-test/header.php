<?php
/**
 * The header for our theme
 *
 * This is the template that displays all of the <head> section and everything up until <div id="content">
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package test
 */

?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="profile" href="https://gmpg.org/xfn/11">

	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#primary"><?php esc_html_e( 'Skip to content', 'utdev-test' ); ?></a>

	<header id="masthead" class="site-header">
		<nav class="navbar navbar-dark bg-dark">
			<a class="navbar-brand text-uppercase font-weight-bolder text-decoration-none text-small" href="https://www.utk.edu/">
			<svg version="1.1" id="utk-powert" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
				viewBox="0 0 20.74 20.74" style="enable-background:new 0 0 20.74 20.74;height: 1.75rem; width: 1.75rem;margin-top: -0.25rem;" xml:space="preserve">
				<style type="text/css">
					.st0{fill:#FF8200;}
					.st1{fill:#FFFFFF;}
				</style>
				<polygon class="st0" points="20.74,20.74 20.74,0 0,0 0,20.74 20.74,20.74 "/>
				<path class="st1" d="M18.12,2.62v5.23h-1.94c0-0.96-0.95-1.74-2.13-1.74c-0.86,0-1.6,0.42-1.94,1.02v6.54
					c0,1.39,1.08,2.52,2.42,2.52h0.01v1.94H6.2v-1.94h0.01c1.34,0,2.42-1.13,2.42-2.52V7.12C8.29,6.52,7.55,6.1,6.69,6.1
					c-1.18,0-2.13,0.78-2.13,1.74H2.62V2.62H18.12L18.12,2.62z"/>
			</svg>

			<span class="d-none d-md-inline">University of Tennessee, Knoxville</span></a>
			
			<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#searchHeader" aria-controls="searchHeader" aria-expanded="false" aria-label="Toggle search">
				<span class="navbar-toggler-icon"></span>
			</button>
		</nav>

		<nav id="site-navigation" class="main-navigation">
			<button class="menu-toggle" aria-controls="primary-menu" aria-expanded="false"><?php esc_html_e( 'Primary Menu', 'utdev-test' ); ?></button>
			<?php
			wp_nav_menu(
				array(
					'theme_location' => 'menu-1',
					'menu_id'        => 'primary-menu',
				)
			);
			?>
		</nav><!-- #site-navigation -->
	</header><!-- #masthead -->
