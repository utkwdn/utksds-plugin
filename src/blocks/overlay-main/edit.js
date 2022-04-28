import { PanelBody, PanelRow, RangeControl } from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { createBlocksFromInnerBlocksTemplate } from '@wordpress/blocks';
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
import { useBlockProps, InnerBlocks, InspectorControls, ColorPalette, getColorObjectByColorValue, MediaPlaceholder, BlockIcon, store as blockEditorStore } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utksds/button', 'core/paragraph', 'utksds/card-heading', 'core/list', 'core/quote', 'utksds/lead', 'utksds/horizontal-rule' ];

const OVERLAY_TEMPLATE = [
    [ 'utksds/overlay-main', {}, [
		[ 'utksds/card-heading' ],
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
export default function Edit() {
	const {
		context
	  } = useBlockProps;

		return ( [
			<div className={ "card-img-overlay" }>
				<InnerBlocks allowedBlocks={ [ 'card/heading', 'core/paragraph', 'utksds/button', 'lead/main' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } /></div>
		] );
}
