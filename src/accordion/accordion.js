import './editor.scss';
import { Path, SVG } from '@wordpress/components';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl, ToggleControl } = wp.components;
const { cleanForSlug } = wp.url;

const ACCORDION_TEMPLATE = [
    [ 'accordion/fold' ],
];

registerBlockType( 'utksds/accordion', {
	title: 'Accordion',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>,
	category: 'design',

	attributes: {
		accordionID: {
			type: 'string',
			default: 'newAccordion'
		},
	},
	providesContext: {
		'accordion/parentID':'accordionID',
	},

	edit: ( { attributes, clientId, setAttributes } ) => {
		
		return ( [
			<InspectorControls>
				<PanelBody title='Accordion Properties' initialOpen={ true }>
					<TextControl
						label='Accordion ID'
						help='The identifier for the accordion group.'
						value={ attributes.accordionID }
						onChange={ ( value ) =>{ setAttributes( {accordionID:value} ); } }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={ "accordion" } id={ attributes.accordionID }>
				<InnerBlocks template={ ACCORDION_TEMPLATE } allowedBlocks={ [ 'accordion/fold', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
		] );
	},

	save: ( { attributes } ) => {
		
		return(
			<div className={ "accordion" } id={ attributes.accordionID }>
				<InnerBlocks.Content />
			</div>
		)
	},
} );

registerBlockType( 'accordion/fold', {
	title: 'Accordion Fold',
	parent: [ 'utksds/accordion' ],
	icon: 'list-view',
	category: 'design',

	usesContext: [ 'accordion/parentID', ],
	attributes: {
		foldName: {
			type: 'string',
			default: 'New Section'
		},
		foldSlug: {
			type: 'string',
			default: 'new-fold'
		},
		show: {
			type: 'boolean',
			default: false
		},
		showS: {
			type: 'string',
			default: ''
		},
		collapseS: {
			type: 'string',
			default: ' collapsed'
		},
		parentID:{
			type: 'string',
			default: ''
		},
	},

	
	edit: ( { attributes, context, clientId, setAttributes } ) => {
		
		setAttributes( { parentID:context['accordion/parentID'] } );
		
		return ( [
			<InspectorControls>
				<PanelBody title='Accordion Fold Settings' initialOpen={ true }>
					<ToggleControl
						label='Show'
						help={ attributes.show ? 'Fold defaults to open.' : 'Fold defaults to closed.' }
						checked={ attributes.show }
						onChange={ () => {
							setAttributes( { show: !attributes.show } );
							//console.log(attributes.buttonOutline);
								
							if( !attributes.show === true ){
								setAttributes( { showS:' show', collapseS:'' } );
							}else{
								setAttributes( { showS:'', collapseS:' collapsed' } );
							}
			
							//console.log(attributes.buttonColor);
						} }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className="card">
    			<div className="card-header" id={ "heading" + attributes.foldSlug }>
      				<h2 class="mb-0">
						<RichText
							tagName='button'
							className={ "btn btn-link btn-block text-left" + attributes.collapseS }
							type='button'
							data-toggle='collapse'
							data-target={ "#collapse" + attributes.foldSlug }
							aria-expanded={ attributes.show }
							aria-controls={ "collapse" + attributes.foldSlug }
							value={ attributes.foldName }
							onChange={ ( value ) => setAttributes( { foldName: value, foldSlug: cleanForSlug(value) } ) }
							allowedFormats ={ [] }
							withoutInteractiveFormatting
						/>
      				</h2>
    			</div>
    			<div id={ "collapse" + attributes.foldSlug } className={ "collapse" + attributes.showS } aria-labelledby={ "heading" + attributes.foldSlug } data-parent={ "#" + attributes.parentID }>
      				<div className="card-body">
        				<InnerBlocks allowedBlocks={ [ 'utksds/button', 'core/paragraph', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
      				</div>
    			</div>
  			</div>
		] );
	},
	
	save: ( { attributes } ) => {
		return (
			<div className="card">
    			<div className="card-header" id={ "heading" + attributes.foldSlug }>
      				<h2 class="mb-0">
						<RichText.Content
							tagName='button'
							className={ "btn btn-link btn-block text-left" + attributes.collapseS }
							type='button'
							data-toggle='collapse'
							data-target={ "#collapse" + attributes.foldSlug }
							aria-expanded={ attributes.show }
							aria-controls={ "collapse" + attributes.foldSlug }
							value={ attributes.foldName }
						/>
      				</h2>
    			</div>
    			<div id={ "collapse" + attributes.foldSlug } className={ "collapse" + attributes.showS } aria-labelledby={ "heading" + attributes.foldSlug } data-parent={ "#" + attributes.parentID }>
      				<div className="card-body">
        				<InnerBlocks.Content />
      				</div>
    			</div>
  			</div>
		);
	},
} );