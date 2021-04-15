import { withDispatch, useDispatch } from '@wordpress/data';
//import { select, useSelect } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
//import { BlockVariationPicker } from '@wordpress/block-editor';
import { createBlocksFromInnerBlocksTemplate, store as blocksStore } from '@wordpress/blocks';
import { InnerBlocks, InspectorControls, __experimentalBlockVariationPicker, store as blockEditorStore } from '@wordpress/block-editor';
import './editor.scss';

const { registerBlockType, getBlockVariations } = wp.blocks;
const { PanelBody, PanelRow } = wp.components;

const ALLOWED_BLOCKS = [ 'utksds/column' ];

registerBlockType( 'utksds/columns', {
	title: 'Columns',
	icon: 'editor-table',
	category: 'utdesign_layout',
	description: '',
	attributes: {
		rowClass: {
			type: 'string',
			default: '',
		},
	},
	variations: [
		{
		name: 'one-column-full',
		title: 'Columns: 100',
		description: 'One column',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-columns" viewBox="0 0 16 16"><path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"/></svg>
		),
		attributes: { rowClass: 'column-100' },
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
		attributes: { rowClass: 'column-50-50' },
		isDefault: true,
		innerBlocks: [ 
		  [ 'utksds/column', { className: 'col-12 col-md-6' } ], 
		  [ 'utksds/column', { className: 'col-12 col-md-6' } ] 
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
		attributes: { rowClass: 'column-30-70' },
		innerBlocks: [
			[ 'utksds/column', { className: 'col-12 col-md-4' } ],
			[ 'utksds/column', { className: 'col-12 col-md-8' } ],
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
		attributes: { rowClass: 'column-70-30' },
		innerBlocks: [
			[ 'utksds/column', { className: 'col-12 col-md-8' } ],
			[ 'utksds/column', { className: 'col-12 col-md-4' } ],
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
		attributes: { rowClass: 'column-33-33-33' },
		innerBlocks: [
			[ 'utksds/column', { className: 'col-12 col-md-4' } ],
			[ 'utksds/column', { className: 'col-12 col-md-4' } ],
			[ 'utksds/column', { className: 'col-12 col-md-4' } ],
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
		attributes: { rowClass: 'column-25-50-25' },
		innerBlocks: [
			[ 'utksds/column', { className: 'col-12 col-md-3' } ],
			[ 'utksds/column', { className: 'col-12 col-md-6' } ],
			[ 'utksds/column', { className: 'col-12 col-md-3' } ],
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
		attributes: { rowClass: 'column-25-25-25-25' },
		innerBlocks: [
			[ 'utksds/column', { className: 'col-12 col-md-6 col-lg-3' } ],
			[ 'utksds/column', { className: 'col-12 col-md-6 col-lg-3' } ],
			[ 'utksds/column', { className: 'col-12 col-md-6 col-lg-3' } ],
			[ 'utksds/column', { className: 'col-12 col-md-6 col-lg-3' } ],
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
		
		return (
			<div className="container">
				<div className={"row " + attributes.rowClass }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } placeholder={ colPlaceholder } templateLock={ 'all' } />
				</div>
			</div>
		);
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
	parent: [ 'utksds/columns' ],
	usesContext: [ 'card/blockName' ],
	icon: 'editor-justify',
	
	edit: ( props ) => {
		if(typeof props.context['card/blockName'] !== 'undefined' && props.context['card/blockName'] === 'utksds/card'){
			var these_blocks = [ 'card/body', 'card/image' ];
		}else{
			var these_blocks = true ;
		}
		
		return (
			<div className={ props.className } >
				<InnerBlocks allowedBlocks={ these_blocks } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
		)
	},
	
	save: ( props ) => {
		return (
			<div className={ props.className }>
				<InnerBlocks.Content />
			</div>
		);
	},
			
} );