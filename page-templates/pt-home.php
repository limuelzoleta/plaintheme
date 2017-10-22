<?php
/**
 * Template Name: Home Page Template
 *
 * Template for Plain Theme's Home Page Template
 *
 * @package understrap
 */

get_header(); 
?>

<?php 
$pt_hero_data  = get_post_meta( $post->ID, 'pt_hero_data', true );
$pt_hero_image = wp_get_attachment_image_src($pt_hero_data['hero_image'], 'full');
// print_r()
?>
<section class="feature-hero" style="background: url(<?php echo $pt_hero_image[0]; ?>) center 0 no-repeat fixed; background-size: cover; " data-type="background" data-speed="5">
<div class="fill-bg-dark"></div>
<div class="hero-content container">
    <div class="row">
        <div class="col-md-8 mx-auto">
            <h2 class="hero-title"><?php echo $pt_hero_data['hero_title']; ?></h2>
            <p class="hero-sub-title"><?php echo nl2br($pt_hero_data['hero_content']); ?></p>

            <a href="<?php echo $pt_hero_data['hero_btn_link']; ?>" target="__blank" class="btn btn-lg btn-outline-secondary hero-link">    
                <?php echo $pt_hero_data['hero_btn_text']; ?>
            </a>
        </div>
    </div>
</div>
</section>



<!-- Blog Posts -->
<?php 
$posts = new WP_Query(array(
    'post_type'      => 'post',
    'posts_per_page' => 8
));
?>
<section class="blog pt-4-col">
    <div class="container">
        <h3>Blog</h3>
        <div class="blog-items grid">
        
        <?php while( $posts->have_posts() ) : $posts->the_post(); ?>
            <div <?php post_class('grid-item'); ?> id="post-<?php the_ID(); ?>">
                <article class="post-item ">
                    <?php if(has_post_thumbnail() ): ?>
                        <!-- <img src="assets/images/blog-post-filler.jpg" /> -->
                        <?php the_post_thumbnail( 'thumbnail' ); ?>
                    <?php endif; ?>
                    <h4><?php the_title(); ?></h4>
                    <?php the_excerpt(); ?>
                </article><!--post-item-->
            </div>
        <?php endwhile; ?>
        <?php wp_reset_postdata(); ?>

        </div><!--blog-items-->
        <div class="clearfix"></div>
    </div>
</section>


<!-- Subscribe -->
<?php $pt_subs_data  = get_post_meta( $post->ID, 'pt_subs_data', true ); ?>
<section class="subscribe">
    <div class="container">
        <div class="row">
            <div class="col-md-6 s-text-section">
                <h4><?php echo $pt_subs_data['subs_title']; ?></h4>
                <p><?php echo nl2br($pt_subs_data['subs_content']); ?></p>
            </div>
            <div class="col-md-6 s-form-section">
                <form  method="POST" action="<?php echo esc_url( home_url( '/' ) );?>" >
                    <div class="form-group">
                        <label for="s_email" class="sr-only">Your Email</label>
                        <input type="text" class="form-control-lg" placeholder="Your Email" id="s_email" name="s_email"/> 
                    </div>
                    <input type="submit" class="btn btn-lg btn-block btn-warning s_submit_btn" name="subs_submit" id="subs_submit" value="subscribe" />
                </form>
            </div>
        </div>
    </div>
</section>



<?php $pt_about_data  = get_post_meta( $post->ID, 'pt_about_data', true ); ?>
<!-- About -->
<section class="about">
    <div class="container">
        <h3 class="has-bbottom">About Us</h3>
        <p><?php echo nl2br( $pt_about_data['content'] ); ?></p>

    </div>
</section>

<?php
get_footer();
