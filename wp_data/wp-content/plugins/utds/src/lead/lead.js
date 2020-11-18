const { registerBlockType } = wp.blocks;
const { InspectorControls, ColorPalette, RichText } = wp.editor;
const { Button, PanelBody, RadioControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/paragraph' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'lead/main', {
	title: 'Lead',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 1h24v2h-24v-2zm0 6h24v-2h-24v2zm0 7h24v-4h-24v4zm0 5h24v-2h-24v2zm0 4h24v-2h-24v2z"/></svg>,
	category: 'utdesign_system',
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
				formattingControls={ [] }
			/>
		);
	},
				  
	save: ( { className, attributes } ) => {
		return <RichText.Content tagName="p" className="lead" value={ attributes.content } />;
	},

} );


