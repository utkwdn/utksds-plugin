const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading', 'core/cover' ];

import './style.scss';
import './editor.scss';

registerBlockType( 'jumbotron/main', {
	title: 'Jumbotron',
	icon: 'editor-contract',
	category: 'utdesign_system',
	description: 'A jumbotron container which can hold a number of layout elements',
	attributes: {},

	edit: ( { attributes } ) => {
		const {} = attributes;

		return ( [
			// eslint-disable-next-line react/jsx-key
			<div className="jumbotron-edit jumbotron">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const {} = attributes;

		return (
			<div className="jumbotron">
				<InnerBlocks.Content />
			</div>
		);
	},
} );
