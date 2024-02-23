/* eslint-disable @wordpress/no-unsafe-wp-apis */
import { __ } from '@wordpress/i18n';
import {
	InnerBlocks,
	RichText,
	useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['ab/accordion'];

import './accordion';
import './header';

// editor style.
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const blockProps       = useBlockProps();
    const updateContentValue = ( val ) => {
        setAttributes( { content: val } );
    }
	return (
		<div { ...blockProps }>
			<div className="ab_accordion-header">
				<RichText
					{ ...blockProps}
					tagName="h2"
					value={ attributes.content }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ updateContentValue }
					placeholder={ __( 'Accordion heading' ) }
				/>
				<span aria-hidden="true">+</span>
			</div>
			<InnerBlocks
				allowedBlocks={ALLOWED_BLOCKS}
				template={[['ab/accordion']]}
				onChange={ updateContentValue }
			/>
		</div>
	);
}
