//import { dispatch } from '@wordpress/data';
//import { select, useSelect } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
//import { BlockVariationPicker } from '@wordpress/block-editor';
//import { store as blocksStore } from '@wordpress/blocks';
import './editor.scss';



const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { PanelBody, PanelRow } = wp.components;

const ALLOWED_BLOCKS = [ 'utksds/column' ];

registerBlockType( 'utksds/columns', {
	title: 'UTK Columns',
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
			<SVG
				width="48"
				height="48"
				viewBox="0 0 48 48"
				xmlns="http://www.w3.org/2000/svg"
			>
				<Path
					fillRule="evenodd"
					clipRule="evenodd"
					d="m39.0625 14h-30.0625v20.0938h30.0625zm-30.0625-2c-1.10457 0-2 .8954-2 2v20.0938c0 1.1045.89543 2 2 2h30.0625c1.1046 0 2-.8955 2-2v-20.0938c0-1.1046-.8954-2-2-2z"
				/>
			</SVG>
		),
		attributes: { rowClass: 'column-100' },
		innerBlocks: [ [ 'utksds/column', { className: 'col-12' } ] ],
		//scope: [ 'block' ],
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
		innerBlocks: [ [ 'utksds/column', { className: 'col-6' } ], [ 'utksds/column', { className: 'col-6' } ] ],
		//scope: [ 'block' ],
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
			[ 'utksds/column', { className: 'col-4' } ],
			[ 'utksds/column', { className: 'col-8' } ],
		],
		//scope: [ 'block' ],
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
			[ 'utksds/column', { className: 'col-8' } ],
			[ 'utksds/column', { className: 'col-4' } ],
		],
		//scope: [ 'block' ],
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
		//scope: [ 'block' ],
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
			[ 'utksds/column', { className: 'col-3' } ],
			[ 'utksds/column', { className: 'col-6' } ],
			[ 'utksds/column', { className: 'col-3' } ],
		],
		//scope: [ 'block' ],
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
			[ 'utksds/column', { className: 'col-3' } ],
			[ 'utksds/column', { className: 'col-3' } ],
			[ 'utksds/column', { className: 'col-3' } ],
			[ 'utksds/column', { className: 'col-3' } ],
		],
		//scope: [ 'block' ],
	},
	],
	
	edit: ( props ) => {
		const{ attributes } = props;
		const{ rowClass } = attributes;
		return (
			<div className="container">
				<div className={"row " + rowClass }>
					<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock={ 'all' } />
				</div>
			</div>
		);
	},
	
	save: ( { attributes } ) => {
		return (
			<div className="container">
				<div className="row">
					<InnerBlocks.Content />
				</div>
			</div>
		);
	},
} );
			
registerBlockType( 'utksds/column', {
	title: 'Column',
	parent: [ 'utksds/columns' ],
	icon: 'editor-justify',
	
	edit: ( props ) => {
		return (
			<div className={ props.className } >
				<InnerBlocks templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
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