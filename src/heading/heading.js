// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

const { registerBlockStyle } = wp.blocks;
const { addFilter } = wp.hooks;

const allowedBlocks = [ 'core/heading' ];

registerBlockStyle('core/heading', {
	name: 'display-1',
	label: 'Display 1'
} );

registerBlockStyle('core/heading', {
	name: 'display-2',
	label: 'Display 2'
} );

registerBlockStyle('core/heading', {
	name: 'display-3',
	label: 'Display 3'
} );

registerBlockStyle('core/heading', {
	name: 'display-4',
	label: 'Display 4'
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