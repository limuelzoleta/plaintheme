<?php
/**
 * The template for displaying comments.
 *
 * The area of the page that contains both current comments
 * and the comment form.
 *
 * @package understrap
 */

/*
 * If the current post is protected by a password and
 * the visitor has not yet entered the password we will
 * return early without loading the comments.
 */
if ( post_password_required() ) {
	return;
}
?>

<div class="comments-area comments-block" id="comments">

	<?php // You can start editing here -- including this comment! ?>

	<?php if ( have_comments() ) : ?>

		

		<?php comment_form(); // Render comments form. ?>
		
		<hr>

		<div class="comments">
			<h3 class="comments-title">
				
				<?php
					$comments_number = get_comments_number();
					if ( 1 === $comments_number ) {
						printf(
							/* translators: %s: post title */
							esc_html_x( 'One thought on &ldquo;%s&rdquo;', 'comments title', 'plaintheme' ),
							'<span>' . get_the_title() . '</span>'
						);
					} else {
						printf( // WPCS: XSS OK.
							/* translators: 1: number of comments, 2: post title */
							esc_html( _nx(
								'%1$s thought on &ldquo;%2$s&rdquo;',
								'%1$s thoughts on &ldquo;%2$s&rdquo;',
								$comments_number,
								'comments title',
								'plaintheme'
							) ),
							number_format_i18n( $comments_number ),
							'<span>' . get_the_title() . '</span>'
						);
					}
				?>

			</h3><!-- .comments-title -->
			<ol class="comment-list">
				<?php foreach( $comments as $comment ) : ?>
					<li class="comment">
						<div class="comment-wrap clearfix">
							<div class="comment-meta">
								<div class="comment-author-img">
									<?php echo get_avatar( $comment, 60 ); ?>
								</div>
							</div>
							<div class="comment-content">
								<div class="author">
									<?php comment_author(); ?>
									<span> <?php comment_date(); ?> </span>
								</div>
									<p> <?php comment_text(); ?> </p>
									
								
							</div>
						</div>
					</li>
				<?php endforeach; ?>
			</ol><!-- .comment-list -->
		</div>

	<?php endif; // endif have_comments(). ?>

</div><!-- #comments -->
