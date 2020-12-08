//code forked from core/columns
//import { columns as icon } from '@wordpress/icons';
const { registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */
import edit from './edit.js';
//import metadata from './block.json';
import save from './save.js';
import variations from './variations.js';
//import transforms from './transforms';

//const { name } = metadata;

//export { metadata, name };

registerBlockType( 'utksds/column', {
	title: 'UTK Columns',
	icon: 'editor-table',
	category: 'utdesign_system',
	description: 'Add a block that displays content in multiple columns, then add whatever content blocks you’d like.',
	variations,
	//deprecated,
	edit,
	save,
	//transforms,
} );