import { PanelBody, PanelRow, RangeControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { siteColors } from '../../globals.js'

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
import { useBlockProps, InnerBlocks, InspectorControls, ColorPalette, getColorObjectByColorValue, MediaPlaceholder, BlockIcon, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utksds/button', 'core/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ];

const OVERLAY_TEMPLATE = [
    [ 'overlay/main', {}, [
		[ 'card/heading' ],
		[ 'core/paragraph' ],
	] ],
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
	const {
		attributes,
    	setAttributes,
		clientId
	  } = props;

	  const blockProps = useBlockProps();

	  const { replaceInnerBlocks } = useDispatch( blockEditorStore );

		const ovPlaceholder = (
			<MediaPlaceholder
				onSelect={ media => {
					setAttributes( { imageAlt: media.alt, imageUrl: media.url } );

					replaceInnerBlocks(
						clientId,
						createBlocksFromInnerBlocksTemplate(
							OVERLAY_TEMPLATE
						),
						true
					);
				} }
				allowedTypes={ [ 'image' ] }
				value={ attributes.imageID }
				icon={ <BlockIcon icon={ <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-richtext" viewBox="0 0 16 16"><path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/></svg> } /> }
				labels={ { title: 'The Image', instructions: 'Upload an image or select one from the media library to be the background of this block.' } }
				></MediaPlaceholder>
		);

		return ( [
			<InspectorControls>
				<PanelBody>
				<PanelRow>
					<ColorPalette
							colors = { siteColors }
							value={ attributes.overColor.color }
							onChange={ ( value ) =>{
								const thisColor = getColorObjectByColorValue( siteColors, value );
								setAttributes( { overColor:thisColor } );
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
				</PanelRow>
				<PanelRow>
					<RangeControl
        				label="Overlay Opacity"
						value={ attributes.overOpacity }
        				onChange={ ( value ) =>{ setAttributes( {overOpacity:value} ); } }
						min={ 0 }
						max={ 100 }
						step={ 10 }
    				/>
				</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div { ...blockProps }>
			<div className={ "card wpeditor-card-overlay overlay " + attributes.overColor.slug + " overlay-" + attributes.overOpacity + " " + attributes.overColor.text }>
				{ attributes.imageUrl !== '' && (
  				<img src={ attributes.imageUrl } className="card-img" alt={ attributes.imageAlt } />
				) }
    			<InnerBlocks allowedBlocks={ [ 'overlay/main' ] } placeholder={ ovPlaceholder } templateLock={ true } />
			</div>
			</div>
		] );
}
