const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading', 'core/cover', 'core/image' ];

import './style.scss';
import './editor.scss';

registerBlockType( 'card/main', {
	title: 'Card',
	icon: 'heart',
	category: 'utdesign_system',
	description: '',
	attributes: {
		backgroundColor: {
			type: 'string',
			default: 'gray',
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
			// eslint-disable-next-line react/jsx-key
			<div className="card card-edit" style={ { background: backgroundColor } }>
				<div className="card-body">
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className="card">
				<div className="card-body" style={ { background: backgroundColor } }>
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
