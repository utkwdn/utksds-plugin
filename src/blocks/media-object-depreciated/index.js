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
registerBlockType( 'media-object/main', {

	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 5h-8v2h8v-2zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zm0 4h-8v2h8v-2zm-10 1.597l-.003.403h-13.994l-.003-.403c0-.896.116-1.937 1.854-2.335 1.729-.396 3.838-1.421 3.217-2.755-.397.64-1.635 1.037-2.597.469 2.771-.702-1.36-5.524 2.258-8.228.649-.5 1.449-.748 2.253-.748.809 0 1.62.251 2.283.748 3.618 2.704-.512 7.526 2.258 8.228-.962.568-2.198.188-2.596-.469-.622 1.333 1.484 2.358 3.216 2.755 1.737.399 1.854 1.439 1.854 2.335z"/></svg>,

	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
