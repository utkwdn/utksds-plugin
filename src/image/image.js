const { registerBlockStyle } = wp.blocks;
const { addFilter } = wp.hooks;

const allowedBlocks = [ 'core/image' ];

import './editor.scss';

registerBlockStyle('core/image', {
	name: 'framed',
	label: 'Orange Frame'
} );

function addSupports( settings ) {
	/*check if object exists for old Gutenberg version compatibility
	add allowedBlocks restriction*/
	if( typeof settings.supports !== 'undefined' && allowedBlocks.includes( settings.name ) ){
		settings.supports = Object.assign( settings.supports, {
			defaultStylePicker:false,
		});
	}
	
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-supports',
	addSupports
);