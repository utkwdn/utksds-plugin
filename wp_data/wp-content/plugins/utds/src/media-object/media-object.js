const { registerBlockType } = wp.blocks;
const { MediaUpload, InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { Button, PanelBody } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'media-object/main', {
	title: 'Media Object',
	icon: 'media-video',
	category: 'utdesign_system',
	description: 'Horizontally oriented text and picture',
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

		return (
			<div className="media">
				<MediaUpload
					onSelect={ media => {
						setAttributes( { imageAlt: media.alt, imageUrl: media.url } );
					} }
					type="image"
					value={ attributes.imageID }
					render={ ( { open } ) => getImageButton( open ) }
				/>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>
		);
	},

	save( { attributes } ) {
		const mediaImage = ( src, alt ) => {
			if ( ! src ) {
				return null;
			}

			if ( alt ) {
				return (
					<img
						className="mr-3"
						src={ src }
						alt={ alt }
					/>
				);
			}

			// No alt set, so let's hide it from screen readers
			return (
				<img
					className="mr-3"
					src={ src }
					alt=""
					aria-hidden="true"
				/>
			);
		};

		return (
			<div className="media">
				{ mediaImage( attributes.imageUrl, attributes.imageAlt ) }
				<div className="media-body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
