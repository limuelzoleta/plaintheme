<?php
/**
 * The header for our theme.
 *
 * Displays all of the <head> section and everything up till <div id="content">
 *
 * @package understrap
 */

$container = get_theme_mod( 'understrap_container_type' );
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-capable" content="yes">
	<meta name="apple-mobile-web-app-title" content="<?php bloginfo( 'name' ); ?> - <?php bloginfo( 'description' ); ?>">
	<link rel="profile" href="http://gmpg.org/xfn/11">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">
	<?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

<div class="hfeed site" id="page">
	<div class="loader">
        <p class="loading-text">Loading<span>.</span><span>.</span><span>.</span></p>
    </div>

	<!-- ******************* The Navbar Area ******************* -->
	<header class="main-header header">


		<nav class="navbar navbar-toggleable-md navbar-light bg-light pt-main-nav fixed-top" role="navigation" 
		style="<?php echo is_admin_bar_showing() == 1 ? 'top: 32px;' : ''; ?>">
			<div class="container">

			<button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsDefault" aria-controls="navbarsDefault" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

					<!-- Your site title as branding in the menu -->
					<?php if ( ! has_custom_logo() ) { ?>

						<?php if ( is_front_page() && is_home() ) : ?>

							<a class="navbar-brand site-logo" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>">
								<?php bloginfo( 'name' ); ?>
							</a>
							
						<?php else : ?>

							<a class="navbar-brand site-logo" rel="home" href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>"><?php bloginfo( 'name' ); ?></a>
						
						<?php endif; ?>
					
					<?php } else {
						the_custom_logo();
					} ?><!-- end custom logo -->

				<div class="collapse navbar-collapse cnav" id="navbarsDefault">
					<!-- The WordPress Menu goes here -->
					<?php wp_nav_menu(
						array(
							'theme_location'  => 'primary',
							'container_class' => 'mr-auto',
							'menu_class'      => 'navbar-nav',
							'fallback_cb'     => '',
							'menu_id'         => 'main-menu',
							'walker'          => new WP_Bootstrap_Navwalker(),
						)
					); ?>

					<form class="form-inline my-12 my-lg-0" method="get" action="<?php echo esc_url( home_url( '/' ) ); ?>" role="search">
						<label for="s" class="sr-only"></label>
						<input class="form-control my-sm-12 mr-sm-2" name="s" id="s" type="text" placeholder="Search">
						<button class="btn btn-outline-secondary my-2 my-sm-0" id="searchsubmit" name="submit" type="submit" >Search</button>
					</form>
				</div>
			</div><!-- .container -->

		</nav><!-- .site-navigation -->

	</header><!-- .wrapper-navbar end -->
    <div class="s-wrapper">
        <div class="scroll-to-top">
            <div class="scroll-top-icon">
                <i class="fa  fa-angle-up"></i>
            </div>
        </div>
    </div>