const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading', 'core/cover', 'core/image' ];

import './style.scss';
import './editor.scss';

registerBlockType( 'media-object/main', {
	title: 'Media Object',
	icon: 'welcome-view-site',
	category: 'utdesign_system',
	description: 'Horizontally oriented text and picture',
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
			// eslint-disable-next-line react/jsx-key
			<div className="media-edit media" style={ { background: backgroundColor } }>
				<div className="media-body">
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className="media" style={ { background: backgroundColor } }>
				<div className="media-body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
