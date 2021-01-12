import { Path, SVG } from '@wordpress/components';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { RichText, BlockControls } = wp.blockEditor;
const { PanelBody, PanelRow, Button, ButtonGroup, Popover, ToggleControl, ToolbarButton, ToolbarGroup } = wp.components;

registerBlockType( 'utksds/button', {
	title: 'UTK Button',
	icon: (
	<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path d="M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 13h8v-1.5H8V13z"></path></svg>
	),
	category: 'utdesign_system',
	description: '',
	attributes: {
		url: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'href'
		},
		title: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'title'
		},
		text: {
			type: 'string',
			source: 'html',
			selector: 'a'
		},
		linkTarget: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'target'
		},
		rel: {
			type: 'string',
			source: 'attribute',
			selector: 'a',
			attribute: 'rel'
		},
		placeholder: {
			type: 'string',
			default: 'Add Text'
		},
	},
	
	edit: ( { attributes, ClassName, setAttributes } ) => {
		//const{ attributes } = props;
		//const{ rowClass } = attributes;
		return ( [
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						name="link"
						icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg> }
						title='Link'
						//shortcut={ displayShortcut.primary( 'k' ) }
						//onClick={ openLinkControl }
					/>
				</ToolbarGroup>
			</BlockControls>,
			<RichText 
				tagName='a'
				className={ 'btn btn-primary' }
				placeholder={ attributes.placeholder }
				value={ attributes.text }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				withoutInteractiveFormatting
			/>
		] );
	},
	
	save: ( { attributes } ) => {
		return(
			<RichText.Content
				tagName="a"
				type = 'button'
				className={ 'btn btn-primary' }
				href={ attributes.url }
				title={ attributes.title }
				style={ '' }
				value={ attributes.text }
				target={ attributes.linkTarget }
				rel={ attributes.rel }
			/>
		);
	},
} );