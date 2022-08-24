import { siteColors } from '../../globals.js'
import { PanelBody, PanelRow } from '@wordpress/components';

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
import { InspectorControls, ColorPalette, getColorObjectByColorValue, RichText, useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const { attributes, setAttributes, clientId } = props;
	const { colorSlug, color } = attributes;

	const blockProps = useBlockProps();

		return ( [
			<InspectorControls>
				<PanelBody title='Style'>
				<PanelRow>
						<ColorPalette
							colors = { siteColors }
							value={ color }
							onChange={ ( value ) =>{
								if (!value) return;
								const thisColor = getColorObjectByColorValue( siteColors, value );
								setAttributes({
									colorSlug: thisColor.slug.replace("bg-", "alert-"),
									color: thisColor.color,
								});
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div { ...blockProps }>
		  	<div className={ 'alert ' + colorSlug }>
				<RichText
					tagName='span'
					key={ clientId }
					placeholder={ attributes.placeholder }
					value={ attributes.text }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					withoutInteractiveFormatting
				/>
			</div>
			</div>,
		] );
}
