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
import { InnerBlocks } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( props ) {
	const { attributes } = props;

	let match = attributes.phoneNum.match(/^(\d{3})(\d{3})(\d{4})$/);
	let formattedPhone = match[1] + '-' + match[2] + '-' + match[3];

	return (
		<small className={ "phoneNumber " + attributes.className }>
				<RichText.Content
					tagName="span"
					value={ attributes.phoneName }
				/>:&nbsp;
			
				<a
					className={ 'text-white tel' }
					href={ 'tel:' + attributes.phoneNum }
					target={ attributes.linkTarget }
				>
					{ formattedPhone }
				</a>
			</small>
	);
}
