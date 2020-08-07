const { PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;
const Fragment = wp.element.Fragment;

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
			<Fragment>
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
			</Fragment>
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
