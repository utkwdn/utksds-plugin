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
import { InnerBlocks, useBlockProps, __experimentalBlockVariationPicker } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utksds/button', 'utksds/buttongroup', 'core/paragraph', 'card/heading', 'core/list', 'core/quote', 'utksds/lead', 'utksds/horizontal-rule' ];

const HEADING_TEMPLATE = [
	[ 'core/heading', { className: 'card-title' } ],
];

const TOP_CAP_TEMPLATE = [
	[ 'core/image', { className: 'card-img-top' } ],
];

const IMAGE_TEMPLATE = [
	[ 'core/image', { className: 'card-img' } ],
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

	if( context['columns/blockName'] == 'utksds/columns' ){
		var columns_blocks = [ 'card/body', 'card/image', 'card/overlay', 'card/topcap', ];
	}else{
		var columns_blocks = [ 'card/body', 'card/image', 'utksds/columns', 'card/overlay', 'card/topcap', ];
	}


	return (
		<InnerBlocks allowedBlocks={ columns_blocks } placeholder={ 'Choose an image, body, or other card component to place here.' } templateLock={ false } renderAppender={ () => ( <div className="d-none"></div> ) } />
	);
}
