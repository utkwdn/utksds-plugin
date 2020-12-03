//the following is an "example" block. It was originally intended to be a sort of 'primal' block, that would be copied and modified as needed. As it is now, it is mostly not useful, and serves as documentation more than anything.
const { registerBlockType } = wp.blocks;
//below, we are picking out the wordpress features that we want to use in our new block
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
//if the block is a container for other blocks, the types of block to allow are in the array below
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator' ];

//the base2, and Base strings below should be unique to each new block. The user will see the "title", but the base2/main, is used by the system to reference each block, so it must be unique
registerBlockType( 'base2/main', {
	title: 'Base',
	description: 'V2 Base, Color Picker, Accessibility, InnerBlock Support',
	icon: {
		background: '#d79213',
		foreground: '#fff',
		src: 'palmtree',
	},
	category: 'utdesign_system',

	// custom attributes
    // this is where we create properties for the new block. It is helpful to assign them names that reflect their purpose, for clarity and maintainability
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

    // the edit view reflects what a person *editing* a page will see. the editor.scss file is specific to this view as well.
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
			<div className="cta-container" style={ {
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
					placeholder="Your CTA Title"
					value={ title }
					onChange={ onChangeTitle }
					style={ { color: titleColor, textAlign: alignment } } />
				<RichText key="editable"
					tagName="p"
					placeholder="Your CTA Description"
					value={ body }
					onChange={ onChangeBody }
					style={ { textAlign: alignment } } />
                //<!--the element below enables blocks named in the array on line 15 to be placed within the block-->
                <InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},

    // save reflects what is ultimately shown on the front end of the site, once edits have been made. Occasionally, there may be errors related to disparities between the edit and save views. If this happens, refer to the js developer console in browser. Reconcile the differences reflected in the error return in order to resolve.
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
			<div className="cta-container" style={ {
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
                //<!--the element below enables blocks named in the array on line 15 to be displayed-->
				<InnerBlocks.Content />
			</div>
		);
	},
} );
