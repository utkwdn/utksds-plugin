import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl } = wp.components;
const { cleanForSlug } = wp.url;

const TAB_TEMPLATE = [
    [ 'tabs/tab' ],
];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

function setTabNames( parentID ){
	
	var thisBlock = select( 'core/editor' ).getBlock( parentID );
	var tabs_title = [];
	
	thisBlock.innerBlocks.map( ( childrenBlock, index ) =>{
		if(index === 0){
			childrenBlock.attributes.tabActive = 'active';
			childrenBlock.attributes.tabShow = 'show';
		}
			
		tabs_title.push( { tabName: childrenBlock.attributes.tabName, tabSlug: childrenBlock.attributes.tabSlug, tabActive: childrenBlock.attributes.tabActive } );
	} );
	
	thisBlock.attributes.tabNames = tabs_title;
}

registerBlockType( 'utksds/tabs', {
	title: 'Tabs',
	icon: <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="currentColor" class="bi bi-segmented-nav" viewBox="0 0 24 24">
<path d="M22,5.5h-2.3v0h0V3.4c0-1-0.8-1.8-1.8-1.8h-16C0.8,1.5,0,2.4,0,3.4v17c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2v-13
	C24,6.4,23.1,5.5,22,5.5z M21.2,7.5c0.4,0,0.8,0.4,0.8,0.8l0,0l0,11.4c0,0.4-0.3,0.7-0.7,0.8l-18.5,0c-0.4,0-0.8-0.4-0.8-0.8L2,8.3
	c0-0.4,0.4-0.8,0.8-0.8L21.2,7.5z M2,4.4c0-0.4,0.4-0.8,0.8-0.8H6l0,0c0.4,0,0.8,0.4,0.8,0.8l0,0v0.3c0,0.4-0.3,0.8-0.8,0.8H2.8
	C2.4,5.5,2,5.1,2,4.7l0,0L2,4.4L2,4.4z M8.8,4.3c0-0.4,0.3-0.8,0.7-0.8l1.8,0c0.4,0,0.8,0.4,0.8,0.8l0,0v0.3c0,0.4-0.3,0.8-0.8,0.8
	l-1.7,0c-0.4,0-0.8-0.4-0.8-0.8l0,0L8.8,4.3L8.8,4.3z M17.7,4.4l0,0.3l0,0c0,0.4-0.3,0.8-0.8,0.8l-2,0c-0.4,0-0.8-0.3-0.8-0.8l0-0.4
	c0-0.4,0.3-0.7,0.7-0.7l2,0C17.3,3.6,17.7,3.9,17.7,4.4z"/></svg>,
	category: 'design',
	description: '',
	supports: {
		html: false,
	},
	attributes: {
		tabID: {
			type: 'string',
			default: 'myTab',
		},
		tabNames: {
			type: 'array',
			default: [],
		},
	},

	edit: ( { attributes, clientId, setAttributes } ) => {
	
		var listItems = [];
		if(Array.isArray(attributes.tabNames) && attributes.tabNames.length){
			for(var thisTab of attributes.tabNames){
				listItems.push(<li class="nav-item" role="presentation">
    				<a className={ "nav-link " + thisTab.tabActive } id={ thisTab.tabSlug + "-tab" } data-toggle="tab" href={ "#" + thisTab.tabSlug } role="tab" aria-controls={ thisTab.tabSlug } aria-selected="true">{ thisTab.tabName }</a>
  				</li>);
			}
		}
	
		return ( [
			<InspectorControls>
				<PanelBody title='Tabs Properties' initialOpen={ true }>
					<TextControl
						label='Tabs ID'
						help='The identifier for the tabs group.'
						value={ attributes.tabID }
						onChange={ ( value ) =>{ setAttributes( {tabID:value} ); } }
					/>
				</PanelBody>
			</InspectorControls>,
			<div class="tab-content" id="myTabContent">
				<InnerBlocks template={ TAB_TEMPLATE } allowedBlocks={ [ 'tabs/tab', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {

		var listItems = [];
		if(Array.isArray(attributes.tabNames) && attributes.tabNames.length){
			for(var thisTab of attributes.tabNames){
				listItems.push(<li class="nav-item" role="presentation">
    				<button className={ "nav-link " + thisTab.tabActive } id={ thisTab.tabSlug + "-tab" } data-bs-toggle="tab" data-bs-target={ "#" + thisTab.tabSlug } type="button" role="tab" aria-controls={ thisTab.tabSlug } aria-selected="true">{ thisTab.tabName }</button>
  				</li>);
			}
		}
		
		return (
			<div>
			<ul className={ "nav nav-tabs" } id={ attributes.tabID } role="tablist">
				{ listItems }
			</ul>
			<div class="tab-content" id="myTabContent">
				<InnerBlocks.Content />
			</div>
			</div>
		);
	},
} );

registerBlockType( 'tabs/tab', {
	title: 'Tab',
	parent: [ 'utksds/tabs' ],
	icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M7 2c1.695 1.942 2.371 3 4 3h13v17h-24v-20h7zm4 5c-2.339 0-3.537-1.388-4.917-3h-4.083v16h20v-13h-11zm2 6h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"/></svg>,
	description: 'Contains all the text elements within a Card.',
	supports: {
		html: false,
	},
	attributes: {
		tabName: {
			type: 'string',
			default: ''
		},
		tabPlaceholder: {
			type: 'string',
			default: 'New Tab'
		},
		tabSlug: {
			type: 'string',
			default: 'new-tab'
		},
		tabActive: {
			type: 'string',
			default: ''
		},
		tabShow: {
			type: 'string',
			default: ''
		},
	},
				  
	edit: ( { attributes, clientId, setAttributes } ) => {
	
		var parentID = '';
		const parentBlocks = wp.data.select( 'core/block-editor' ).getBlockParents(clientId);
	
		for(var thisParent of parentBlocks){
			var thisBlock = select( 'core/editor' ).getBlock( thisParent );
			if( thisBlock.name === 'utksds/tabs'){
				parentID = thisBlock.clientId;
			}
		}
		
		return ( [
			<div className={ "tab-pane fade " + attributes.tabShow + " " + attributes.tabActive } id={ attributes.tabSlug } role="tabpanel" aria-labelledby={ attributes.tabSlug + "-tab" }>
				<div className="tab-header">
					<RichText
						tagName='h3'
						className={ "tab-name" }
						value={ attributes.tabName }
						placeholder={ attributes.tabPlaceholder }
						onChange={ ( value ) =>{ 
							setAttributes( {tabName:value, tabSlug: 'tab-' + cleanForSlug(value)} );
							
							setTabNames(parentID);
						} }
						allowedFormats ={ [] }
						withoutInteractiveFormatting
					/>
				</div>
				<InnerBlocks allowedBlocks={ [ 'utksds/button', 'core/paragraph', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
		] )
	},
	
	save: ( { attributes } ) => {
		return (
			<div className={ "tab-pane fade " + attributes.tabShow + " " + attributes.tabActive } id={ attributes.tabSlug } role="tabpanel" aria-labelledby={ attributes.tabSlug + "-tab" }>
				<InnerBlocks.Content />
			</div>
		);
	},
			
} );