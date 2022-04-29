import { Button, ResponsiveWrapper, PanelBody, PanelRow, RangeControl, RadioControl } from '@wordpress/components';
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
import { useBlockProps, MediaUpload, MediaUploadCheck, InnerBlocks, InspectorControls, ColorPalette, getColorObjectByColorValue } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [  'utksds/button', 'core/separator', 'core/paragraph', 'core/heading', 'utksds/columns' ];

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
    	setAttributes
	  } = props;

	  const { imagePostion } = attributes;

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
						<ColorPalette
							colors = { siteColors }
							value={ attributes.imagePostion.color }
							onChange={ ( value ) =>{
								var thisColor = getColorObjectByColorValue( siteColors, value );
								thisColor.slug = thisColor.slug.replace("bg-", "strip-");
								setAttributes( { imagePostion:thisColor } );
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
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
		  	<div className={ "strip " + imagePostion.slug + " " + imagePostion.text + " " + attributes.padding + " my-" + attributes.spacing } >
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
}
