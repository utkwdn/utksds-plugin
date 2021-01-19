import { Path, SVG } from '@wordpress/components';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { RichText, BlockControls, URLInputButton, __experimentalLinkControl } = wp.blockEditor;
const { PanelBody, PanelRow, Button, ButtonGroup, Popover, ToggleControl, ToolbarButton, ToolbarGroup } = wp.components;
const { withState } = wp.compose;
const { Fragment, useCallback, useState } = wp.element;

const LinkControl = __experimentalLinkControl;

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
	
	edit: ( { isSelected, attributes, ClassName, setAttributes } ) => {
		//const { url, linkTarget } = attributes;
		const [ isURLPickerOpen, setIsURLPickerOpen ] = useState( false );
		const urlIsSet = !! attributes.url;
		const urlIsSetandSelected = urlIsSet && isSelected;
		const openLinkControl = () => {
			setIsURLPickerOpen( true );
			return false; // prevents default behaviour for event
		};
		const unlinkButton = () => {
			setAttributes( {
				url: undefined,
				linkTarget: undefined,
				rel: undefined,
			} );
			setIsURLPickerOpen( false );
		};
		
		const [ isVisible, setisVisible ] = useState( false );
		const toggleVisible = () => setisVisible(value => !value);
		
		const [ NewTab, setNewTab ] = useState( false );
		
		return ( [
			<BlockControls>
				<ToolbarGroup>
					/*<URLInputButton
						url={ attributes.url }
						onChange={ ( url, post ) => setAttributes( { url } ) }
					/>*/
					<ToolbarButton
						name="popover"
						icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="-2 -2 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M7 8h6v4H7zm-5 5v4h4l-1.2-1.2L7 12l-3.8 2.2M14 17h4v-4l-1.2 1.2L13 12l2.2 3.8M14 3l1.3 1.3L13 8l3.8-2.2L18 7V3M6 3H2v4l1.2-1.2L7 8 4.7 4.3"></path></svg> }
						title='Popover'
						onClick={ toggleVisible }
					/>
					{ isVisible && (
                	<Popover>
                    	<LinkControl
    						value={ { url: attributes.url, opensInNewTab: attributes.linkTarget } }
							onChange={ ( {
								url: newURL = '',
								opensInNewTab: NewTab = value ? '_blank' : undefined,
							} ) => {
								//setNewTab(value => !value);
								setAttributes( { url: attributes.url = newURL, opensInNewTab: attributes.linkTarget = NewTab } );
								
			
								/*if ( NewTab == true ) {
									attributes.linkTarget = '_blank';
								} else {
									attributes.linkTarget = undefined;
								}*/
			
							} }
 						/>
                	</Popover>
            		) }
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