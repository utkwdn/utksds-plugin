import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl } = wp.components;
const { cleanForSlug } = wp.url;

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
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-segmented-nav" viewBox="0 0 16 16"><path d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm6 3h4V5H6v4zm9-1V6a1 1 0 0 0-1-1h-3v4h3a1 1 0 0 0 1-1z"/></svg>,
	category: 'design',
	description: '',
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
				<InnerBlocks allowedBlocks={ [ 'tabs/tab', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {

		var listItems = [];
		if(Array.isArray(attributes.tabNames) && attributes.tabNames.length){
			for(var thisTab of attributes.tabNames){
				listItems.push(<li class="nav-item" role="presentation">
    				<a className={ "nav-link " + thisTab.tabActive } id={ thisTab.tabSlug + "-tab" } data-toggle="tab" href={ "#" + thisTab.tabSlug } role="tab" aria-controls={ thisTab.tabSlug } aria-selected="true">{ thisTab.tabName }</a>
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
	attributes: {
		tabName: {
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
						onChange={ ( value ) =>{ 
							setAttributes( {tabName:value, tabSlug: 'tab-' + cleanForSlug(value)} );
							
							setTabNames(parentID);
						} }
						allowedFormats ={ [] }
						withoutInteractiveFormatting
					/>
				</div>
				<InnerBlocks allowedBlocks={ 'core/button', 'core/paragraph', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
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