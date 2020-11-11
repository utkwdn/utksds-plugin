const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { Button, PanelBody, RadioControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/paragraph' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'lead/main', {
	title: 'Lead',
	icon: 'welcome-view-site',
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

	edit: ( { attributes, setAttributes } ) => {
		const { backgroundColor } = attributes;

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}

		return ( [
			// eslint-disable-next-line react/jsx-key
		    <InspectorControls style={ { marginBottom: '40px' } }>
					<PanelBody title={ 'Background Color Settings' }>
						<p><strong>Select a Background color:</strong></p>
						<ColorPalette value={ backgroundColor }
							onChange={ onBackgroundColorChange } />
					</PanelBody>
				</InspectorControls>,
			<p className="lead">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</p>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className="lead" style={ { background: backgroundColor } }>
				{ attributes.content }
			</div>

			
		);
	},
} );


