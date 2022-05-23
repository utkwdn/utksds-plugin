import { PanelBody, TextControl } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InnerBlocks, InspectorControls, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ACCORDION_TEMPLATE = [
    [ 'utkwds/accordion-fold' ],
];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes } = props;
	const blockProps = useBlockProps();

		return ( [
			<InspectorControls>
				<PanelBody title='Accordion Properties' initialOpen={ true }>
					<TextControl
						label='Accordion ID'
						help='The identifier for the accordion group.'
						value={ attributes.accordionID }
						onChange={ ( value ) =>{ setAttributes( {accordionID:value} ); } }
					/>
				</PanelBody>
			</InspectorControls>,
			<div { ...blockProps }>
			<div className={ "accordion" } id={ attributes.accordionID }>
				<InnerBlocks template={ ACCORDION_TEMPLATE } allowedBlocks={ [ 'utkwds/accordion-fold', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
			</div>
		] );
}
