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
import { useBlockProps, InspectorControls, ColorPalette, getColorObjectByColorValue, RichText } from '@wordpress/block-editor';

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
export default function Edit() {
	const { attributes, setAttributes } = useBlockProps;
	const { imagePostion } = attributes;

		return ( [
			<InspectorControls>
				<PanelBody title='Style'>
				<PanelRow>
						<ColorPalette
							colors = { siteColors }
							value={ attributes.imagePostion.color }
							onChange={ ( value ) =>{
								var thisColor = getColorObjectByColorValue( siteColors, value );
								thisColor.slug = thisColor.slug.replace("bg-", "alert-");
								setAttributes( { imagePostion:thisColor } );
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
		  	<div className={ 'alert ' + imagePostion.slug }>
				<RichText
					tagName='span'
					placeholder={ attributes.placeholder }
					value={ attributes.text }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					withoutInteractiveFormatting
				/>
			</div>,
		] );
}
