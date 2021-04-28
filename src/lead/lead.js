const { registerBlockType } = wp.blocks;
const { InspectorControls, ColorPalette, RichText } = wp.editor;
const { Button, PanelBody, RadioControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/paragraph' ];

import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'lead/main', {
	title: 'Lead',
	icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M20 15h4.071v2h-4.071v4.071h-2v-4.071h-4.071v-2h4.071v-4.071h2v4.071zm-8 6h-12v-2h12v2zm0-4.024h-12v-2h12v2zm0-3.976h-12v-2h12v2zm12-4h-24v-2h24v2zm0-4h-24v-2h24v2z"/></svg>,
	category: 'text',
	description: 'Provide contextual feedback messages for typical user actions with the handful of available and flexible lead messages.',
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '',
		},
//    content: {
//        type: 'string',
//        source: 'text',
//        selector: 'p',
//    },
	},
	supports: {
    anchor: true,
    align: true
  },
	
	edit: ( { className, attributes, setAttributes } ) => {
		return(
			<RichText 
				tagName='p'
				className={ className, 'lead' }
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				withoutInteractiveFormatting
			/>
		);
	},
				  
	save: ( { className, attributes } ) => {
		return <RichText.Content tagName="p" className="lead" value={ attributes.content } />;
	},

} );


