const { registerBlockType } = wp.blocks;
const {
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
} = wp.editor;
const { PanelBody, IconButton, RangeControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading' ];

import './style.scss';
import './editor.scss';

registerBlockType( 'jumbotron/main', {
	title: 'Jumbotron',
	icon: 'editor-contract',
	category: 'utdesign_system',
	attributes: {
		backgroundImage: {
			type: 'string',
			default: null,
		},
		overlayColor: {
			type: 'string',
			default: 'black',
		},
		overlayOpacity: {
			type: 'number',
			default: 0.3,
		},
	},

	edit: ( { attributes, setAttributes } ) => {
		const {
			backgroundImage,
			overlayColor,
			overlayOpacity,
		} = attributes;

		// custom functions
		function onSelectImage( newImage ) {
			setAttributes( { backgroundImage: newImage.sizes.full.url } );
		}

		function onOverlayColorChange( newColor ) {
			setAttributes( { overlayColor: newColor } );
		}

		function onOverlayOpacityChange( newOpacity ) {
			setAttributes( { overlayOpacity: newOpacity } );
		}

		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ 'Background Image Settings' }>
					<p><strong>Select a Background Image:</strong></p>
					<MediaUpload
						onSelect={ onSelectImage }
						type="image"
						value={ backgroundImage }
						render={ ( { open } ) => (
							<IconButton
								className="editor-media-placeholder__button is-button is-default is-large"
								icon="upload"
								onClick={ open }>
								Background Image
							</IconButton>
						) } />
					<div style={ { marginTop: '20px', marginBottom: '40px' } }>
						<p><strong>Overlay Color:</strong></p>
						<ColorPalette value={ overlayColor }
							onChange={ onOverlayColorChange } />
					</div>
					<RangeControl
						label={ 'Overlay Opacity' }
						value={ overlayOpacity }
						onChange={ onOverlayOpacityChange }
						min={ 0 }
						max={ 1 }
						step={ 0.01 } />
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className="jumbotron-edit jumbotron" style={ {
				backgroundImage: `url(${ backgroundImage })`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			} }>
				<div className="cta-overlay" style={ { background: overlayColor, opacity: overlayOpacity } }></div>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const {
			backgroundImage,
			overlayColor,
			overlayOpacity,
		} = attributes;

		return (
			<div className="jumbotron" style={ {
				backgroundImage: `url(${ backgroundImage })`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			} }>
				<div className="cta-overlay" style={ { background: overlayColor, opacity: overlayOpacity } }></div>
				<InnerBlocks.Content />
			</div>
		);
	},
} );
