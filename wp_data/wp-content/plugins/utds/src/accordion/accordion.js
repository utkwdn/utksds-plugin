/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-key */
/* eslint-disable eqeqeq */
/* eslint-disable linebreak-style */
import './style.scss';
import './editor.scss';
const __ = wp.i18n.__;
const registerBlockType = wp.blocks.registerBlockType;
const { RichText, PlainText } = wp.editor;

registerBlockType( 'accordion/main', {
	title: __( 'Accordion' ),
	icon: 'format-quote',
	category: 'utdesign_system',
	keywords: [ __( 'Accordion' ) ],

	attributes: {
		id: {
			source: 'attribute',
			selector: 'div.accordion-container',
			attribute: 'id',
		},
		accordions: {
			source: 'query',
			default: [],
			selector: '.accordion',
			query: {

				index: {
					source: 'text',
					selector: 'span.accordion-index',
				},
				content: {
					source: 'text',
					selector: 'div.accordion-panel div',
				},
				title: {
					source: 'text',
					selector: 'span.accordion-title',
				},
			},
		},
	},

	edit: ( props ) => {
		const { accordions } = props.attributes;

		if ( ! props.attributes.id ) {
			const id = `accordion${ Math.floor( Math.random() * 100 ) }`;
			props.setAttributes( {
				id,
			} );
		}

		const accordionsList = accordions
			.sort( ( a, b ) => a.index - b.index )
			.map( ( accordion ) => {
				return (
					<div className="accordion">
						<div className="accordion-item">
							{ /* <label>Content:</label> */ }
							<div className="accordion__heading">
								<button
									aria-expanded="false"
									className="accordion-trigger"
									aria-controls={ 'sect' + accordion.index }
									id={ 'accordion' + accordion.index + 'id' }>

									<PlainText
										className="title-plain-text"
										placeholder="Accordion title..."
										value={ accordion.title }
										onChange={ ( title ) => {
											const newObject = Object.assign( {}, accordion, {
												title: title,
											} );
											props.setAttributes( {
												accordions: [
													...accordions.filter(
														( item ) => item.index != accordion.index
													),
													newObject,
												],
											} );
										} }
									/>
									<span className="accordion-icon"></span>

								</button>
							</div>
							<div id={ 'sect' + accordion.index }
								role="region"
								aria-labelledby={ 'accordion' + accordion.index + 'id' }
								className="accordion-panel">
								<RichText
									className="content-plain-text"
									style={ { height: 58 } }
									placeholder="Accordion content..."
									value={ accordion.content }
									onChange={ ( content ) => {
										const newObject = Object.assign( {}, accordion, {
											content: content,
										} );
										props.setAttributes( {
											accordions: [
												...accordions.filter(
													( item ) => item.index != accordion.index
												),
												newObject,
											],
										} );
									} }
								/>
							</div>

						</div>
						<div className="rf-blocks-library--button-container--inner">
							<button
								className="remove-accordion"
								onClick={ () => {
									const newaccordions = accordions
										.filter( ( item ) => item.index != accordion.index )
										.map( ( t ) => {
											if ( t.index > accordion.index ) {
												t.index -= 1;
											}

											return t;
										} );

									props.setAttributes( {
										accordions: newaccordions,
									} );
								} }
							>
								<span className="dashicons dashicons-remove"></span>Remove accordion
							</button>
						</div>
					</div>
				);
			} );
		return (
			<div className={ props.className }>
				{ accordionsList }
				<div className="rf-blocks-library--button-container">
					<button
						className="add-more-accordion"
						onClick={ ( content ) =>
							props.setAttributes( {
								accordions: [
									...props.attributes.accordions,
									{
										index: props.attributes.accordions.length,
										content: '',
										title: '',
									},
								],
							} )
						}
					>
						<span className="dashicons dashicons-insert"></span> Add accordion
					</button>
				</div>
			</div>
		);
	},

	save: ( props ) => {
		const { id, accordions } = props.attributes;

		const accordionsList = accordions.map( function( accordion ) {
			return (
				<div className="accordion">
					<span className="accordion-index" style={ { display: 'none' } }>
						{ accordion.index }
					</span>
					<div className="accordion__heading">
						<button aria-expanded="false" className="accordion-trigger" data-toggle="collapse"
							aria-controls={ 'sect' + id + accordion.index }
							href={ '#accordion' + id + accordion.index }>
							{ accordion.title && (
								<span className="accordion-title accordion__title">
									{ accordion.title }
									<span className="accordion-icon"></span>
								</span>
							) }
						</button>
					</div>
					{ accordion.content && (
						<div id={ 'accordion' + id + accordion.index }
							role="region"
							aria-labelledby={ 'accordion' + id + accordion.index + 'id' }
							className="accordion-panel collapse">
							<div>
								{ accordion.content }
							</div>
						</div>
					) }
				</div>
			);
		} );
		if ( accordions.length > 0 ) {
			return (
				<div className="accordion-container" id={ id } data-allow-toggle data-allow-multiple>
					{ accordionsList }
				</div>

			);
		} return null;
	},
} );
