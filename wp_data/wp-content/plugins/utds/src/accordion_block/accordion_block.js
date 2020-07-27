const { RichText, PlainText } = wp.editor;
const { registerBlockType } = wp.blocks;

// Import our CSS files
import './style.scss';
import './editor.scss';

registerBlockType( 'accordion-block/main', {
	title: 'Accordion',
	icon: 'palmtree',
	category: 'common',
	attributes: {
		title: {
			source: 'text',
			selector: '.card__title',
		},
		body: {
			type: 'array',
			source: 'children',
			selector: '.card__body',
		},
	},
	// eslint-disable-next-line no-unused-vars
	edit( { attributes, className, setAttributes } ) {
		return (
			<div className="container">
				<PlainText
					onChange={ content => setAttributes( { title: content } ) }
					value={ attributes.title }
					placeholder="Your card title"
					className="heading"
				/>
				<RichText
					onChange={ content => setAttributes( { body: content } ) }
					value={ attributes.body }
					multiline="p"
					placeholder="Your card text"
					formattingControls={ [ 'bold', 'italic', 'underline' ] }
					isSelected={ attributes.isSelected }
				/>
			</div>
		);
	},

	save( { attributes } ) {
		return (
			<div className="accordion" id="accordionExample">
				<div className="card">
					<div className="card-header" id="headingOne">
						<h2 className="mb-0">
							<button className="btn btn-link card__title" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
								{ attributes.title }
							</button>
						</h2>
					</div>

					<div id="collapseOne" className="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
						<div className="card-body card__body">
							{ attributes.body }
						</div>
					</div>
				</div>
			</div>
		);
	},
} );
