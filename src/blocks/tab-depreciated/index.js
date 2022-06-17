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
registerBlockType( 'tabs/tab', {

	icon: <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M7 2c1.695 1.942 2.371 3 4 3h13v17h-24v-20h7zm4 5c-2.339 0-3.537-1.388-4.917-3h-4.083v16h20v-13h-11zm2 6h3v2h-3v3h-2v-3h-3v-2h3v-3h2v3z"/></svg>,
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'utkwds/tab' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock( 'utkwds/tab',
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
