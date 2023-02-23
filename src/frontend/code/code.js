// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

const { registerBlockStyle } = wp.blocks;
const { addFilter } = wp.hooks;

const allowedBlocks = [ 'core/code' ];

function addSupports( settings ) {
	/*check if object exists for old Gutenberg version compatibility
	add allowedBlocks restriction*/
	if( typeof settings.supports !== 'undefined' && allowedBlocks.includes( settings.name ) ){
		settings.supports = Object.assign( settings.supports, {
			fontSize:false,
		});
	}
	
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-supports',
	addSupports
);