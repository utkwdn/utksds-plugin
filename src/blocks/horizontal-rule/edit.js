import { PanelBody, RadioControl } from '@wordpress/components';

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
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

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

	  const { imagePostion } = attributes;

	  function onImagePositionChange( newValue ) {
		setAttributes( { imagePostion: newValue } );
	}

		return ( [
			<InspectorControls>
				<PanelBody title='Style'>
				<RadioControl
      		label="Color"
//      		help="The separator (horizontal rule) style."
      		selected={ imagePostion }
      		options={ [
      			{ label: 'Standard', value: 'hr' },
      			{ label: 'Orange Hash', value: 'orange-separator' },
      			{ label: 'Big Orange', value: 'orange-hash' },
      		] }
      		onChange={ onImagePositionChange }
      	/>
				</PanelBody>
			</InspectorControls>,
		  <hr className={ imagePostion } { ...blockProps } />
			,
		] );
}
