/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType, createBlock } from '@wordpress/blocks';

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
registerBlockType( 'utksds/tabs', {

	icon: <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" fill="currentColor" class="bi bi-segmented-nav" viewBox="0 0 24 24">
	<path d="M22,5.5h-2.3v0h0V3.4c0-1-0.8-1.8-1.8-1.8h-16C0.8,1.5,0,2.4,0,3.4v17c0,1.1,0.9,2,2,2h20c1.1,0,2-0.9,2-2v-13
		C24,6.4,23.1,5.5,22,5.5z M21.2,7.5c0.4,0,0.8,0.4,0.8,0.8l0,0l0,11.4c0,0.4-0.3,0.7-0.7,0.8l-18.5,0c-0.4,0-0.8-0.4-0.8-0.8L2,8.3
		c0-0.4,0.4-0.8,0.8-0.8L21.2,7.5z M2,4.4c0-0.4,0.4-0.8,0.8-0.8H6l0,0c0.4,0,0.8,0.4,0.8,0.8l0,0v0.3c0,0.4-0.3,0.8-0.8,0.8H2.8
		C2.4,5.5,2,5.1,2,4.7l0,0L2,4.4L2,4.4z M8.8,4.3c0-0.4,0.3-0.8,0.7-0.8l1.8,0c0.4,0,0.8,0.4,0.8,0.8l0,0v0.3c0,0.4-0.3,0.8-0.8,0.8
		l-1.7,0c-0.4,0-0.8-0.4-0.8-0.8l0,0L8.8,4.3L8.8,4.3z M17.7,4.4l0,0.3l0,0c0,0.4-0.3,0.8-0.8,0.8l-2,0c-0.4,0-0.8-0.3-0.8-0.8l0-0.4
		c0-0.4,0.3-0.7,0.7-0.7l2,0C17.3,3.6,17.7,3.9,17.7,4.4z"/></svg>,
		transforms: {
			to: [
				{
					type: 'block',
					blocks: [ 'utkwds/tabs' ],
					transform: ( attributes, innerBlocks ) => {
						return createBlock( 'utkwds/tabs',
							attributes,
							innerBlocks
						);
					},
				},
			],
		},

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
