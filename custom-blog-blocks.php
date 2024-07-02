<?php
/**
 * Plugin Name:       Custom Block Blocks
 * Description:       A Series of Custom Blocks for Blog
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            Carlos Rebolledo
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       custom-blog-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_custom_blog_blocks_init() {
	include_once 'build/estimated_time/estimated_time.php';
	register_block_type( __DIR__ . '/build/estimated_time', array(
		'render_callback' => 'estimated_time',
	) );

	register_block_type( __DIR__ . '/build/weather');
}
add_action( 'init', 'create_custom_blog_blocks_init' );
