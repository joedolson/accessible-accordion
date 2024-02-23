<?php
/**
 * Plugin Name:       Accessible Accordion
 * Description:       A custom Gutenberg Block to show content in accordions.
 * Requires at least: 5.7
 * Requires PHP:      7.0
 * Version:           1.0.0
 * Author:            Joe Dolson
 * Author URI:        https://www.joedolson.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       accordion-block
 *
 * @package           @wordpress/create-block 
 */

 /**
  * @package Zero Configuration with @wordpress/create-block
  *  [tb] && [TB] ===> Prefix
  */

// Stop Direct Access 
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Blocks Final Class
 */
final class Accordion_block_class {
	public function __construct() {

		// define constants
		$this->ab_define_constants();

		// block initialization
		add_action( 'init', [ $this, 'ab_blocks_init' ] );

		// blocks category
		if( version_compare( $GLOBALS['wp_version'], '5.7', '<' ) ) {
			add_filter( 'block_categories', [ $this, 'ab_register_block_category' ], 10, 2 );
		} else {
			add_filter( 'block_categories_all', [ $this, 'ab_register_block_category' ], 10, 2 );
		}

		// enqueue block assets
		add_action( 'enqueue_block_assets', [ $this, 'ab_external_libraries' ] );
	}

	/**
	 * Initialize the plugin
	 */

	public static function init(){
		static $instance = false; 
		if( ! $instance ) {
			$instance = new self();
		}
		return $instance;
	}

	/**
	 * Define the plugin constants
	 */
	private function ab_define_constants() {
		if ( SCRIPT_DEBUG ) {
			define( 'AB_VERSION', time() );
		} else {
			define( 'AB_VERSION', '1.0.0' );
		}
		define( 'AB_URL', plugin_dir_url( __FILE__ ) );
		define( 'AB_LIB_URL', AB_URL . 'lib/' );
	}

	/**
	 * Blocks Registration 
	 */

	public function ab_register_block( $name, $options = array() ) {
		register_block_type( __DIR__ . '/build/blocks/' . $name, $options );
	 }

	/**
	 * Blocks Initialization
	*/
	public function ab_blocks_init() {
		// register single block.
		$this->ab_register_block( 'accordion', array(
			'render_callback' => array( $this, 'ab_render_block' ),
		) );
	}

	// inline css.
	public function ab_inline_css( $handle, $css ){
		// register inline style.
		wp_register_style( $handle, false );
		// enqueue inline style.
		wp_enqueue_style( $handle );
		// add inline style at head.
		wp_add_inline_style( $handle, $css );
	}

	// render function.
	public function ab_render_block( $attributes, $content ) {
		require_once __DIR__ . '/templates/accordion.php';
		$handle = 'ab-accessible-accordion';
		$this->ab_inline_css( $handle, accordion_callback( $attributes ) );
		return $content;
	}

	/**
	 * Register Block Category
	 */
	public function ab_register_block_category( $categories, $post ) {
		return array_merge(
			array(
				array(
					'slug'  => 'ab-block',
					'title' => __( 'Accessible Accordion', 'accordion-block' ),
				),
			),
			$categories,
		);
	}

	/**
	 * Enqueue Block Assets
	 */
	public function ab_external_libraries() {
		// enqueue JS
		if( ! is_admin() && has_block( 'ab/accordions' ) ){
			wp_enqueue_script( 'ab-accordion', AB_LIB_URL . 'js/accordion.js', array(), AB_VERSION, true );
		}
	}

}

Accordion_block_class::init();
