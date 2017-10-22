<?php
/**
 * The template for displaying all pages.
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package understrap
 */


get_header();
$container   = get_theme_mod( 'understrap_container_type' );
$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
?>
<?php while( have_posts() ): the_post(); ?>

	<section class="page-head">
		<h2 class="page-title"><?php the_title(); ?></h2>
	</section>
	
	<section class="page-content">
		<div class="container">
			<div class="row">
				<div class="col-lg-9 col-md-12 posts-container">
					

						<?php get_template_part( 'loop-templates/content', 'page' ); ?>
						
						<?php
						// If comments are open or we have at least one comment, load up the comment template.
						if ( comments_open() || get_comments_number() ) :
							comments_template();
						endif;
						?>

					<?php endwhile; ?>
				</div>
				<div class="col-lg-3 col-md-12 widgets">
					<?php get_sidebar( 'right' ); ?>
				</div>
			</div>
		</div>
	</section>


<?php get_footer(); ?>





















