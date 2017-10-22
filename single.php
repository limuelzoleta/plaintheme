<?php
/**
 * The template for displaying all single posts.
 *
 * @package understrap
 */

get_header();
$container   = get_theme_mod( 'understrap_container_type' );
$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
?>
<?php while( have_posts() ): the_post(); ?>
<div class="wrapper" id="single-wrapper">
	<section class="page-head">
		<div class="container">
			<h2 class="page-title"><?php the_title(); ?></h2>
		</div>
	</section>
	
	<section class="page-content">
		<div class="container">
			<div class="row">
				<div class="col-lg-9 col-md-12 posts-container">
					

						<?php get_template_part( 'loop-templates/content', 'single' ); ?>
						


						<?php understrap_post_nav(); ?>
					<?php endwhile; ?>
				</div>
				<div class="col-lg-3 col-md-12 widgets">
					<?php get_sidebar( 'right' ); ?>
				</div>
			</div>
		</div>
	</section>

</div><!-- Wrapper end -->

<?php get_footer(); ?>
