<?php
/**
 * The template for displaying search results pages.
 *
 * @package understrap
 */

get_header();

$container   = get_theme_mod( 'understrap_container_type' );
$sidebar_pos = get_theme_mod( 'understrap_sidebar_position' );
?>
<section class="page-head" data-type="background" data-speed="5">
	<h2 class="page-title"><?php echo __('Results About: ', 'plaintheme') . $_GET['s']; ?></h2>
</section>
<div class="wrapper page-content" id="search-wrapper">

	<div class="container" id="content" tabindex="-1">

		<div class="row">

			<main class="site-main col-lg-9 col-md-12 posts-container  <?php echo have_posts() ? '':'mx-auto'; ?>" id="main">

				<?php if ( have_posts() ) : ?>

					<?php /* Start the Loop */ ?>
					<?php while ( have_posts() ) : the_post(); ?>

						<?php
						/**
						 * Run the loop for the search to output the results.
						 * If you want to overload this in a child theme then include a file
						 * called content-search.php and that will be used instead.
						 */
						get_template_part( 'loop-templates/content', 'search' );
						?>

					<?php endwhile; ?>

				<?php else : ?>

					<?php get_template_part( 'loop-templates/content', 'none' ); ?>

				<?php endif; ?>

				<!-- The pagination component -->
			<?php understrap_pagination(); ?>

			</main><!-- #main -->

			
		<!-- Do the right sidebar check -->
		<?php if ( 'right' === $sidebar_pos || 'both' === $sidebar_pos ) : ?>

			<?php 
				if ( have_posts() ) { ?>
					<div class="col-lg-3 col-md-12 widgets">
					<?php get_sidebar( 'right' ); ?>
					</div>
			<?php } ?>

		<?php endif; ?>

	</div><!-- .row -->

</div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
