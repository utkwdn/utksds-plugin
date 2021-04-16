import { dispatch, withDispatch, useDispatch  } from '@wordpress/data';
import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
import { store as blocksStore } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';

const { registerBlockType, registerBlockVariation, getBlockVariations, createBlocksFromInnerBlocksTemplate } = wp.blocks;
const { InnerBlocks, InspectorControls, MediaUpload, ColorPalette, RichText, getColorObjectByColorValue, __experimentalBlockVariationPicker } = wp.blockEditor;
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
	attributes: {
		imageAlt: {
			type: 'string',
			default: '',
		},
		imageUrl: {
			type: 'string',
			default: '',
		},
	},
				  
	edit: ( { clientId, attributes, setAttributes } ) => {
	
		const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	
		const ovPlaceholder = (
			<MediaUpload
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
				type="image"
				value={ attributes.imageID }
				render={ ( { open } ) =>(
					<Button onClick={ open }>Open Media Library</Button>
				) }
			/>
		);

		console.log(attributes.imageAlt);
		console.log(attributes.imageUrl);

		return ( [
			<div className="card">
				{ attributes.imageUrl !== '' && (
  				<img src={ attributes.imageUrl } className="card-img" alt={ attributes.imageAlt } />
				) }
  				<div className="card-img-overlay">
    				<InnerBlocks allowedBlocks={ [ 'overlay/main' ] } placeholder={ ovPlaceholder } templateLock={ true } />
				</div>
			</div>
		] );
	
	},
				  
	save: ( { attributes } ) => {
		
		return (
			<div className="card">
				<img
					src={ attributes.imageUrl }
					className={ 'card-img' }
					alt={ attributes.imageAlt }
				/>
  				<div className="card-img-overlay">
    				<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );

registerBlockType( 'overlay/main', {
	title: 'Overlay Main',
	parent: [ 'utksds/overlay' ],
	description: 'Inner blocks container for Overlay.',
	
	edit: ( props ) => {
		
		return(
			<InnerBlocks allowedBlocks={ [ 'card/heading', 'card/paragraph', 'utksds/button' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
		);
	},
	
	save: ( { attributes } ) => {

		return (
			<InnerBlocks.Content />
		);
	},
} );