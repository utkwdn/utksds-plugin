const { registerBlockStyle } = wp.blocks;
import './editor.scss';

registerBlockStyle('core/image', {
	name: 'framed',
	label: 'Orange Frame'
} );