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
	icon: 'list-view',
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
			default: 'New Fold'
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