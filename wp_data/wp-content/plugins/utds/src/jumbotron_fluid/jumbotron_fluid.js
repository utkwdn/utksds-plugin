const { RichText, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

import './style.scss';
import './editor.scss';

registerBlockType( 'jumbotron-fluid/main', {
	title: 'Jumbotron-fluid',
	icon: 'editor-contract',
	category: 'utdesign_system',
	attributes: {
		header: {
			type: 'string',
			selector: '.display-4',
		},
		lead: {
			type: 'array',
			source: 'children',
			selector: '.lead',
		},
		subtext: {
			type: 'array',
			source: 'children',
			selector: '.subtext',
		},
		buttonhref: {
			type: 'string',
			selector: '.btn',
		},
		buttontext: {
			type: 'string',
		},
	},
	edit( { attributes, setAttributes } ) {
		return (
			<div className="jumbotron-fluid-edit">
				<PlainText
					onChange={ content => setAttributes( { header: content } ) }
					value={ attributes.header }
					placeholder="Header text"
				/>
				<RichText
					onChange={ content => setAttributes( { lead: content } ) }
					value={ attributes.lead }
					placeholder="Your lead text"
					formattingControls={ [ 'bold', 'italic', 'underline' ] }
				/>
				<RichText
					onChange={ content => setAttributes( { subtext: content } ) }
					value={ attributes.subtext }
					placeholder="Your sub/main text"
					formattingControls={ [ 'bold', 'italic', 'underline' ] }
				/>
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
			<div className="jumbotron-fluid">
				<h1 className="display-4">{ attributes.header }</h1>
				<p className="lead">{ attributes.lead }</p>
				<hr className="my-4" />
				<p className="subtext">{ attributes.subtext }</p>
				<a className="btn btn-primary btn-lg" href={ attributes.buttonhref } role="button">{ attributes.buttontext }</a>
			</div>
		);
	},
} );
