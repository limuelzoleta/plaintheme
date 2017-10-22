<?php 

/**
 * This function gets the page template and 
 * @return String page template's location and file name
 * @param String $post_id, the post ID
 */
function pt_get_page_tempate($post_id){
    return get_post_meta($post_id, '_wp_page_template', true);
}



