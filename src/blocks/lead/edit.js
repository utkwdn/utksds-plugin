//import { PanelBody, RadioControl } from '@wordpress/components';

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
import { useBlockProps, AlignmentControl, BlockControls, RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'core/paragraph' ];

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const {
		attributes,
    	setAttributes
	  } = useBlockProps;

		return ( [
			<BlockControls group="block">
				<AlignmentControl
					value={ attributes.align }
					onChange={ ( newAlign ) =>
						setAttributes( { align: newAlign } )
					}
				/>
			</BlockControls>,
			<RichText 
				tagName='p'
				placeholder='Lead text goes here.'
				className={ 'lead has-text-align-' + attributes.align }
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				withoutInteractiveFormatting
			/>
		] );
}
