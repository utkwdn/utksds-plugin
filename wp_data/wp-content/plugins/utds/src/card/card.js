const { registerBlockType } = wp.blocks;
const { InnerBlocks } = wp.editor;
const ALLOWED_BLOCKS = [ 'core/button', 'core/column', 'core/columns', 'core/separator', 'core/paragraph', 'core/heading', 'core/cover', 'core/image' ];

import './style.scss';
import './editor.scss';

registerBlockType( 'card/main', {
	title: 'Card',
	icon: 'heart',
	category: 'utdesign_system',
	description: '',
	attributes: {},

	edit: ( { attributes } ) => {
		const {} = attributes;

		return ( [
			// eslint-disable-next-line react/jsx-key
			<div className="card card-edit">
				<div className="card-body">
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
				</div>
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const {} = attributes;

		return (
			<div className="card">
				<div className="card-body">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
