import { Button, PanelBody, RangeControl, __experimentalText as Text } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';

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
import { useBlockProps, MediaUpload, BlockIcon, MediaPlaceholder, InnerBlocks, InspectorControls, ColorPalette, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utksds/button', 'utksds/horizontal-rule', 'core/paragraph', 'core/heading' ];

const MEDIA_TEMPLATE = [
	[ 'utksds/media-content', {}, [
    	[ 'core/paragraph' ],
	] ],
];

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
    	setAttributes,
		clientId
	  } = props;

	  const blockProps = useBlockProps();

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
			<div className="media" { ...blockProps }>
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
}
