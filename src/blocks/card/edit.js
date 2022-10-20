import { PanelBody, PanelRow, ToggleControl } from '@wordpress/components';
import { getBlockVariations, createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
import { dispatch, useDispatch  } from '@wordpress/data';
import { select } from '@wordpress/data';
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
import { InnerBlocks, InspectorControls, ColorPalette, getColorObjectByColorValue, __experimentalBlockVariationPicker, useBlockProps, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'core/buttons', 'core/paragraph', 'utkwds/card-heading', 'core/list', 'core/quote', 'utkwds/lead', 'utkwds/horizontal-rule', 'card/heading', 'lead/main', 'horizontal-rule/main' ];

const HEADING_TEMPLATE = [
	[ 'core/heading', { className: 'card-title' } ],
];

const TOP_CAP_TEMPLATE = [
	[ 'core/image', { className: 'card-img-top' } ],
];

const IMAGE_TEMPLATE = [
	[ 'core/image', { className: 'card-img' } ],
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
		clientId,
		name,
		setAttributes
	  } = props;

	const blockProps = useBlockProps();

	const cardVariations = getBlockVariations( 'utkwds/card' );
	const { replaceInnerBlocks } = useDispatch( blockEditorStore );

	var cardPlaceholder = (
		<__experimentalBlockVariationPicker
			label = 'Card Template'
			instructions = 'A card is a flexible and extensible content container for highlighting pieces of content with multiple variants and options. Choose a template to get started.'
			variations={ cardVariations }
			onSelect={ ( nextVariation ) =>{
				//console.log( nextVariation );
				setAttributes( nextVariation.attributes );

				replaceInnerBlocks(
					clientId,
					createBlocksFromInnerBlocksTemplate(
						nextVariation.innerBlocks
					),
					true
				);
			} }
		/>
	);

	function onBackgroundColorChange( newColor ) {
		setAttributes( { backgroundColor: newColor } );
	}

	select( 'core/block-editor' ).getBlock( props.clientId ).innerBlocks.map( childrenBlock => {
		  dispatch( 'core/block-editor' ).updateBlockAttributes( childrenBlock.clientId, {

			parentBlockName: props.name,

		  } );
	} );

		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title='Colors' initialOpen={ true }>
					{ ! attributes.cardOutline && (
					<PanelRow>
						<p><strong>Select a background color:</strong></p>
					</PanelRow>
					) }
					{ ! attributes.cardOutline && (
					<PanelRow>
						<ColorPalette
							colors = { siteColors }
							value={ attributes.color }
							onChange={ ( value ) =>{
								if (!value) return;
								const thisColor = getColorObjectByColorValue( siteColors, value );
								setAttributes({
									color: thisColor.color,
									colorSlug: thisColor.slug.replace("border-", "bg-"),
									textColor:thisColor.text
								});
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
					) }
					{ attributes.cardOutline && (
					<PanelRow>
						<p><strong>Select a border color:</strong></p>
					</PanelRow>
					) }
					{ attributes.cardOutline && (
					<PanelRow>
						<ColorPalette
							colors = { siteColors }
							value={ attributes.color }
							onChange={ ( value ) =>{
								if (!value) return;
								const thisColor = getColorObjectByColorValue( siteColors, value );
								setAttributes({
									color: thisColor.color,
									colorSlug: thisColor.slug.replace("bg-", "border-"),
									textColor: ''
								});
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
					) }
					<PanelRow>
						<ToggleControl
							label='Card Fill'
							help={ attributes.cardOutline ? 'Card is outlined in color.' : 'Card is solid color.' }
							checked={ attributes.cardOutline }
							onChange={ () => {
								setAttributes( { cardOutline: !attributes.cardOutline } );
								//console.log(attributes.buttonOutline);

								if( !attributes.cardOutline === true ){
									const thisColor = getColorObjectByColorValue( siteColors, attributes.color );
									setAttributes({
										color: thisColor.color,
										colorSlug: thisColor.slug.replace("bg-", "border-"),
										textColor: ''
									});
									//console.log(thisColor);
								}else{
									const thisColor = getColorObjectByColorValue( siteColors, attributes.color );
									setAttributes({
										color: thisColor.color,
										colorSlug: thisColor.slug.replace("border-", "bg-"),
										textColor:thisColor.text
									});
									//console.log(thisColor);
								}

								//console.log(attributes.buttonColor);
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div { ...blockProps }>
			<div className={'card card-edit ' + attributes.textColor + ' ' + attributes.colorSlug }>
				<InnerBlocks allowedBlocks={ [ 'utkwds/card-body', 'utkwds/card-image', 'utkwds/columns', 'utkwds/card-topcap', 'card/body', 'card/image', 'utksds/columns', 'card/topcap' ] } placeholder={ cardPlaceholder } templateLock={ 'all' } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
			</div>,
		] );
}
