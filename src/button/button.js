import { Path, SVG } from '@wordpress/components';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls } = wp.editor;
const { RichText, BlockControls, URLInputButton, __experimentalLinkControl } = wp.blockEditor;
const { PanelBody, PanelRow, Button, ButtonGroup, Popover, ToggleControl, ToolbarButton, ToolbarGroup } = wp.components;
const { withState } = wp.compose;
const { Fragment, useCallback, useState } = wp.element;
const { rawShortcut, displayShortcut } = wp.keycodes;

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
		linkTab: {
			type: 'boolean',
			default: false,
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

		const urlIsSet = !! attributes.url;
		const urlIsSetandSelected = urlIsSet && isSelected;

		const unlinkButton = () => {
			setAttributes( {
				url: undefined,
				linkTarget: undefined,
				linkTab: false,
				rel: undefined,
			} );
			setIsURLPickerOpen( false );
		};
		
		const [ isVisible, setisVisible ] = useState( false );
		const toggleVisible = () => setisVisible(value => !value);
		
		const [ NewTab, setNewTab ] = useState( attributes.linkTab );
		//const toggleNewTab = () => setNewTab(value => !value);
		
		return ( [
			<BlockControls>
				<ToolbarGroup>
					{ ! urlIsSet && (
					<ToolbarButton
						name="link"
						icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M15.6 7.2H14v1.5h1.6c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.8 0 5.2-2.3 5.2-5.2 0-2.9-2.3-5.2-5.2-5.2zM4.7 12.4c0-2 1.7-3.7 3.7-3.7H10V7.2H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H10v-1.5H8.4c-2 0-3.7-1.7-3.7-3.7zm4.6.9h5.3v-1.5H9.3v1.5z"></path></svg> }
						title='Link'
						onClick={ toggleVisible }
					/>
					) }
					{ urlIsSetandSelected && (
					<ToolbarButton
						name="link"
						icon={ <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M15.6 7.3h-.7l1.6-3.5-.9-.4-3.9 8.5H9v1.5h2l-1.3 2.8H8.4c-2 0-3.7-1.7-3.7-3.7s1.7-3.7 3.7-3.7H10V7.3H8.4c-2.9 0-5.2 2.3-5.2 5.2 0 2.9 2.3 5.2 5.2 5.2H9l-1.4 3.2.9.4 5.7-12.5h1.4c2 0 3.7 1.7 3.7 3.7s-1.7 3.7-3.7 3.7H14v1.5h1.6c2.9 0 5.2-2.3 5.2-5.2 0-2.9-2.4-5.2-5.2-5.2z"></path></svg> }
						title={ 'Unlink' }
						onClick={ unlinkButton }
						isActive={ true }
					/>
					) }
					{ isVisible && (
                	<Popover>
                    	<LinkControl
							value = { { url: attributes.url, opensInNewTab: attributes.linkTab } }
							onChange={ ( {
								url: newurl = '',
								opensInNewTab: NewTab
							} ) => {
								//console.log(NewTab);
								
								setAttributes( { url: newurl, opensInNewTab: setNewTab(value => !value) } );
			
								attributes.url = newurl;
								attributes.linkTab = NewTab;
			
								if ( attributes.linkTab === true ) {
									attributes.linkTarget = '_blank';
								} else {
									attributes.linkTarget = undefined;
								}
			
								//console.log(attributes.linkTarget);
			
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