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
registerBlockType( 'card/topcap', {

	icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 18h6v6h-6v-6zm-9 6h6v-6h-6v6zm-9 0h6v-6h-6v6zm0-8h24v-16h-24v16z"/></svg>),
	transforms: {
		to: [
			{
				type: 'block',
				blocks: [ 'utkwds/card-topcap' ],
				transform: ( attributes, innerBlocks ) => {
					return createBlock( 'utkwds/card-topcap',
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
