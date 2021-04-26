import { Path, SVG } from '@wordpress/components';
//import svgr from '@svgr/core';
import './editor.scss';

const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, RichText, BlockControls, ColorPalette, getColorObjectByColorValue, RichTextToolbarButton, __experimentalLinkControl } = wp.blockEditor;
const { PanelBody, PanelRow, RadioControl, Button, ButtonGroup, Popover, ToggleControl, ToolbarButton, ToolbarGroup, SelectControl, DropdownMenu, Icon } = wp.components;
const { withState, compose, ifCondition } = wp.compose;
const { Fragment, useCallback, useState } = wp.element;
const { rawShortcut, displayShortcut } = wp.keycodes;
const { create, registerFormatType, insert, insertObject, toHTMLString, removeFormat } = wp.richText;
const { withSelect } = wp.data;

const LinkControl = __experimentalLinkControl;

const BoxArrowUpRightButton = ( props ) => {
    return (<RichTextToolbarButton
		icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>}
		title={'Box arrow up-right'}
		isActive={ props.isActive }
		onClick={ () => {
			var iconRT = create( {html:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"> </path><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"> </path></svg>', preserveWhiteSpace: true} );
		
			props.onChange( insert( props.value, iconRT ) );
		} }
	/>);
};

const Check2Button = ( props ) => {
    return (<RichTextToolbarButton
		icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>}
		title={'Check 2'}
		isActive={ props.isActive }
		onClick={ () => {
			var iconRT = create( {html:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"> </path></svg>', preserveWhiteSpace: true} );
		
			props.onChange( insert( props.value, iconRT ) );
		} }
	/>);
};

const Check2CircleButton = ( props ) => {
    return (<RichTextToolbarButton
		icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>}
		title={'Check 2 circle'}
		isActive={ props.isActive }
		onClick={ () => {
			var iconRT = create( {html:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"> </path><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"> </path></svg>', preserveWhiteSpace: true} );
		
			props.onChange( insert( props.value, iconRT ) );
		} }
	/>);
};

const ChevronRightButton = ( props ) => {
    return (<RichTextToolbarButton
		icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>}
		title={'Chevron right'}
		isActive={ props.isActive }
		onClick={ () => {
			var iconRT = create( {html:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"> </path></svg>', preserveWhiteSpace: true} );
		
			props.onChange( insert( props.value, iconRT ) );
		} }
	/>);
};

const ChevronLeftButton = ( props ) => {
    return (<RichTextToolbarButton
		icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>}
		title={'Chevron left'}
		isActive={ props.isActive }
		onClick={ () => {
			var iconRT = create( {html:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"> </path></svg>', preserveWhiteSpace: true} );
		
			props.onChange( insert( props.value, iconRT ) );
		} }
	/>);
};

const PlusButton = ( props ) => {
    return (<RichTextToolbarButton
		icon={<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>}
		title={'Plus'}
		isActive={ props.isActive }
		onClick={ () => {
			var iconRT = create( {html:'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"> </path></svg>', preserveWhiteSpace: true} );
		
			props.onChange( insert( props.value, iconRT ) );
		} }
	/>);
};

const ConditionalBoxArrowUpRight = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'utksds/button'
        );
    } )
)( BoxArrowUpRightButton );

const ConditionalCheck2 = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'utksds/button'
        );
    } )
)( Check2Button );

const ConditionalCheck2Circle = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'utksds/button'
        );
    } )
)( Check2CircleButton );

const ConditionalChevronRight = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'utksds/button'
        );
    } )
)( ChevronRightButton );

const ConditionalChevronLeft = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'utksds/button'
        );
    } )
)( ChevronLeftButton );

const ConditionalPlus = compose(
    withSelect( function( select ) {
        return {
            selectedBlock: select( 'core/editor' ).getSelectedBlock()
        }
    } ),
    ifCondition( function( props ) {
        return (
            props.selectedBlock &&
            props.selectedBlock.name === 'utksds/button'
        );
    } )
)( PlusButton );

registerFormatType(
    'btnicons/boxarrowupright', {
        title: 'Box arrow up-right',
		tagName: 'xyz',
		className: null,
        edit: ConditionalBoxArrowUpRight,
    }
);

registerFormatType(
    'btnicons/check2', {
        title: 'Check2',
		tagName: 'qrs',
		className: null,
        edit: ConditionalCheck2,
    }
);

registerFormatType(
    'btnicons/check2circle', {
        title: 'Check2 circle',
		tagName: 'tuv',
		className: null,
        edit: ConditionalCheck2Circle,
    }
);

registerFormatType(
    'btnicons/chevronright', {
        title: 'Chevron right',
		tagName: 'wxy',
		className: null,
        edit: ConditionalChevronRight,
    }
);

registerFormatType(
    'btnicons/chevronleft', {
        title: 'Chevron left',
		tagName: 'abc',
		className: null,
        edit: ConditionalChevronLeft,
    }
);

registerFormatType(
    'btnicons/plus', {
        title: 'Plus',
		tagName: 'def',
		className: null,
        edit: ConditionalPlus,
    }
);

registerBlockType( 'utksds/button', {
	title: 'Button',
	icon: (
	<svg width="48" height="48" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false"><path d="M19 6.5H5c-1.1 0-2 .9-2 2v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2zm.5 9c0 .3-.2.5-.5.5H5c-.3 0-.5-.2-.5-.5v-7c0-.3.2-.5.5-.5h14c.3 0 .5.2.5.5v7zM8 13h8v-1.5H8V13z"></path></svg>
	),
	category: 'design',
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
			selector: 'span'
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
			default: 'Button'
		},
		buttonColor: {
			type: 'object',
			default: { name: 'Primary', slug: 'btn-primary', color: '#58595b'}
		},
		buttonOutline: {
			type: 'boolean',
			default: false
		},
		buttonSize: {
			type: 'string',
			default: ' btn-nrml'
		},
		iconCode: {
			type: 'string',
			default: null,
		},
		iconSize: {
			type: 'string',
			default: '24',
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
			setisVisible( false );
		};
		
		const [ isVisible, setisVisible ] = useState( false );
		const toggleVisible = () => setisVisible(value => !value);
		
		const [ NewTab, setNewTab ] = useState( attributes.linkTab );
		//const toggleNewTab = () => setNewTab(value => !value);
		
		const colors = [
			{ name: 'Primary', slug: 'btn-primary', color: '#58595b'},
			{ name: 'Secondary', slug: 'btn-secondary', color: '#006c93'},
			{ name: 'Light', slug: 'btn-light', color: '#F6F6F6'},
			{ name: 'Dark', slug: 'btn-dark', color: '#4b4b4b'},
		];
		
		const outlineColors = [
			{ name: 'Primary', slug: 'btn-outline-primary', color: '#58595b'},
			{ name: 'Secondary', slug: 'btn-outline-secondary', color: '#006c93'},
			{ name: 'Light', slug: 'btn-outline-light', color: '#F6F6F6'},
			{ name: 'Dark', slug: 'btn-outline-dark', color: '#4b4b4b'},
		];
		
		function onButtonColorChange( newColor ) {
			setAttributes( { buttonColor: newColor } );
		}
			
		//console.log(wp.data.select( 'core/rich-text' ).getFormatTypes());

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
								//setisVisible(false);
			
							} }
			
 						/>
                	</Popover>
            		) }
				</ToolbarGroup>
			</BlockControls>,
			<InspectorControls>
				<PanelBody title='Colors' initialOpen={ true }>
					{ ! attributes.buttonOutline && (
					<PanelRow>
						<p><strong>Select a Button color:</strong></p>
					</PanelRow>
					) }
					{ ! attributes.buttonOutline && (
					<PanelRow>
						<ColorPalette 
							colors = { colors }
							value={ attributes.buttonColor.color }
							onChange={ ( value ) =>{
								const thisColor = getColorObjectByColorValue( colors, value );
								setAttributes( { buttonColor:thisColor } );
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
					) }
					{ attributes.buttonOutline && (
					<PanelRow>
						<p><strong>Select a Button Outline color:</strong></p>
					</PanelRow>
					) }
					{ attributes.buttonOutline && (
					<PanelRow>
						<ColorPalette 
							colors = { outlineColors }
							value={ attributes.buttonColor.color }
							onChange={ ( value ) =>{
								const thisColor = getColorObjectByColorValue( outlineColors, value );
								setAttributes( { buttonColor:thisColor } );
								//console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
					) }
					<PanelRow>
						<ToggleControl
							label='Button Fill'
							help={ attributes.buttonOutline ? 'Button is outlined in color.' : 'Button is solid color.' }
							checked={ attributes.buttonOutline }
							onChange={ () => {
								setAttributes( { buttonOutline: !attributes.buttonOutline } );
								//console.log(attributes.buttonOutline);
								
								if( !attributes.buttonOutline === true ){
									const thisColor = getColorObjectByColorValue( outlineColors, attributes.buttonColor.color );
									setAttributes( { buttonColor:thisColor } );
								}else{
									const thisColor = getColorObjectByColorValue( colors, attributes.buttonColor.color );
									setAttributes( { buttonColor:thisColor } );
								}
			
								//console.log(attributes.buttonColor);
							} }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title='Size' initialOpen={ true }>
					<PanelRow>
						<p><strong>Select a Button size:</strong></p>
					</PanelRow>
					<PanelRow>
						<RadioControl
							help="The size of the button."
							selected={ attributes.buttonSize }
							options={ [
            					{ label: 'Small', value: ' btn-sm' },
            					{ label: 'Normal', value: ' btn-nrml' },
								{ label: 'Large', value: ' btn-lg' },
								{ label: 'Block', value: ' btn-block' },
        					] }
							onChange={ ( value ) =>{
								setAttributes( { buttonSize: value } );
								//console.log(value);
							} }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title='Icons' initialOpen={ true }>
					<PanelRow>
						<p><strong>Choose an icon to display in the button:</strong></p>
					</PanelRow>
					<PanelRow>
				  		<DropdownMenu
				  			icon={ <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-down" viewBox="0 0 16 16"><path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/></svg> }
        					label="Select an icon"
				  			controls={ [
            					{
                					title: 'No Icon',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-app" viewBox="0 0 16 16"><path d="M11 2a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3V5a3 3 0 0 1 3-3h6zM5 1a4 4 0 0 0-4 4v6a4 4 0 0 0 4 4h6a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4H5z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: null } );
										//console.log( attributes.iconCode );
									},
            					},
								{
                					title: 'Box arrow up-right',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/><path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg> } );
										//console.log( attributes.iconCode );
									},
            					},
								{
                					title: 'Check 2',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16"><path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/></svg> } );
										//console.log( attributes.iconCode );
									},
            					},
								{
                					title: 'Check 2 circle',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-circle" viewBox="0 0 16 16"><path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0z"/><path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l7-7z"/></svg> } );
										//console.log( attributes.iconCode );
									},
            					},
								{
                					title: 'Chevron right',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/></svg> } );
										//console.log( attributes.iconCode );
									},
            					},
								{
                					title: 'Chevron left',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/></svg> } );
										//console.log( attributes.iconCode );
									},
            					},
								{
                					title: 'Plus',
                					icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>,
				  					onClick: () =>{
										setAttributes( { iconCode: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg> } );
										//console.log( attributes.iconCode );
									},
            					},
							] }
				  		/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<div className={ 'btn ' + attributes.buttonColor.slug + attributes.buttonSize }>
			<RichText 
				tagName='span'
				placeholder={ attributes.placeholder }
				value={ attributes.text }
				allowedFormats={ [ 'core/bold', 'core/italic', 'btnicons/boxarrowupright', 'btnicons/check2', 'btnicons/check2circle', 'btnicons/chevronright', 'btnicons/chevronleft', 'btnicons/plus' ] }
				onChange={ ( value ) => setAttributes( { text: value } ) }
				withoutInteractiveFormatting
			/>
			<Icon
				icon={ attributes.iconCode }
				size={ attributes.iconSize }
			/>
			</div>
		] );
	},
	
	save: ( { attributes } ) => {
		return(
			<a
				type = 'button'
				className={ 'btn ' + attributes.buttonColor.slug + attributes.buttonSize }
				href={ attributes.url }
				title={ attributes.title }
				target={ attributes.linkTarget }
				rel={ attributes.rel }
			>
				<RichText.Content
					tagName="span"
					value={ attributes.text }
				/>
				<Icon
					icon={ attributes.iconCode }
					size={ attributes.iconSize }
				/>
			</a>
		);
	},
} );

registerBlockType( 'utksds/buttongroup', {
	title: 'Button Group',
	icon: (
	<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="currentColor" class="bi bi-segmented-nav" viewBox="0 0 16 16"><path d="M0 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6zm6 3h4V5H6v4zm9-1V6a1 1 0 0 0-1-1h-3v4h3a1 1 0 0 0 1-1z"/></svg>
	),
	category: 'design',
	description: '',
	attributes: {
		orientation: {
			type: 'string',
			default: 'btn-group'
		},
		orientationSetting: {
			type: 'boolean',
			default: false
		},
		groupSize: {
			type: 'string',
			default: ' btn-group-nrml'
		},
	},
	
	edit: ( { attributes, ClassName, setAttributes } ) => {
		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ 'Orientation' } initialOpen={ true }>
					<PanelRow>
						<ToggleControl
							label='Button Group Direction'
							help={ attributes.orientationSetting ? 'Vertical.' : 'Horizontal.' }
							checked={ attributes.orientationSetting }
							onChange={ () => {
								setAttributes( { orientationSetting: !attributes.orientationSetting } );
								//console.log(attributes.buttonOutline);
								
								if( !attributes.orientationSetting === true ){
									setAttributes( { orientation: 'btn-group-vertical' } );
								}else{
									setAttributes( { orientation: 'btn-group' } );;
								}
			
								//console.log(attributes.buttonColor);
							} }
						/>
					</PanelRow>
				</PanelBody>
				<PanelBody title='Size' initialOpen={ true }>
					<PanelRow>
						<p><strong>Select a Group size:</strong></p>
					</PanelRow>
					<PanelRow>
						<RadioControl
							help="The size of the group."
							selected={ attributes.groupSize }
							options={ [
            					{ label: 'Small', value: ' btn-group-sm' },
            					{ label: 'Normal', value: ' btn-group-nrml' },
								{ label: 'Large', value: ' btn-group-lg' },
								{ label: 'Block', value: ' btn-group-block' },
        					] }
							onChange={ ( value ) =>{
								setAttributes( { groupSize: value } );
								//console.log(value);
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className={ attributes.orientation + attributes.groupSize } role='group'>
				<InnerBlocks allowedBlocks={ [ 'utksds/button' ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
	},
	
	save: ( { attributes } ) => {

		return (
			<div className={ attributes.orientation + attributes.groupSize } role='group'>
				<InnerBlocks.Content />
			</div>
		);
	},
} );