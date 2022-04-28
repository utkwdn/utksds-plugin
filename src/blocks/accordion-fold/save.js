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
import { InnerBlocks, RichText } from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save() {
	const { attributes } = useBlockProps;

	return (
		<div className="accordion-item">
      				<h2 className="accordion-header" id={ "heading" + attributes.foldSlug }>
						<RichText.Content
							tagName='button'
							className={ "accordion-button" + attributes.collapseS }
							type='button'
							data-bs-toggle='collapse'
							data-bs-target={ "#collapse" + attributes.foldSlug }
							aria-expanded={ attributes.show }
							aria-controls={ "collapse" + attributes.foldSlug }
							value={ attributes.foldName }
						/>
      				</h2>
    			<div id={ "collapse" + attributes.foldSlug } className={ "accordion-collapse collapse" + attributes.showS } aria-labelledby={ "heading" + attributes.foldSlug } data-bs-paren={ "#" + attributes.parentID }>
      				<div className="accordion-body">
        				<InnerBlocks.Content />
      				</div>
    			</div>
  			</div>
	);
}
