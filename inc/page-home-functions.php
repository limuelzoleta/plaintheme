<?php
/**
 * Load Plain Theme's Custom Functions
 */
include_once get_template_directory() . '/inc/pt-main-functions.php';

/**
 * Sets up multitple functionality if using current page template
 */
$post_id = $_GET['post'] ? $_GET['post'] : $_POST['post_ID'] ;
$template_file = pt_get_page_tempate($post_id);

if ($template_file === 'page-templates/pt-home.php') {
    /**
     * Load Custom Styles (Bootstrap 4) and Scripts
     */
    function pt_admin_enqueue(){
        wp_register_style('pt_custom_editor', get_template_directory_uri() . '/css/custom-editor-style.css' );
        wp_enqueue_style('pt_custom_editor');

        wp_register_script('pt_admin_js', get_template_directory_uri() . '/js/admin/pt-theme-admin.min.js', array('jquery'), '1.0.0', true);
        wp_enqueue_script('pt_admin_js');
    }
    add_action( 'admin_enqueue_scripts', 'pt_admin_enqueue' );

    /**
     * Removes Default Feature Image Metabox
     */
    function remove_thumbnail_box() {
        remove_meta_box( 'postimagediv','page','side' );
    }
    add_action('do_meta_boxes', 'remove_thumbnail_box');




    function save_pt_hero_meta( $post_id, $post, $update ){
        if( !$update ){
            return;
        }
        $pt_hero_data = array();
        $pt_hero_data['hero_title']         = sanitize_text_field( $_POST['pt_hero_title'] );
        $pt_hero_data['hero_content']       = sanitize_textarea_field( $_POST['pt_hero_content'] );
        $pt_hero_data['hero_btn_text']      = sanitize_text_field( $_POST['pt_hero_btn_text'] );
        $pt_hero_data['hero_btn_link']      = sanitize_text_field( $_POST['pt_hero_btn_link'] );
        $pt_hero_data['hero_image']         = sanitize_text_field( $_POST['pt_hero_image'] );


        update_post_meta( $post_id, 'pt_hero_data', $pt_hero_data );


        $pt_subs_data = array();
        $pt_subs_data['subs_title']         = sanitize_text_field( $_POST['pt_subs_title'] );
        $pt_subs_data['subs_content']       = sanitize_textarea_field( $_POST['pt_subs_content'] );

        update_post_meta( $post_id, 'pt_subs_data', $pt_subs_data );


        $pt_about_data = array();
        $pt_about_data['content']           = sanitize_textarea_field( $_POST['pt_about_content'] );

        update_post_meta( $post_id, 'pt_about_data', $pt_about_data );

    }
    add_action( 'save_post', 'save_pt_hero_meta', 10, 3 );
}


/**
 * Custom Metaboxes 
 */
function pt_add_metabox(){
    global $post;
    if(!empty($post)){
        $pageTemplate = pt_get_page_tempate($post->ID);
        if($pageTemplate == 'page-templates/pt-home.php'){
            
            /** Add Hero Metabox */
            add_meta_box( 
                'pt_home_hero',
                __("Home's Hero Section", "plaintheme"),
                'pt_home_hero_meta_cb',
                'page',
                'normal',
                'default'
             );

            /** Add Subscribe Metabox */
            add_meta_box( 
                'pt_home_subscribe',
                __("Home's Subscribe Section", "plaintheme"),
                'pt_home_subs_meta_cb',
                'page',
                'normal',
                'default'
             );

            /** Add About Metabox */
            add_meta_box( 
                'pt_home_about',
                __("Home's About Section", "plaintheme"),
                'pt_home_about_meta_cb',
                'page',
                'normal',
                'default'
             );
        }
    }
}
add_action( 'add_meta_boxes', 'pt_add_metabox' );



/**
 * pt_home_hero metabox callback function
 * Generates Custom Fields
 */
function pt_home_hero_meta_cb($post){ 
    $pt_hero_data  = get_post_meta( $post->ID, 'pt_hero_data', true );
    $pt_hero_image = wp_get_attachment_image_src($pt_hero_data['hero_image'], 'full');
    ?>


    <div>
        <div class="form-group">
            <label for="pt_hero_title">Hero Section Title</label>
            <input type="text" 
                id="pt_hero_title" class="form-control" 
                name="pt_hero_title" placeholder="Hero Title"
                value="<?php echo $pt_hero_data['hero_title']; ?>" />
        </div>
        <div class="form-group">
            <label for="pt_hero_content">Hero Section Content</label>
            <textarea name="pt_hero_content" style="min-height: 80px;"
                    id="pt_hero_content" class="form-control" 
                    placeholder="Some contents here"><?php echo $pt_hero_data['hero_content']; ?></textarea>
        </div>
        <div class="row">
            <div class="col-md-6">
                <div class="form-group">
                    <label for="pt_hero_btn_text">Hero Button Text</label>
                    <input type="text" 
                        id="pt_hero_btn_text" class="form-control" 
                        name="pt_hero_btn_text" placeholder="Click Here"
                        value="<?php echo $pt_hero_data['hero_btn_text']; ?>" />
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="pt_hero_btn_link">Hero Button Link</label>
                    <input type="text" 
                        id="pt_hero_btn_link" class="form-control" 
                        name="pt_hero_btn_link" placeholder="https://wwww.domain.com"
                        value="<?php echo $pt_hero_data['hero_btn_link']; ?>" />
                </div>
            </div>
        </div>


        <div class="form-group" style="margin-top: 15px;">
            <div class="img-container" style="width: 20%; margin: 15px 0; padding: 5px; border: 1px solid #dcdcdc; ">
                <?php if(!empty( $pt_hero_data['hero_image'] ) || $pt_hero_data['hero_image'] != ""): ?>
                    <img class="true_pre_image" src="<?php echo $pt_hero_image[0]; ?>" style="width:100%;display:block;" />
                <?php endif; ?>
            </div>
            <input type="hidden" value="<?php echo $pt_hero_data['hero_image']; ?>" name="pt_hero_image" id="pt_hero_image"/>
            <button class="btn btn-info btn-sm media-upload-btn" type="button">Upload or Choose Hero Image</button>
        </div>
    </div>

<?php 
} 


/**
 * pt_home_subscribe metabox callback function
 * Generates Custom Fields
 */
function pt_home_subs_meta_cb($post){ 
    $pt_subs_data  = get_post_meta( $post->ID, 'pt_subs_data', true );
    ?>

    <div>
        <div class="form-group">
            <label for="pt_subs_title">Subscribe Section Title</label>
            <input type="text" 
                class="form-control" id="pt_subs_title"
                name="pt_subs_title" placeholder="Subscribe Now!" 
                value="<?php echo $pt_subs_data['subs_title']; ?>" />
        </div>
        <div class="form-group">
            <label for="pt_subs_content">Hero Section Content</label>
            <textarea name="pt_subs_content" style="min-height: 80px;"
                    id="pt_subs_content" class="form-control" 
                    placeholder="Some contents here"><?php echo $pt_subs_data['subs_content']; ?></textarea>
        </div>
    </div>

<?php 
}

/**
 * pt_home_about metabox callback function
 * Generates Custom Fields
 */
function pt_home_about_meta_cb($post){
    $pt_about_data  = get_post_meta( $post->ID, 'pt_about_data', true );
    ?>

    <div class="form-group">
        <label for="pt_about_content">About Section Content</label>
        <textarea name="pt_about_content" style="min-height: 80px;"
                id="pt_about_content" class="form-control" 
                placeholder="Some contents here"><?php echo $pt_about_data['content']; ?></textarea>
    </div>



<?php     
}



if(!(empty($_POST['s_email'])) && is_email( $_POST['s_email'] )){
    $post_args = array(
        'post_title'        => $_POST['s_email'],
        'post_type'         => 'subscriber',
        'post_status'       => 'publish',
        'comment_status'    => 'closed'
    );
    
    wp_insert_post($post_args);
}