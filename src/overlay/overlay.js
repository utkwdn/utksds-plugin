import { dispatch, withDispatch, useDispatch  } from '@wordpress/data';
import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
import { store as blocksStore } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { siteColors, textColors } from '../globals.js'

const { registerBlockType, registerBlockVariation, getBlockVariations, createBlocksFromInnerBlocksTemplate } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText, getColorObjectByColorValue, MediaPlaceholder, BlockIcon, __experimentalBlockVariationPicker } = wp.blockEditor;
const { PanelBody, PanelRow, Button, RangeControl, RadioControl, ToggleControl, SelectControl } = wp.components;
const { withState } = wp.compose;

const ALLOWED_BLOCKS = [ 'utksds/button', 'card/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ];

const OVERLAY_TEMPLATE = [
    [ 'overlay/main', {}, [
		[ 'card/heading' ], 
		[ 'card/paragraph' ],
	] ],
];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'utksds/overlay', {
	title: 'Image with Text Overlay',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-richtext" viewBox="0 0 16 16"><path d="M7 4.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0zm-.861 1.542 1.33.886 1.854-1.855a.25.25 0 0 1 .289-.047l1.888.974V7.5a.5.5 0 0 1-.5.5H5a.5.5 0 0 1-.5-.5V7s1.54-1.274 1.639-1.208zM5 9a.5.5 0 0 0 0 1h6a.5.5 0 0 0 0-1H5zm0 2a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1H5z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z"/></svg>,
	category: 'design',
	description: '',
	supports: {
		html: false,
	},
	attributes: {
		imageAlt: {
			type: 'string',
			default: '',
		},
		imageUrl: {
			type: 'string',
			default: '',
		},
		overColor: {
			type: 'object',
			default: { name: 'Primary', slug: 'bg-primary', color: '#58595b', text: 'text-light'}
		},
		overOpacity: {
			type: 'integer',
			default: 0,
		},
	},
	providesContext: {
		'overlay/bgColor': 'overColor',	
		'overlay/opacity': 'overOpacity',
	},
				  
	edit: ( { clientId, attributes, setAttributes } ) => {
	
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

		//const colors = [
			//{ name: 'Primary', slug: 'bg-primary', color: '#58595b', text: 'text-light'},
			//{ name: 'Secondary', slug: 'bg-secondary', color: '#006c93', text: 'text-light'},
			//{ name: 'Light', slug: 'bg-light', color: '#F6F6F6', text: 'text-primary'},
			//{ name: 'Dark', slug: 'bg-dark', color: '#4b4b4b', text: 'text-light'},
		//];

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
			<div className={ "card wpeditor-card-overlay overlay " + attributes.overColor.slug + " overlay-" + attributes.overOpacity + " " + attributes.overColor.text }>
				{ attributes.imageUrl !== '' && (
  				<img src={ attributes.imageUrl } className="card-img" alt={ attributes.imageAlt } />
				) }
    			<InnerBlocks allowedBlocks={ [ 'overlay/main' ] } placeholder={ ovPlaceholder } templateLock={ true } />
			</div>
		] );
	
	},
				  
	save: ( { attributes } ) => {
		
		return (
			<div className={ "card overlay " + attributes.overColor.slug + " overlay-" + attributes.overOpacity + " " + attributes.overColor.text }>
				<img
					src={ attributes.imageUrl }
					className={ 'card-img' }
					alt={ attributes.imageAlt }
				/>
    			<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'overlay/main', {
	title: 'Overlay Main',
	parent: [ 'utksds/overlay' ],
	description: 'Inner blocks container for Overlay.',
	supports: {
		html: false,
	},
	usesContext: [ 'overlay/bgColor', 'overlay/opacity', ],
	edit: ( { context } ) => {
		
		return(
			<div className={ "card-img-overlay" }>
				<InnerBlocks allowedBlocks={ [ 'card/heading', 'card/paragraph', 'utksds/button', 'lead/main' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } /></div>
		);
	},
	
	save: ( { attributes } ) => {

		return (
			<div className="card-img-overlay">
			<InnerBlocks.Content />
			</div>
		);
	},
} );