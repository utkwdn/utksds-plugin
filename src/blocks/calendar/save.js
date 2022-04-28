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
//import { RichText } from '@wordpress/block-editor';

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
		<div>
			<div id="localist-widget-12345" className="localist-widget"></div>
			<script defer type="text/javascript"
src={"https://calendar.utk.edu/widget/" + attributes.widgetType + "?schools=utk&venues=" + attributes.place + "&departments=" +  attributes.department  + "&groups=" + attributes.group + "&types=" + attributes.all_types + "&days=" + attributes.daysAhead + "&num=" + attributes.numResults + "&tags=" + attributes.keywords + attributes.featuredS + attributes.sponsoredS + attributes.matchingS + attributes.pastS + attributes.hideDescS + attributes.truncateS + attributes.htmlDescS + attributes.evImageS + attributes.evTimeS + attributes.viewAllS + attributes.newWinS + attributes.hideDropS + "&match=" + attributes.mustMatch + "&exclude_types=" + attributes.exAll_types + "&container=localist-widget-12345" + attributes.incStyleS + "&template=" + attributes.template}></script>
			</div>
	);
}
