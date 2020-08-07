const { PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

// Import our CSS files
import './style.scss';
import './editor.scss';

registerBlockType( 'button/main', {
	title: 'button',
	icon: 'palmtree',
	category: 'utdesign_system',
	attributes: {
		buttonhref: {
			type: 'url',
			source: 'text',
		},
		buttontext: {
			source: 'text',
		},
	},
	// eslint-disable-next-line no-unused-vars
	edit( { attributes, setAttributes } ) {
		return (
			<div className="button_container">
				<PlainText
					onChange={ content => setAttributes( { buttonhref: content } ) }
					value={ attributes.buttonhref }
					placeholder="button href - prepend http:// manually for now"
				/>
				<PlainText
					onChange={ content => setAttributes( { buttontext: content } ) }
					value={ attributes.buttontext }
					placeholder="button text"
				/>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="button_container">
				<a className="btn btn-primary" href={ attributes.buttonhref } role="button">{ attributes.buttontext }</a>
			</div>
		);
	},
} );
