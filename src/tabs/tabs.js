import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.blockEditor;
const { PanelBody, PanelRow, TextControl } = wp.components;
const { cleanForSlug } = wp.url;

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

function setTabNames( parentID ){
	
	console.log(parentID);
	
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
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5.759 4l.038.069c1.444 2.646 2.691 4.931 7.141 4.931h9.062v11h-20v-16h3.759zm1.179-2h-6.938v20h24v-15h-11.062c-3.719 0-4.188-1.812-6-5zm6.171 3h10.891v-3h-14.604c1.39 2.574 1.63 3 3.713 3z"/></svg>,
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
		tabsClientID: {
			type: 'string',
			default: this.clientId,
		},
	},
	providesContext: {
    	'tab/clientID': 'tabsClientID',
	},

	edit: ( { attributes, clientId, setAttributes } ) => {
	
		//attributes.tabsClientID = clientId;
	
		//console.log(attributes.tabsClientID);
	
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
			<div>
			<ul className={ "nav nav-tabs" } id={ attributes.tabID } role="tablist">
				{ listItems }
			</ul>
			<div class="tab-content" id="myTabContent">
				<InnerBlocks allowedBlocks={ [ 'tabs/tab', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
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
				  
	edit: ( { attributes, clientId, context, setAttributes } ) => {
	
		var parentID = '';
		const parentBlocks = wp.data.select( 'core/block-editor' ).getBlockParents(clientId);
	
		for(var thisParent of parentBlocks){
			var thisBlock = select( 'core/editor' ).getBlock( thisParent );
			if( thisBlock.name === 'utksds/tabs'){
				parentID = thisBlock.clientId;
			}
		}
	
		//console.log(parentID);
		
		return ( [
			<InspectorControls>
				<PanelBody title='Tab Properties' initialOpen={ true }>
					<TextControl
						label='Tab Name'
						help='The identifier for the tabs group.'
						value={ attributes.tabName }
						onChange={ ( value ) =>{ 
							setAttributes( {tabName:value, tabSlug: 'tab-' + cleanForSlug(value)} );
							
							setTabNames(parentID);
			
							//console.log(parentID);
						} }
					/>
				</PanelBody>
			</InspectorControls>,
			<div className={ "tab-pane fade " + attributes.tabShow + " " + attributes.tabActive } id={ attributes.tabSlug } role="tabpanel" aria-labelledby={ attributes.tabSlug + "-tab" }>
				<InnerBlocks allowedBlocks={ 'core/button', 'core/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
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