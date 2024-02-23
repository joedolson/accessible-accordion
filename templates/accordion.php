<?php
/**
 * Accordion Callback
 *
 * @param array $attributes Block attributes.
 */
function accordion_callback( $attributes ) {
	$ab_css = '
	/**
	 * Normal CSS
	 */
	.ab_accordion-label {
		all: unset;
	}
	.ab_accordion-labels {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
	}
	.ab_accordion-label {
		padding: .25rem .5rem;
		border-radius: 3px 3px 0 0;
		border: 1px solid;
		border-bottom: none;
		position: relative;
		bottom: -1px;
		background: transparent;
		color: #1d2327;
	}
	.ab_accordion-label:focus,
	.ab_accordion-label:hover,
	.ab_accordion-label[aria-selected="true"] {
		font-weight: 700;
		color: #1d2327;
		background: #fff;
	}
	.ab_accordion-wrapper {
		border: 1px solid;
		padding: 1rem;
		background: #fff;
		color: #1d2327;
	}';

	return $ab_css;
}