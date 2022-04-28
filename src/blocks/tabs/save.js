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
import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

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

	var listItems = [];
		if(Array.isArray(attributes.tabNames) && attributes.tabNames.length){
			for(var thisTab of attributes.tabNames){
				listItems.push(<li class="nav-item" role="presentation">
    				<button className={ "nav-link " + thisTab.tabActive } id={ thisTab.tabSlug + "-tab" } data-bs-toggle="tab" data-bs-target={ "#" + thisTab.tabSlug } type="button" role="tab" aria-controls={ thisTab.tabSlug } aria-selected="true">{ thisTab.tabName }</button>
  				</li>);
			}
		}

	return (
		<div>
			<ul className={ "nav nav-tabs" } id={ attributes.tabID } role="tablist">
				{ listItems }
			</ul>
			<div class="tab-content" id="myTabContent">
				<InnerBlocks.Content />
			</div>
			</div>
	);
}
