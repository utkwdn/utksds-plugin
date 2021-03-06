import { dropRight, times } from 'lodash';

import { withDispatch, useDispatch, select } from '@wordpress/data';
//import { select, useSelect } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
//import { BlockVariationPicker } from '@wordpress/block-editor';
import { createBlock, createBlocksFromInnerBlocksTemplate, store as blocksStore } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, __experimentalBlockVariationPicker, store as blockEditorStore } from '@wordpress/block-editor';
import './editor.scss';

const { registerBlockType, getBlockVariations, } = wp.blocks;
//const { BlockControls, } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, } = wp.components;
const { createHigherOrderComponent } = wp.compose;

const ALLOWED_BLOCKS = [ 'utksds/column' ];

const withCustomClassName = createHigherOrderComponent((BlockListBlock) => {
  return props => {
	if(props.name === 'utksds/column'){
    	return <BlockListBlock { ...props } className={ 'col-12 col-md-' + props.attributes.colWidth } />
	}else{
		return <BlockListBlock { ...props } />
	}
  }
}, 'withCustomClassName')
wp.hooks.addFilter('editor.BlockListBlock', 'my-plugin/with-custom-class-name', withCustomClassName)

registerBlockType( 'utksds/columns', {
	title: 'Columns',
	icon: 'editor-table',
	category: 'utdesign_layout',
	description: '',
	supports: {
		html: false,
	},
	attributes: {
		rowClass: {
			type: 'string',
			default: '',
		},
		blockName: {
			type: 'string',
			default: 'utksds/columns',
		},
		numCols: {
			type: 'integer',
			default: 0,
		},
	},
	providesContext: {
    	'columns/blockName': 'blockName',
		'columns/numCols': 'numCols',
	},
	variations: [
		{
		name: 'one-column-full',
		title: 'Columns: 100',
		description: 'One column',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-columns" viewBox="0 0 16 16"><path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"/></svg>
		),
		attributes: { rowClass: 'column-100', numCols: 1 },
		innerBlocks: [ [ 'utksds/column', { className: 'col-12' } ] ],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-equal',
		title: 'Columns: 50 / 50',
		description: 'Two columns; equal split',
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H25V34H39ZM23 34H9V14H23V34Z"
				/>
			</SVG>
		),
		attributes: { rowClass: 'column-50-50', numCols: 2 },
		isDefault: true,
		innerBlocks: [ 
		  [ 'utksds/column', { colWidth: 6 } ], 
		  [ 'utksds/column', { colWidth: 6 } ] 
		],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-one-third-two-thirds',
		title: 'Columns: 30 / 70',
		description: 'Two columns; one-third, two-thirds split',
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H20V34H39ZM18 34H9V14H18V34Z"
				/>
			</SVG>
		),
		attributes: { rowClass: 'column-30-70', numCols: 2 },
		innerBlocks: [
			[ 'utksds/column', { colWidth: 4 } ],
			[ 'utksds/column', { colWidth: 8 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'two-columns-two-thirds-one-third',
		title: 'Columns: 70 / 30',
		description: 'Two columns; two-thirds, one-third split',
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="M39 12C40.1046 12 41 12.8954 41 14V34C41 35.1046 40.1046 36 39 36H9C7.89543 36 7 35.1046 7 34V14C7 12.8954 7.89543 12 9 12H39ZM39 34V14H30V34H39ZM28 34H9V14H28V34Z"
				/>
			</SVG>
		),
		attributes: { rowClass: 'column-70-30', numCols: 2 },
		innerBlocks: [
			[ 'utksds/column', { colWidth: 8 } ],
			[ 'utksds/column', { colWidth: 4 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-equal',
		title: 'Columns: 33 / 33 / 33',
		description: 'Three columns; equal split',
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM28.5 34h-9V14h9v20zm2 0V14H39v20h-8.5zm-13 0H9V14h8.5v20z"
				/>
			</SVG>
		),
		attributes: { rowClass: 'column-33-33-33', numCols: 3 },
		innerBlocks: [
			[ 'utksds/column', { colWidth: 4 } ],
			[ 'utksds/column', { colWidth: 4 } ],
			[ 'utksds/column', { colWidth: 4 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'three-columns-wider-center',
		title: 'Columns: 25 / 50 / 25',
		description: 'Three columns; wide center column',
		icon: (
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					d="M41 14a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v20a2 2 0 0 0 2 2h30a2 2 0 0 0 2-2V14zM31 34H17V14h14v20zm2 0V14h6v20h-6zm-18 0H9V14h6v20z"
				/>
			</SVG>
		),
		attributes: { rowClass: 'column-25-50-25', numCols: 3 },
		innerBlocks: [
			[ 'utksds/column', { colWidth: 3 } ],
			[ 'utksds/column', { colWidth: 6 } ],
			[ 'utksds/column', { colWidth: 3 } ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'four-columns-equal',
		title: 'Columns: 25 / 25 / 25 / 25',
		description: 'Four columns; equal split',
		icon: (
			<svg width="48" height="48" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
  <path fill-rule="nonzero" d="M39 12a2 2 0 011.995 1.85L41 14v20a2 2 0 01-1.85 1.995L39 36H9a2 2 0 01-1.995-1.85L7 34V14a2 2 0 011.85-1.995L9 12h30zm-24 2H9v20h6V14zm8 0h-6v20h6V14zm2 0v20h6V14h-6zm8 20h6V14h-6v20z" />
</svg>
		),
		attributes: { rowClass: 'column-25-25-25-25', numCols: 4 },
		innerBlocks: [
			[ 'utksds/column', { colWidth: 3 } ],
			[ 'utksds/column', { colWidth: 3 } ],
			[ 'utksds/column', { colWidth: 3 } ],
			[ 'utksds/column', { colWidth: 3 } ],
		],
		scope: [ 'block' ],
	},
	],
	
	edit: ( { clientId, attributes, setAttributes } ) => {
		
		const colVariations = getBlockVariations( 'utksds/columns' );
		const { replaceInnerBlocks } = useDispatch( blockEditorStore );
		
		const colPlaceholder = (
			<__experimentalBlockVariationPicker
				label = 'Columns'
				instructions = 'Choose a column layout.'
				variations={ colVariations }
				onSelect={ ( nextVariation ) =>{
					//console.log( nextVariation );
					setAttributes( nextVariation.attributes );
					
					replaceInnerBlocks(
						clientId,
						createBlocksFromInnerBlocksTemplate(
							nextVariation.innerBlocks
						),
						true
					);
				} }
			/>
		);
	
		//console.log(colVariations);
	
		//console.log(select( blockEditorStore ).getBlocks( clientId ));
		//create numCols and colWidths attributes in columns
		//on change of numCols, recalculate colWidths and push results to child blocks
		//on change of child block width, push number up to parent, recalculate the others, and push down to children
		//widths need to be percentage on front end
		//as last resort write loop of colVariations to create each control in DropdownMenu, replace innerBlocks with selected colVariation
	
		function changeCols( origNum, newNum ){
			const { getBlocks } = select( blockEditorStore );

			let innerColBlocks = getBlocks( clientId );

			if(newNum > origNum){
				var numNew = newNum - origNum;
				var takenWidth = numNew * 3;
				var removeWidth = takenWidth / origNum;
				
				innerColBlocks.forEach( (element, index) =>{
					if(index === 0){
						//console.log(innerColBlocks[0].attributes.colWidth);
						innerColBlocks[0].attributes.colWidth = element.attributes.colWidth - Math.ceil(removeWidth);
						//console.log(innerColBlocks[0].attributes.colWidth);
					}else{
						innerColBlocks[index].attributes.colWidth = element.attributes.colWidth - Math.floor(removeWidth);
					}
				} );
				
				innerColBlocks = [
					...innerColBlocks,
					...times( newNum - origNum, () => {
						return createBlock( 'utksds/column', { colWidth: 3} );
					} ),
				];
			}else{
				var numNew = origNum - newNum;
				var totalWidth = 0;
				innerColBlocks.forEach( (element, index) =>{
					if(index < newNum){
						totalWidth = totalWidth + innerColBlocks[index].attributes.colWidth;
					}
				} );
				var addedWith = 12 - totalWidth;
				var addWidth = addedWith / newNum;
				
				innerColBlocks.forEach( (element, index) =>{
					if( index === 0){
						//console.log(innerColBlocks[index].attributes.colWidth);
						innerColBlocks[0].attributes.colWidth = element.attributes.colWidth + Math.ceil(addWidth);
						//console.log(innerColBlocks[index].attributes.colWidth);
					}else if( index < newNum ){
						innerColBlocks[index].attributes.colWidth = element.attributes.colWidth + Math.floor(addWidth);
					}
				} );
				
				innerColBlocks = dropRight(
					innerColBlocks,
					origNum - newNum
				);
			}

			replaceInnerBlocks( clientId, innerColBlocks );
		};
		
		return ( [
			<InspectorControls>
				<PanelBody>
					{ attributes.numCols > 0 && (
					<PanelRow>
						<RangeControl
        					label="Number of Columns"
							value={ attributes.numCols }
				  			min={ 1 }
							max={ 4 }
        					onChange={ ( value ) =>{ 
								setAttributes( {numCols:value} ); 
								changeCols( attributes.numCols, value );
							} }
    					/>
					</PanelRow>
					) }
				</PanelBody>
			</InspectorControls>,
			<div className="container">
				<div className={"row " + attributes.rowClass }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } placeholder={ colPlaceholder } templateLock={ 'all' } />
				</div>
			</div>,
		] );
	},
	
	save: ( { attributes } ) => {
		return (
				<div className="row">
					<InnerBlocks.Content />
				</div>
		);
	},
} );
			
registerBlockType( 'utksds/column', {
	title: 'Column',
	supports: {
		html: false,
	},
	parent: [ 'utksds/columns' ],
	usesContext: [ 'card/blockName', 'columns/numCols' ],
	icon: 'editor-justify',
	attributes: {
		colWidth: {
			type: 'integer',
			default: 3
		}
	},
	
	edit: ( { context, attributes, className, setAttributes, clientId, } ) => {
		if(typeof context['card/blockName'] !== 'undefined' && context['card/blockName'] === 'utksds/card'){
			var these_blocks = [ 'card/body', 'card/image' ];
		}else{
			//var these_blocks = [ 'core/paragraph', 'core/heading', 'core/list', 'core/quote', 'core/table', 'core/image', 'core/gallery', 'core/file', 'core/video', 'core/freeform', 'core/code', 'core/navigation', 'core/shortcode', 'core/html', 'core/latest-posts', 'core/page-list', 'core/rss', 'core/social-link', 'core/embed', 'lead/main', 'media-object/main', 'utksds/tabs', 'horizontal-rule/main', 'alert/main', 'utksds/buttongroup', 'utksds/button', 'utksds/accordion', 'utksds/card', 'utksds/calendar' ] ;
			var these_blocks = null;
		}
		
		const { replaceInnerBlocks } = useDispatch( blockEditorStore );
		const { getBlockRootClientId } = select( blockEditorStore );
		const rootId = getBlockRootClientId( clientId );
		const maxWidth = 12 - (context['columns/numCols'] - 1);
		
		function resizeCols( origWidth, newWidth ){
			const { getBlocks } = select( blockEditorStore );
			let innerColBlocks = getBlocks( rootId );
			
			if(newWidth > origWidth){
				var takenWidth = newWidth - origWidth;
				var takePerCol = takenWidth / ( context['columns/numCols'] - 1 );
				var remainder = 0;
				var startHere = false
				
				do{
				innerColBlocks.forEach( (element, index) =>{
					if(index === 0 && element.clientId !== clientId){
						if( element.attributes.colWidth === 1 ){
							remainder = Math.ceil(takePerCol);
						}else if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) < 1 ){
							if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) === 0 ){
								remainder = 1;
							}else{
								remainder = ( Math.ceil(takePerCol) + remainder ) - element.attributes.colWidth;
							}
							innerColBlocks[0].attributes.colWidth = 1
						}else{
							innerColBlocks[0].attributes.colWidth = element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder );
						}
					}else if(index === 0 && element.clientId === clientId){
						startHere = true;
					}else if(startHere){
						if( element.attributes.colWidth === 1 ){
							remainder = Math.ceil(takePerCol);
						}else if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) < 1 ){
							if( element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder ) === 0 ){
								remainder = 1;
							}else{
								remainder = ( Math.ceil(takePerCol) + remainder ) - element.attributes.colWidth;
							}
							innerColBlocks[index].attributes.colWidth = 1
						}else{
							innerColBlocks[index].attributes.colWidth = element.attributes.colWidth - ( Math.ceil(takePerCol) + remainder );
						}
						startHere = false;
					}else if(element.clientId !== clientId){
						if( element.attributes.colWidth === 1 ){
							remainder = Math.floor(takePerCol);
						}else if( element.attributes.colWidth - ( Math.floor(takePerCol) + remainder ) < 1 ){
							if( element.attributes.colWidth - ( Math.floor(takePerCol) + remainder ) === 0 ){
								remainder = 1;
							}else{
								remainder = ( Math.floor(takePerCol) + remainder ) - element.attributes.colWidth;
							}
							innerColBlocks[index].attributes.colWidth = 1
						}else{
							innerColBlocks[index].attributes.colWidth = element.attributes.colWidth - ( Math.floor(takePerCol) + remainder );
							remainder = 0;
						}
					}
				} );
				} while(remainder !== 0);
			}else{
				var addedWidth = origWidth - newWidth;
				var addPerCol = addedWidth / ( context['columns/numCols'] - 1 );
				var remainder = 0;
				var startHere = false;
				
				do{
				innerColBlocks.forEach( (element, index) =>{
					if( index === 0 && element.clientId !== clientId ){
						if( element.attributes.colWidth === maxWidth ){
							remainder = Math.ceil(addPerCol);
						}else if( element.attributes.colWidth + Math.ceil(addPerCol) + remainder > maxWidth ){
							remainder = ( element.attributes.colWidth + Math.ceil(addPerCol) + remainder ) - maxWidth;
							innerColBlocks[0].attributes.colWidth = maxWidth;
						}else{
							innerColBlocks[0].attributes.colWidth = element.attributes.colWidth + Math.ceil(addPerCol) + remainder;
							remainder = 0;
						}
					}else if( index === 0 && element.clientId === clientId ){
						startHere = true;
					}else if(startHere){
						if( element.attributes.colWidth === maxWidth ){
							remainder = Math.ceil(addPerCol);
						}else if( element.attributes.colWidth + Math.ceil(addPerCol) + remainder > maxWidth ){
							remainder = ( element.attributes.colWidth + Math.ceil(addPerCol) + remainder ) - maxWidth;
							innerColBlocks[index].attributes.colWidth = maxWidth;
						}else{
							innerColBlocks[index].attributes.colWidth = element.attributes.colWidth + Math.ceil(addPerCol) + remainder;
							remainder = 0
						}
						startHere = false;
					}else if(element.clientId !== clientId){
						if( element.attributes.colWidth === maxWidth ){
							remainder = Math.floor(addPerCol);
						}else if( element.attributes.colWidth + Math.floor(addPerCol) + remainder > maxWidth ){
							remainder = ( element.attributes.colWidth + Math.floor(addPerCol) + remainder ) - maxWidth;
							innerColBlocks[index].attributes.colWidth = maxWidth;
						}else{
							innerColBlocks[index].attributes.colWidth = element.attributes.colWidth + Math.floor(addPerCol) + remainder;
							remainder = 0;
						}
					}
				} );
				} while(remainder !== 0);
			}
			
			replaceInnerBlocks( rootId, innerColBlocks );
		};
		
		function toInt(value){
			var percent = value/100;
			var colNum = 12 * percent;
			
			return Math.round(colNum);
		};
		
		function toPercent(value){
			var percent = value/12;
			var colPercent = percent * 100;
			
			return Math.round(colPercent);
		};
		
		return ( [
			<InspectorControls>
				<PanelBody>
					<PanelRow>
						<RangeControl
        					label="Percent Width"
							value={ toPercent(attributes.colWidth) }
				  			min={ toPercent(1) }
							max={ toPercent(maxWidth) }
        					onChange={ ( value ) =>{ 
								resizeCols( attributes.colWidth, toInt(value) )		
								setAttributes( {colWidth:toInt(value)} ); 
							} }
    					/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ className } >
				<InnerBlocks allowedBlocks={ these_blocks } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
		] )
	},
	
	save: ( props ) => {
		return (
			<div className={ props.className + ' col-12 col-md-' + props.attributes.colWidth }>
				<InnerBlocks.Content />
			</div>
		);
	},
			
} );