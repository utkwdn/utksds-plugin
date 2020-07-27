const { RichText, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

// Import our CSS files
import './style.scss';
import './editor.scss';

registerBlockType( 'jumbotron/main', {
	title: 'Jumbotron',
	icon: 'editor-contract',
	category: 'common',
	attributes: {
		header: {
			source: 'text',
			selector: '.jt_header',
		},
		lead: {
			type: 'array',
			source: 'children',
			selector: '.jt_lead',
		},
		subtext: {
			type: 'array',
			source: 'children',
			selector: '.jt_subtext',
		},
		buttonhref: {
			source: 'text',
			selector: '.jt_btn',
		},
		buttontext: {
			source: 'text',
			selector: '.jt_btn',
		},
	},
	// eslint-disable-next-line no-unused-vars
	edit( { attributes, className, setAttributes } ) {
		return (
			<div className="container">
				<PlainText
					onChange={ content => setAttributes( { header: content } ) }
					value={ attributes.header }
					placeholder="Header text"
					className="heading"
				/>
				<RichText
					onChange={ content => setAttributes( { lead: content } ) }
					value={ attributes.lead }
					multiline="p"
					placeholder="Your lead text"
					formattingControls={ [ 'bold', 'italic', 'underline' ] }
					isSelected={ attributes.isSelected }
				/>
				<RichText
					onChange={ content => setAttributes( { subtext: content } ) }
					value={ attributes.subtext }
					multiline="p"
					placeholder="Your sub/main text"
					formattingControls={ [ 'bold', 'italic', 'underline' ] }
					isSelected={ attributes.isSelected }
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
			<div class="jumbotron">
				<h1 class="display-4">{ attributes.header }</h1>
				<p class="lead jt_lead">{ attributes.lead }</p>
				<hr class="my-4" />
				<p class="jt_subtext">{ attributes.subtext }</p>
				<a class="btn btn-primary btn-lg jt_btn" href={ attributes.buttonhref } role="button">{ attributes.buttontext }</a>
			</div>
		);
	},
} );
