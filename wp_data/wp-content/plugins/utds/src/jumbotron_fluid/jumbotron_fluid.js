const { registerBlockType } = wp.blocks;
const {
	RichText,
	InspectorControls,
	ColorPalette,
	MediaUpload,
	InnerBlocks,
	BlockControls,
	AlignmentToolbar,
} = wp.editor;
const { PanelBody, IconButton, RangeControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator' ];

import './style.scss';
import './editor.scss';

registerBlockType( 'jumbotron-fluid/main', {
	title: 'Jumbotron-fluid',
	icon: 'editor-expand',
	category: 'utdesign_system',
	attributes: {
		title: {
			type: 'string',
			source: 'html',
			selector: 'h2',
		},
		titleColor: {
			type: 'string',
			default: 'black',
		},
		body: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		alignment: {
			type: 'string',
			default: 'none',
		},
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
			title,
			body,
			alignment,
			titleColor,
			backgroundImage,
			overlayColor,
			overlayOpacity,
		} = attributes;

		// custom functions
		function onChangeTitle( newTitle ) {
			setAttributes( { title: newTitle } );
		}

		function onChangeBody( newBody ) {
			setAttributes( { body: newBody } );
		}

		function onTitleColorChange( newColor ) {
			setAttributes( { titleColor: newColor } );
		}

		function onSelectImage( newImage ) {
			setAttributes( { backgroundImage: newImage.sizes.full.url } );
		}

		function onOverlayColorChange( newColor ) {
			setAttributes( { overlayColor: newColor } );
		}

		function onOverlayOpacityChange( newOpacity ) {
			setAttributes( { overlayOpacity: newOpacity } );
		}

		function onChangeAlignment( newAlignment ) {
			setAttributes( {
				alignment: newAlignment === undefined ? 'none' : newAlignment,
			} );
		}

		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ 'Font Color Settings' }>
					<p><strong>Select a Title color:</strong></p>
					<ColorPalette value={ titleColor }
						onChange={ onTitleColorChange } />
				</PanelBody>
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
			<div className="jumbotron-edit jumbotron jumbotron-fluid" style={ {
				backgroundImage: `url(${ backgroundImage })`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			} }>
				<div className="cta-overlay" style={ { background: overlayColor, opacity: overlayOpacity } }></div>
				{
					<BlockControls>
						<AlignmentToolbar value={ alignment }
							onChange={ onChangeAlignment } />
					</BlockControls>
				}
				<RichText key="editable"
					tagName="h2"
					placeholder="Your Jumbotron Title"
					value={ title }
					onChange={ onChangeTitle }
					style={ { color: titleColor, textAlign: alignment } } />
				<RichText key="editable"
					tagName="p"
					placeholder="Jumbotron Text"
					value={ body }
					onChange={ onChangeBody }
					style={ { textAlign: alignment } } />
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const {
			title,
			body,
			alignment,
			titleColor,
			backgroundImage,
			overlayColor,
			overlayOpacity,
		} = attributes;

		return (
			<div className="jumbotron jumbotron-fluid" style={ {
				backgroundImage: `url(${ backgroundImage })`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			} }>
				<div className="cta-overlay" style={ { background: overlayColor, opacity: overlayOpacity } }></div>
				<h2 style={ { color: titleColor, textAlign: alignment } }>{ title }</h2>
				<RichText.Content tagName="p"
					value={ body }
					style={ { textAlign: alignment } } />
				<InnerBlocks.Content />
			</div>
		);
	},
} );
