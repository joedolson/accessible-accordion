<?php
/**
 * Accordion Callback
 *
 * @param array $attributes Block attributes.
 */
function accordion_callback() {
	$ab_css = '
	/**
	 * Normal CSS
	 */
	.ab_accordion-header h2,
	.ab_accordion-header h3,
	.ab_accordion-header h4 {
		margin: 0 auto .5rem;
	}
	.ab_accordion-header button {
		all: unset;
		border: 1px solid #1d2327;
		width: calc( 100% - 16px );
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	.ab_accordion-header button:focus,
	.ab_accordion-header button:hover,
	.ab_accordion-header button[aria-expanded="true"] {
		outline: 2px solid;
		outline-offset: 1px;
	}
	.ab_accordion-wrapper {
		border: 1px solid;
		padding: 1rem;
		background: #fff;
		color: #1d2327;
		margin-bottom: .5rem;
	}';

	return $ab_css;
}