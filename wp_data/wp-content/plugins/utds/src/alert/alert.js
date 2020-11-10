const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { Button, PanelBody, RadioControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading', 'core/cover', 'core/image' ];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'alert/main', {
	title: 'Alert',
	icon: 'welcome-view-site',
	category: 'utdesign_system',
	description: 'Provide contextual feedback messages for typical user actions with the handful of available and flexible alert messages.',
	attributes: {
		backgroundColor: {
			type: 'string',
			default: '',
		},
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
			<div className="alert-edit alert" style={ { background: backgroundColor } }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className="alert" style={ { background: backgroundColor } }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );


