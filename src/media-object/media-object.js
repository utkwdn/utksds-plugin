const { registerBlockType } = wp.blocks;
const { MediaUpload, InnerBlocks, InspectorControls, ColorPalette } = wp.blockEditor;
const { Button, PanelBody, PanelRow, RangeControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

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
	edit( { attributes, setAttributes } ) {
		const { backgroundColor } = attributes;

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}

		const getImageButton = ( openEvent ) => {
			if ( attributes.imageUrl ) {
				return (
					<img
						src={ attributes.imageUrl }
						style={ { width:attributes.imageSize } }
						onClick={ openEvent }
						className="image"
					/>
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

		return ( [
			<InspectorControls>
				<PanelBody title='Image Settings' initialOpen={ true }>
					<RangeControl
        				label="Width"
						value={ attributes.imageSize }
        				onChange={ ( value ) =>{ setAttributes( {imageSize:value} ); } }
						min={ 50 }
						max={ 500 }
    				/>
				</PanelBody>
			</InspectorControls>,
			<div className="media">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { imageAlt: media.alt, imageUrl: media.url, imageSize: media.width } );
					} }
					type="image"
					value={ attributes.imageID }
					render={ ( { open } ) => getImageButton( open ) }
				/>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
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
			<div className="media d-flex">
				<div class="flex-shrink-0">
					{ mediaImage( attributes.imageUrl, attributes.imageAlt, attributes.imageSize ) }
				</div>
				<div className="media-body flex-grow-1 ms-3">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
