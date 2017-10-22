<?php
/**
 * Single post partial template.
 *
 * @package understrap
 */

?>
<article <?php post_class('post-item'); ?> id="post-<?php the_ID(); ?>">
<?php if( has_post_thumbnail() ){
		the_post_thumbnail( 'full' );
	} ?>

	


	<div class="post-content">
		<?php the_content(); ?>

		<?php wp_link_pages( array(
				'before' => '<div class="page-links">' . __( 'Pages:', 'plaintheme' ),
				'after'  => '</div>',
			) );
		?>
	</div>


	<div class="post-details">
		<div class="author-image">
			<?php 
				$author_email = get_the_author_email(); 
				$author_link = get_the_author_link();
			?>
			<?php echo get_avatar( $author_email ); ?>
		</div>
		<div class="tdetails">
			<div class="author-name">Published by <a href="<?php echo esc_url( get_author_posts_url( get_the_author_meta( 'ID' ) ) ); ?>">
				<?php  echo esc_html( get_the_author() ) ?></a>
			</div>
			<div class="date">
				<i class="fa fa-clock-o"></i> <?php echo esc_attr( get_the_date()); ?> 
			</div>
			<?php if( has_tag() ) : ?>
			<div class="tags">
				<div class="title"><i class="fa fa-tag"></i> <?php the_tags( null, '' ); ?></div>
			</div>
			<?php endif; ?>
		</div>
	</div>


	

</article><!-- #post-## -->
