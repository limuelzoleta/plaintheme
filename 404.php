<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package understrap
 */

get_header();
?>
<section class="page-head" data-type="background" data-speed="5">
	<h2 class="page-title"><?php esc_html_e( 'Oops! That page can&rsquo;t be found.',
							'plaintheme' ); ?></h2>
</section>
<div class="wrapper page-content" id="404-wrapper">

	<div class="container" id="content" tabindex="-1">

		<div class="row">
			<div class="col-md-12 mx-auto widgets" style="background-color: #ffffff; padding: 15px; margin: 50px 0;">
				<?php get_sidebar( 'right' ); ?>
			</div>
		</div><!-- .row -->

	</div><!-- Container end -->

</div><!-- Wrapper end -->

<?php get_footer(); ?>
