<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package understrap
 */

$the_theme = wp_get_theme();
$container = get_theme_mod( 'understrap_container_type' );
?>





<section class="footer-widgets">
        <div class="container">


            <?php get_sidebar( 'footerfull' ); ?>
        </div>
        
    </section>



    <footer>
        <div class="copyright">
            All Rights Reserved &copy; 2017 
        </div>
    </footer>
</div>


</body>
</html>

<?php wp_footer(); ?>

</body>

</html>

