/**
 * BLOCK: testblock
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks
import { RichText, getColorClassName } from '@wordpress/block-editor';
import Edit from './edit';
import classnames from 'classnames';
// import { PanelBody } from '@wordpress/components';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'cgb/block-testblock', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'Block 1' ), // Block title.
	description: __( 'Initial block template for design system' ),
	icon: {
		background: '#d79213',
		foreground: '#fff',
		src: 'palmtree',
	},
	category: 'utdesign_theme', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'UT UI KIT' ),
		__( 'Bootstrap' ),
		__( 'Design Kit' ),
	],
	styles: [
		{
			name: 'squared',
			label: __( 'Squared' ),
			isDefault: true,
		},
		{
			name: 'outline',
			label: __( 'Outline' ),
		},
		{
			name: 'rounded',
			label: __( 'Rounded' ),
		},
	],
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		alignment: {
			type: 'string',
		},
		backgroundColor: {
			type: 'string',
		},
		textColor: {
			type: 'string',
		},
		// these two attrs are predefined, so they only need to be instantiated here
		customBackgroundColor: {
			type: 'string',
		},
		customTextColor: {
			type: 'string',
		},
		shadow: {
			type: 'boolean',
			default: false,
		},
	},

	edit: Edit,

	save: ( props ) => {
		const { content, alignment, backgroundColor, textColor, customBackgroundColor, customTextColor } = props.attributes;
		const backgroundClass = getColorClassName( 'background-color', backgroundColor );
		const foregroundClass = getColorClassName( 'color', textColor );
		// eslint-disable-next-line no-console
		console.log( props.attributes );

		const classes = classnames( {
			[ backgroundClass ]: backgroundClass,
			[ foregroundClass ]: foregroundClass,
		} );

		return (
			<RichText.Content
				tagName="p"
				className={ classes }
				value={ content }
				style={ {
					textAlign: alignment,
					backgroundColor: backgroundClass ? undefined : customBackgroundColor,
					color: foregroundClass ? undefined : customTextColor,
				} }
			/>
		);
	},
} );
