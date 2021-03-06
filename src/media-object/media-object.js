import { dispatch, withDispatch, useDispatch  } from '@wordpress/data';
import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
import { store as blocksStore } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { __experimentalText as Text } from '@wordpress/components';

const { registerBlockType, createBlocksFromInnerBlocksTemplate } = wp.blocks;
const { MediaUpload, BlockIcon, MediaPlaceholder, InnerBlocks, InspectorControls, ColorPalette } = wp.blockEditor;
const { Button, PanelBody, PanelRow, RangeControl, text } = wp.components;
const ALLOWED_BLOCKS = [ 'utksds/button', 'horizontal-rule/main', 'core/paragraph', 'core/heading' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

const MEDIA_TEMPLATE = [
	[ 'media/content', {}, [
    	[ 'core/paragraph' ],
	] ],
];

registerBlockType( 'media-object/main', {
	title: 'Media Object',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 5h-8v2h8v-2zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zm-10 1.597l-.003.403h-13.994l-.003-.403c0-.896.116-1.937 1.854-2.335 1.729-.396 3.838-1.421 3.217-2.755-.397.64-1.635 1.037-2.597.469 2.771-.702-1.36-5.524 2.258-8.228.649-.5 1.449-.748 2.253-.748.809 0 1.62.251 2.283.748 3.618 2.704-.512 7.526 2.258 8.228-.962.568-2.198.188-2.596-.469-.622 1.333 1.484 2.358 3.216 2.755 1.737.399 1.854 1.439 1.854 2.335z"/></svg>,
	category: 'media',
	description: 'Horizontally oriented text and picture',
	supports: {
		html: false,
	},
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '',
		},
		imageAlt: {
			attribute: 'alt',
			selector: '.mr-3',
		},
		imageUrl: {
			attribute: 'src',
			selector: '.mr-3',
		},
		imageSize: {
			attribute: 'width',
			selector: '.mr-3',
		},
	},

	// eslint-disable-next-line no-unused-vars
	edit( { clientId, attributes, setAttributes } ) {
		const { backgroundColor } = attributes;
	
		const { replaceInnerBlocks } = useDispatch( blockEditorStore );

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}

		const getImageButton = ( openEvent ) => {
			if ( attributes.imageUrl ) {
				return (
					<div>
					<img
						src={ attributes.imageUrl }
						style={ { width:248 } }
						onClick={ openEvent }
						className="image"
					/>
					<Text variant="muted">Click above to change image.</Text>
					</div>
				);
			}

			return (
				// eslint-disable-next-line react/jsx-key
				<InspectorControls style={ { marginBottom: '40px' } }>
					<PanelBody title={ 'Background Color Settings' }>
						<p><strong>Select a Background color:</strong></p>
						<ColorPalette value={ backgroundColor }
							onChange={ onBackgroundColorChange } />
					</PanelBody>
				</InspectorControls>,
				<div className="button-container">
					<Button
						onClick={ openEvent }
						className="button button-large"
					>
						Pick an image
					</Button>
				</div>
			);
		};
	
		const ovPlaceholder = (
			<MediaPlaceholder
				onSelect={ media => {
					if(media.width > 640){
						setAttributes( { imageAlt: media.alt, imageUrl: media.url, imageSize: 640 } );
					}else{
						setAttributes( { imageAlt: media.alt, imageUrl: media.url, imageSize: media.width } );
					}
					
					replaceInnerBlocks(
						clientId,
						createBlocksFromInnerBlocksTemplate(
							MEDIA_TEMPLATE
						),
						true
					);
				} }
				allowedTypes={ [ 'image' ] }
				value={ attributes.imageID }
				icon={ <BlockIcon icon={ <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 5h-8v2h8v-2zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zm-10 1.597l-.003.403h-13.994l-.003-.403c0-.896.116-1.937 1.854-2.335 1.729-.396 3.838-1.421 3.217-2.755-.397.64-1.635 1.037-2.597.469 2.771-.702-1.36-5.524 2.258-8.228.649-.5 1.449-.748 2.253-.748.809 0 1.62.251 2.283.748 3.618 2.704-.512 7.526 2.258 8.228-.962.568-2.198.188-2.596-.469-.622 1.333 1.484 2.358 3.216 2.755 1.737.399 1.854 1.439 1.854 2.335z"/></svg> } /> }
				labels={ { title: 'The Image', instructions: 'Upload an image or select one from the media library to showcase.' } }
				></MediaPlaceholder>
		);

		return ( [
			<InspectorControls>
				<PanelBody title='Image Settings' initialOpen={ true }>
					<RangeControl
        				label="Width"
						value={ attributes.imageSize }
        				onChange={ ( value ) =>{ setAttributes( {imageSize:value} ); } }
						min={ 50 }
						max={ 640 }
    				/>
				</PanelBody>
				{ attributes.imageUrl && (
				<PanelBody title='Selected Image' initialOpen={ true }>
					<MediaUpload
						onSelect={ media => {
							setAttributes( { imageAlt: media.alt, imageUrl: media.url, imageSize: media.width } );
						} }
						type="image"
						value={ attributes.imageID }
						render={ ( { open } ) => getImageButton( open ) }
					/>
				</PanelBody>
				) }
			</InspectorControls>,
			<div className="media">
				{ attributes.imageUrl && (
				<img
					src={ attributes.imageUrl }
					style={ { width:attributes.imageSize } }
					className="image"
				/>
				) }
				<InnerBlocks allowedBlocks={ [ 'media/content' ] } placeholder={ ovPlaceholder } templateLock={ true } />
			</div>
		] );
	},

	save( { attributes } ) {
		const mediaImage = ( src, alt, width ) => {
			if ( ! src ) {
				return null;
			}

			if ( alt ) {
				return (
					<img
						className="mr-3"
						src={ src }
						alt={ alt }
						style={ { width:width } }
					/>
				);
			}

			// No alt set, so let's hide it from screen readers
			return (
				<img
					className="mr-3"
					src={ src }
					alt=""
					style={ { width:width } }
					aria-hidden="true"
				/>
			);
		};

		return (
			<div className="d-flex align-items-center">
				<div class="flex-shrink-0">
					{ mediaImage( attributes.imageUrl, attributes.imageAlt, attributes.imageSize ) }
				</div>
				<div className="flex-grow-1 ms-3">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );

registerBlockType( 'media/content', {
	title: 'Media Content',
	parent: [ 'media-object/main' ],
	description: 'Inner blocks container for Media Object.',
	
	edit: ( props ) => {
		
		return(
			<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock={ false } />
		);
	},
	
	save: ( { attributes } ) => {

		return (
			<InnerBlocks.Content />
		);
	},
} );
