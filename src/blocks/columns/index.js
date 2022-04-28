/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'utksds/columns', {

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

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
