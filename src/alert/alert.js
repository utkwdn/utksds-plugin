import { siteColors, textColors } from '../globals.js'

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, getColorObjectByColorValue, RichText } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, RadioControl } = wp.components;
const { withState } = wp.compose;
const ALLOWED_BLOCKS = [ 'core/paragraph' ];

/*
const alertImgPosition = withState( {
	option: 'alert-img-top',
} )( ( { option, setState } ) => (
	<RadioControl
		label="Image Position"
		help="The placement of the image on the alert."
		selected={ option }
		options={ [
			{ label: 'Top', value: 'alert-img-top' },
			{ label: 'Bottom', value: 'alert-img-bottom' },
		] }
		onChange={ ( option ) => { setState( { option } ) } }
	/>
) );
*/

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';





registerBlockType( 'alert/main', {
	title: 'Alert',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-exclamation-triangle" viewBox="0 0 16 16">
  <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z"/><path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z"/></svg>,
  category: 'design',
	supports: {
		html: false,
	},
	attributes: {
		imagePostion: {
			type: 'object',
			default: { name: 'Smokey', slug: 'alert-smokey', color: '#58595B', text: 'text-white'}
		},
		text: {
			type: 'string',
			source: 'html',
			selector: 'span'
		},
		placeholder: {
			type: 'string',
			default: 'Enter alert text here.',
		},
	},

	edit: ( { attributes, setAttributes } ) => {
		const { imagePostion } = attributes;

		return ( [
			<InspectorControls>
				<PanelBody title='Style'>
				<PanelRow>
						<ColorPalette
							colors = { siteColors }
							value={ attributes.imagePostion.color }
							onChange={ ( value ) =>{
								var thisColor = getColorObjectByColorValue( siteColors, value );
								thisColor.slug = thisColor.slug.replace("bg-", "alert-");
								setAttributes( { imagePostion:thisColor } );
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
		  	<div className={ 'alert ' + imagePostion.slug }>
				<RichText
					tagName='span'
					placeholder={ attributes.placeholder }
					value={ attributes.text }
					allowedFormats={ [ 'core/bold', 'core/italic' ] }
					onChange={ ( value ) => setAttributes( { text: value } ) }
					withoutInteractiveFormatting
				/>
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { imagePostion } = attributes;

		return (
			<div className={ 'alert ' + imagePostion.slug }>
				<RichText.Content
					tagName="span"
					value={ attributes.text }
				/>
			</div>
		);
	},

} );
