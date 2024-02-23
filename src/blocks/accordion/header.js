import { RichText, useBlockProps } from '@wordpress/block-editor';
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;

registerBlockType( 'ab/accordion-header', {
	title: __( 'Accordion', 'accordion-block' ),
	description: __('Accordion header.', 'accordion-block'),
	supports: {
		html: false,
		customClassName: false,
	},
	icon: {
		foreground: '#333',
		src: 'text',
	},
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		}
	},
	parent: ['ab/accordions'],
	category: 'ab-block',
	keywords: [
		__('accordion', 'accordion-block'),
	],
	edit: ({ className }) => {
		const blockProps       = useBlockProps();
		const updateContentValue = ( val ) => {
			setAttributes( { content: val } );
		}

		return (
				<div className={`ab__header ` + className + '_inner'}>
					<RichText
						{ ...blockProps}
						tagName="h2"
						value={ attributes.content }
						allowedFormats={ [ 'core/bold', 'core/italic' ] }
						onChange={ updateContentValue }
						placeholder={ __( 'Accordion heading' ) }
					/>
				</div>
		);
	},
	save: () => {
		const blockProps = useBlockProps.save();

		return (
			<div className="ab__accordion-header">
				<RichText.Content { ...blockProps } tagName="h2" value={ attributes.content } />
			</div>
		);
	},
});
