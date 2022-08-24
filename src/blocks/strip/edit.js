import { Button, ResponsiveWrapper, PanelBody, PanelRow, RangeControl, RadioControl } from '@wordpress/components';
import { siteColors } from '../../globals.js'
import { useState } from '@wordpress/element'

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

const ALLOWED_BLOCKS = [  'utkwds/button', 'core/separator', 'core/paragraph', 'core/heading', 'utkwds/columns', 'utksds/button', 'utksds/columns' ];

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

	  const blockProps = useBlockProps();

		const [image, setImage] = useState(undefined);

		const onRemoveImage = () => {
			setAttributes({ imageUrl: '' });
			setImage(undefined);
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
				{ image === undefined &&
				<PanelRow>
						<ColorPalette
							colors = { siteColors }
							value={ attributes.color }
							onChange={ ( value ) =>{
								const thisColor = getColorObjectByColorValue( siteColors, value );
								setAttributes({
									color: thisColor.color,
									colorSlug: thisColor.slug.replace("bg-", "strip-"),
									textColor: thisColor.text
								});
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
							setAttributes({ imageUrl: media.url });
							setImage(media);
							// console.log(media);
						} }
						allowedTypes={ [ 'image' ] }
						value={ image }
						render={ ( { open } ) => (
							<Button
								className={ ! image ? 'editor-post-featured-image__toggle' : 'editor-post-featured-image__preview' }
								onClick={ open }>
								{ image === undefined && ( 'Select a Background Image' ) }
								{ image && (
									<ResponsiveWrapper
                                    	naturalWidth={ image.width }
                                        naturalHeight={ image.height }
                                    >
										<img src={ image.url } alt={ image.alt } style={ { "maxHeight":image.height, "maxWidth":image.width } } />
                                    </ResponsiveWrapper>
								) }
							</Button>
						) }
					/>
				</MediaUploadCheck>
				</PanelRow>
				{ image &&
				<PanelRow>
                <MediaUploadCheck>
                	<MediaUpload
                    	onSelect={ ( media ) =>{
												setAttributes({ imageUrl: media.url });
												setImage(media)
						} }
                        allowedTypes={ [ 'image' ] }
                        value={ image }
                        render={ ( { open } ) => (
                        	<Button onClick={ open } isDefault isLarge>Replace background image</Button>
                        ) }
                    />
                </MediaUploadCheck>
				</PanelRow>
                }
                { image &&
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
			<div { ...blockProps }>
			{ image === undefined && (
		  	<div className={ "strip " + attributes.colorSlug + " " + attributes.textColor + " " + attributes.padding + " my-" + attributes.spacing } >
				<InnerBlocks templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
			) }
			{ image &&
		  	<div className={ "strip " + attributes.padding + " my-" + attributes.spacing } style={{ backgroundImage: `url(${attributes.imageUrl})` }}>
				<InnerBlocks templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
			}
			</div>,
		] );
}
