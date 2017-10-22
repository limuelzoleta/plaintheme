<?php
/**
 * Template Name: Full Width Page
 *
 * Template for displaying a page without sidebar even if a sidebar widget is published.
 *
 * @package understrap
 */

get_header();
$container   = get_theme_mod( 'understrap_container_type' );
?>
<?php while( have_posts() ): the_post(); ?>

	<section class="page-head">
		<h2 class="page-title"><?php the_title(); ?></h2>
	</section>
	
	<section class="page-content">
		<div class="container">
			<div class="row">
				<div class="col-md-12 posts-container">
					

						<?php get_template_part( 'loop-templates/content', 'page' ); ?>
						
						<?php
						// If comments are open or we have at least one comment, load up the comment template.
						if ( comments_open() || get_comments_number() ) :
							comments_template();
						endif;
						?>

					<?php endwhile; ?>
				</div>
			</div>
		</div>
	</section>


<?php get_footer(); ?>



