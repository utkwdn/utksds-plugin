import { PanelBody, PanelRow, RadioControl, ToggleControl } from '@wordpress/components';

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
import { InnerBlocks, InspectorControls } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const BUTTON_TEMPLATE = [
    [ 'utksds/button' ],
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
	const { attributes, setAttributes } = props;

	if(attributes.iconCode.name !== ''){
		var iconResults = AllIcons.find(obj => {
			return obj.name === attributes.iconCode.name;
		} );

		attributes.useIcon = false;
	}else{
		var iconResults = { name:'', string:'', code:null };
	}

		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ 'Orientation' } initialOpen={ true }>
					<PanelRow>
						<ToggleControl
							label='Button Group Direction'
							help={ attributes.orientationSetting ? 'Vertical.' : 'Horizontal.' }
							checked={ attributes.orientationSetting }
							onChange={ () => {
								setAttributes( { orientationSetting: !attributes.orientationSetting } );
								//console.log(attributes.buttonOutline);

								if( !attributes.orientationSetting === true ){
									setAttributes( { orientation: 'btn-group-vertical' } );
								}else{
									setAttributes( { orientation: 'btn-group' } );;
								}

								//console.log(attributes.buttonColor);
							} }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title='Size' initialOpen={ true }>
					<PanelRow>
						<p><strong>Select a Group size:</strong></p>
					</PanelRow>
					<PanelRow>
						<RadioControl
							help="The size of the group."
							selected={ attributes.groupSize }
							options={ [
            					{ label: 'Small', value: ' btn-group-sm' },
            					{ label: 'Normal', value: ' btn-group-nrml' },
								{ label: 'Large', value: ' btn-group-lg' },
        					] }
							onChange={ ( value ) =>{
								setAttributes( { groupSize: value } );
								//console.log(value);
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className={ attributes.orientation + attributes.groupSize } role='group'>
				<InnerBlocks template={ BUTTON_TEMPLATE } allowedBlocks={ [ 'utksds/button' ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
}
