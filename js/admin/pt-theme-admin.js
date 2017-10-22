jQuery(function($){
    $('body').on('click', '.media-upload-btn', function(e){
		e.preventDefault();
 
    		var button = $(this),
    		    custom_uploader = wp.media({
			title: 'Insert image',
			library : {
				// uncomment the next line if you want to attach image to the current post
				// uploadedTo : wp.media.view.settings.post.id, 
				type : 'image'
			},
			button: {
				text: 'Use this image' // button label text
			},
			multiple: false // for multiple image selection set to true
		}).on('select', function() { // it also has "open" and "close" events 
			var attachment = custom_uploader.state().get('selection').first().toJSON();
            $('.img-container').html('<img class="true_pre_image" src="' + attachment.url + '" style="width:100%;display:block;" />').next().val(attachment.id).next().show();
            $('#hero-image').val(attachment.id);
            $('.img-container').slideDown('slow');
			
		})
		.open();
    });
    
});