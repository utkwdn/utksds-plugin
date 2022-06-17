import { ToolbarButton, ToolbarGroup, Popover } from '@wordpress/components';
import { useState } from '@wordpress/element';

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
import { useBlockProps, InnerBlocks, RichText, __experimentalLinkControl, BlockControls  } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utkwds/button', 'core/paragraph', 'utkwds/card-heading', 'core/list', 'core/quote', 'utkwds/lead', 'utkwds/horizontal-rule', 'utksds/button', 'card/heading','lead/main', 'horizontal-rule/main' ];

const CONTACT_TEMPLATE = [
	[ 'utkwds/phones', {} ],
	[ 'utkwds/socials', {} ],
];

const PHONE_TEMPLATE = [
	[ 'utkwds/phone', {} ],
]

const SOCIAL_TEMPLATE = [
	[ 'core/social-links', {} ],
]

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
		isSelected,
	  } = props;

	  const blockProps = useBlockProps();

		return ( [
			<div { ...blockProps }>
			<div className="phoneNumbers col-auto">
			<InnerBlocks allowedBlocks={ [ 'utkwds/phone', 'utksds/phone' ] } template={ PHONE_TEMPLATE } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
			</div>
		] );
}
