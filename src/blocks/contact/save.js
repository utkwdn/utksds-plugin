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

	return (
		<div className="contact_info">
				{ attributes.url !== undefined && (
				<div className="address col-auto">
				<svg class="meta-address" fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"></path></svg>
				<a
					className={ 'text-white map-link' }
					href={ attributes.url }
					target={ attributes.linkTarget }
				>
					<RichText.Content
						tagName="span"
						value={ attributes.address }
					/>
				</a>
				</div>
				) }
				{ attributes.url === undefined && (
				<div className="address col-auto">
				<RichText.Content
					tagName="span"
					value={ attributes.address }
				/>
				</div>
				) }
				{ attributes.email !== undefined && (
				<small className="emailList">Email:&nbsp; 
				<a
					className={ 'email text-white text-reset' }
					href={ 'mailto:' + attributes.email }
					target={ attributes.linkTarget }
				>
					<RichText.Content
						tagName="span"
						value={ attributes.email }
					/>
				</a>
				</small>
				) }
				<InnerBlocks.Content />
			</div>
	);
}
