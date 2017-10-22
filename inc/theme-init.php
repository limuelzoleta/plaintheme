<?php 

/**
 * Create Custom Post Types for the Theme
 */
function plain_theme_init(){
	/**
	 * Portfolio Post Type
	 */
    $subscribers_labels = array(
		'name'               => _x( 'Subscribers', 'post type general name', 'plaintheme' ),
		'singular_name'      => _x( 'Subscriber', 'post type singular name', 'plaintheme' ),
		'menu_name'          => _x( 'Subscribers', 'admin menu', 'plaintheme' ),
		'name_admin_bar'     => _x( 'Subscriber', 'add new on admin bar', 'plaintheme' ),
		'add_new'            => _x( 'Add New', 'subscriber', 'plaintheme' ),
		'add_new_item'       => __( 'Add New Subscriber', 'plaintheme' ),
		'new_item'           => __( 'New Subscriber', 'plaintheme' ),
		'edit_item'          => __( 'Edit Subscriber', 'plaintheme' ),
		'view_item'          => __( 'View Subscriber', 'plaintheme' ),
		'all_items'          => __( 'All Subscribers', 'plaintheme' ),
		'search_items'       => __( 'Search Subscribers', 'plaintheme' ),
		'parent_item_colon'  => __( 'Parent Subscribers:', 'plaintheme' ),
		'not_found'          => __( 'No subscribers found.', 'plaintheme' ),
		'not_found_in_trash' => __( 'No subscribers found in Trash.', 'plaintheme' )
	);

	$subscribers_args = array(
		'labels'             => $subscribers_labels,
        'description'        => __( 'A custom post type for subscribers.', 'plaintheme' ),
		'public'             => false,
		'publicly_queryable' => true,
		'show_ui'            => true,
		'show_in_menu'       => true,
		'query_var'          => true,
		'rewrite'            => array( 'slug' => 'subscriber' ),
		'capability_type'    => 'post',
		'has_archive'        => true,
		'hierarchical'       => false,
		'exclude_from_search'=> true,
		'menu_position'      => 20,
        'supports'           => array( 'title' ),
        'taxonomies'         => array()
	);

	register_post_type( 'subscriber', $subscribers_args );

}
add_action( 'init', 'plain_theme_init' );