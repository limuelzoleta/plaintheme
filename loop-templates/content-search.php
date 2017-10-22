<?php
/**
 * Search results partial template.
 *
 * @package understrap
 */

?>
<article <?php post_class( 'post-item' ); ?> id="post-<?php the_ID(); ?>">

	<?php if( has_post_thumbnail() ) {
		the_post_thumbnail( 'full' );
	} ?>
	
	<div class="post-content">
		<h3 class="post-title"><?php the_title(); ?></h3>
		<?php the_excerpt(); ?>
	</div>


</article><!-- #post-## -->
