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

const ALLOWED_BLOCKS = [ 'utksds/button', 'utksds/buttongroup', 'core/paragraph', 'card/heading', 'core/list', 'core/quote', 'utksds/lead', 'utksds/horizontal-rule' ];

const CONTACT_TEMPLATE = [
	[ 'utksds/phones', {} ],
	[ 'utksds/socials', {} ],
];

const PHONE_TEMPLATE = [
	[ 'utksds/phone', {} ],
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
	  } = props;

		return ( [
			<small className="phoneNumber">
				<RichText 
					tagName='span'
					placeholder='Enter phone name'
					value={ attributes.phoneName }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { phoneName: value } ) }
					withoutInteractiveFormatting
				/>:&nbsp;
				<RichText 
					tagName='span'
					placeholder='Enter phone number'
					value={ attributes.phoneNum }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => {
						let newPhone = value.replace(/\D/g, '');
						setAttributes( { phoneNum: newPhone } );
					} }
					withoutInteractiveFormatting
				/>
			</small>
		] );
}
