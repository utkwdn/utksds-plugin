const { registerBlockType } = wp.blocks;
const { MediaUpload, MediaUploadCheck, InnerBlocks, InspectorControls, ColorPalette, RichText } = wp.blockEditor;
const { Button, ResponsiveWrapper, PanelBody, PanelRow, RangeControl, RadioControl } = wp.components;
const { withState } = wp.compose;
const ALLOWED_BLOCKS = [  'utksds/button', 'core/separator', 'core/paragraph', 'core/heading', 'utksds/columns' ];

/*
const alertImgPosition = withState( {
	option: 'alert-img-top',
} )( ( { option, setState } ) => (
	<RadioControl
		label="Image Position"
		help="The placement of the image on the alert."
		selected={ option }
		options={ [
			{ label: 'Top', value: 'alert-img-top' },
			{ label: 'Bottom', value: 'alert-img-bottom' },
		] }
		onChange={ ( option ) => { setState( { option } ) } }
	/>
) );
*/

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'strip/main', {
	title: 'Content Strip',
	icon:<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 8h24v16h-24v-16zm0-8v6h24v-6h-24z"/></svg>,
  category: 'utdesign_layout',
	supports: {
		html: false,
	},
	attributes: {
		imagePostion: {
			type: 'string',
			default: 'strip strip-gray1',
		},
		spacing: {
			type: 'integer',
			default: 0,
		},
		padding:{
			type: 'string',
			default: 'py-0',
		},
		bgImage:{
			type: 'object',
		},
	},
	edit: ( { attributes, setAttributes } ) => {
		const { imagePostion } = attributes;

		function onImagePositionChange( newValue ) {
			setAttributes( { imagePostion: newValue } );
		}

		const onRemoveImage = () => {
            setAttributes( { bgImage: undefined, } );
        };

		return ( [
			<InspectorControls>
				<PanelBody title='Style'>
				<PanelRow>
				<RangeControl
					label="Spacing"
						value={ attributes.spacing }
        				onChange={ ( value ) =>{ setAttributes( {spacing:value} ); } }
						min={ 0 }
						max={ 5 }
				/>
				</PanelRow>
				{ attributes.bgImage === undefined &&
				<PanelRow>
				<RadioControl
      				label="Background"
      				help="Choose a background."
      				selected={ imagePostion }
      				options={ [
      					{ label: 'White', value: 'strip strip-white' },
      					{ label: 'Light Gray', value: 'strip strip-gray1' },
      					{ label: 'Smokey', value: 'strip strip-smokey text-white' },
      					//{ label: 'Pattern', value: 'strip strip-pattern text-white' },
      					{ label: 'Seal', value: 'strip strip-seal' },
      					//{ label: 'Ayres', value: 'strip strip-ayres text-white' },
      					//{ label: 'Library', value: 'strip strip-library' },
      					{ label: 'Mountains', value: 'strip strip-smokies text-white' },
      					//{ label: 'Gingham', value: 'strip strip-gingham' },
      					//{ label: 'Rain', value: 'strip strip-rain' },
      				] }
      				onChange={ onImagePositionChange }
      			/>
				</PanelRow>
				}
				<PanelRow>
				<MediaUploadCheck>
					<MediaUpload
						onSelect={ ( media ) =>{
							setAttributes( {bgImage: media} );

							console.log(media);
						} }
						allowedTypes={ [ 'image' ] }
						value={ attributes.bgImage }
						render={ ( { open } ) => (
							<Button
								className={ ! attributes.bgImage ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
								onClick={ open }>
								{ attributes.bgImage === undefined && ( 'Select a Background Image' ) }
								{ attributes.bgImage && (
									<ResponsiveWrapper
                                    	naturalWidth={ attributes.bgImage.width }
                                        naturalHeight={ attributes.bgImage.height }
                                    >
										<img src={ attributes.bgImage.url } alt={ attributes.bgImage.alt } style={ { "maxHeight":attributes.bgImage.height, "maxWidth":attributes.bgImage.width } } />
                                    </ResponsiveWrapper>
								) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
				</PanelRow>
				{ attributes.bgImage &&
				<PanelRow>
                <MediaUploadCheck>
                	<MediaUpload
                    	onSelect={ ( media ) =>{
							setAttributes( {bgImage: media} );
						} }
                        allowedTypes={ [ 'image' ] }
                        value={ attributes.bgImage }
                        render={ ( { open } ) => (
                        	<Button onClick={ open } isDefault isLarge>Replace background image</Button>
                        ) }
                    />
                </MediaUploadCheck>
				</PanelRow>
                }
                { attributes.bgImage &&
				<PanelRow>
                <MediaUploadCheck>
                	<Button onClick={ onRemoveImage } isLink isDestructive>Remove background image</Button>
               	</MediaUploadCheck>
				</PanelRow>
                }
				<PanelRow>
				<RadioControl
      				label="Padding"
      				help="Choose the amount of vertical padding."
      				selected={ attributes.padding }
      				options={ [
      					{ label: 'No Padding', value: 'py-0' },
      					{ label: 'Small', value: 'p-sm' },
      					{ label: 'Medium', value: 'p-md' },
      					{ label: 'Large', value: 'p-lg' },
      					{ label: 'No Bottom Padding', value: 'pb-0' },
      					{ label: 'No Top Padding', value: 'pt-0' },
      				] }
      				onChange={ ( value ) =>{ setAttributes( {padding:value} ); } }
      			/>
				</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div>
			{ attributes.bgImage === undefined && (
		  	<div className={ imagePostion + " " + attributes.padding + " my-" + attributes.spacing } >
				<InnerBlocks templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
			) }
			{ attributes.bgImage &&
		  	<div className={ "strip " + attributes.padding + " my-" + attributes.spacing } style={{ backgroundImage: `url(${attributes.bgImage.url})` }}>
				<InnerBlocks templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
			}
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { imagePostion } = attributes;

		return (
			<div>
			{ attributes.bgImage === undefined && (
			<div className={ imagePostion + " " + attributes.padding + " my-" + attributes.spacing } >
			  <div className="container">
				<InnerBlocks.Content />
				</div>
			</div>
			) }
			{ attributes.bgImage && (
		  	<div className={ "strip " + attributes.padding + " my-" + attributes.spacing } style={{ backgroundImage: `url(${attributes.bgImage.url})` }}>
				<div className="container">
				<InnerBlocks.Content />
				</div>
			</div>
			) }
			</div>
		);
	},

} );
