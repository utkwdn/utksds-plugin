// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

const { registerBlockStyle } = wp.blocks;
const { addFilter } = wp.hooks;

const allowedBlocks = [ 'core/list' ];

registerBlockStyle('core/list', {
	name: 'list-roman',
	label: 'Roman Numerals'
} );

registerBlockStyle('core/list', {
	name: 'list-letters',
	label: 'Letters'
} );

function addSupports( settings ) {
	/*check if object exists for old Gutenberg version compatibility
	add allowedBlocks restriction*/
	if( typeof settings.supports !== 'undefined' && allowedBlocks.includes( settings.name ) ){
		settings.supports = Object.assign( settings.supports, {
			defaultStylePicker:false,
			fontSize:false,
			color:{
				background:false,
				text:false,
			},
		});
	}
	
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-supports',
	addSupports
);