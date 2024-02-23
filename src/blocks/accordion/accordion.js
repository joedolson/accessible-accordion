import { InnerBlocks } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'ab/accordion', {
	title: __( 'Accordion', 'accordion-block' ),
	description: __('Holds accordion content.', 'accordion-block'),
	supports: {
		html: false,
		customClassName: false,
	},
	icon: {
		foreground: '#555',
		src: 'text',
	},
	parent: ['ab/accordions'],
	category: 'ab-block',
	keywords: [
		__('accordion', 'accordion-block'),
	],
	edit: ({ className }) => {
		return (
			<div className={className}>
				<div className={`ab__inner_blocks ` + className + '_inner'}>
					<InnerBlocks
						allowedBlocks={true}
					/>
				</div>
			</div>
		);
	},
	save: () => {
		return (
			<div className="ab__accordion-panel">
				<div className="ab__accordion-content">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
});
