import { useBlockProps, InnerBlocks, RichText } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: `ab_accordion-parent`,
	});

	return (
		<div {...blockProps}>
			<div className="ab_accordion-header">
				<RichText.Content tagName="h2" value={ attributes.content } />
			</div>
			<div className="ab_accordion-wrapper">
				<InnerBlocks.Content />
			</div>
		</div>
	);
}
