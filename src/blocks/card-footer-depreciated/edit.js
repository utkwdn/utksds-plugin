import { PanelBody, PanelRow } from '@wordpress/components';

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
import { RichText, InspectorControls, useBlockProps, ToggleControl } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const ALLOWED_BLOCKS = [ 'utksds/button', 'utksds/buttongroup', 'core/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ];

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
export default function Edit( props ) {
	const {
		attributes,
		setAttributes
	  } = props;

	  const blockProps = useBlockProps();

		return ( [
			<InspectorControls>
				<PanelBody title='Card Footer' initialOpen={ true }>
					<PanelRow>
						<ToggleControl
							label='Muted Text'
							help={ attributes.muted ? 'Text is muted.' : 'Button is not muted.' }
							checked={ attributes.muted }
							onChange={ () => {
								setAttributes( { muted: !attributes.muted } );

								if( !attributes.muted === true ){
									setAttributes( { mutedClass:'text-muted' } );
								}else{
									setAttributes( { mutedClass:'' } );
								}
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div { ...blockProps }>
			<RichText
				tagName='div'
				className={ 'card-footer ' + attributes.mutedClass }
				placeholder='Type footer here'
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				withoutInteractiveFormatting
			/>
			</div>
		] );
}
