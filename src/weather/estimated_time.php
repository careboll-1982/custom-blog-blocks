<?php
function estimated_time(){
	global $post;

	if ( ! $post ) {
		return '';
	}

	$word_count = str_word_count( strip_tags( $post->post_content ) );
	$reading_time = ceil( $word_count / 200 ); // Assuming average reading speed of 200 words per minute.

	return '<div class="estimated-reading-time">' . sprintf( _n( '%s minute read', '%s minutes read', $reading_time, 'estimated-reading-time' ), $reading_time ) . '</div>';

}
?>
