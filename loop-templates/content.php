<?php
/**
 * Post rendering content according to caller of get_template_part.
 *
 * @package understrap
 */

?>

<article <?php post_class( 'post-item' ); ?> id="post-<?php the_ID(); ?>">

	<?php if( has_post_thumbnail() ) {
		the_post_thumbnail( 'full' );
	} ?>
	<div class="post-links clearfix">
		<div class="category pull-left">
			<?php 
				$category = the_category( ' / ', '' ); 
				$cat_link = get_category_link( $category );
			?>
			<?php echo $category['name']; ?>
		</div>
		<!-- <div class="share-links pull-right">
			<a href="#"><i class="fa fa-facebook-square pt-fb"></i></a>
			<a href="#"><i class="fa  fa-twitter-square pt-twitter"></i></a>
			<a href="#"><i class="fa  fa-google-plus-square pt-googlep"></i></a>
			<a href="#"><i class="fa fa-linkedin-square pt-linkedin"></i></a>
		</div> -->
	</div>
	<div class="post-content">
		<h3 class="post-title"><?php the_title(); ?></h3>
		<?php the_excerpt(); ?>
	</div>


</article><!-- #post-## -->
