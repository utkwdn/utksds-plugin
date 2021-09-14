import { dispatch, withDispatch, useDispatch  } from '@wordpress/data';
import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';
import { store as blocksStore } from '@wordpress/blocks';
import { store as blockEditorStore } from '@wordpress/block-editor';
import { siteColors, textColors } from '../globals.js'

const { registerBlockType, registerBlockVariation, getBlockVariations, createBlocksFromInnerBlocksTemplate } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText, getColorObjectByColorValue, __experimentalBlockVariationPicker } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, RadioControl, ToggleControl, SelectControl } = wp.components;
const { withState } = wp.compose;

const ALLOWED_BLOCKS = [ 'utksds/button', 'card/paragraph', 'card/heading', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ];

const PARAGRAPH_TEMPLATE = [
    [ 'core/paragraph', { className: 'card-text' } ],
];

const HEADING_TEMPLATE = [
	[ 'core/heading', { className: 'card-title' } ],
];

const TOP_CAP_TEMPLATE = [
	[ 'core/image', { className: 'card-img-top' } ],
];

const IMAGE_TEMPLATE = [
	[ 'core/image', { className: 'card-img' } ],
];

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

/*const bgColors = [
	{ name: 'Light', slug: 'bg-light', color: '#F6F6F6', text: 'text-primary'},
	{ name: 'Primary', slug: 'bg-primary', color: '#58595b', text: 'text-light'},
	{ name: 'Secondary', slug: 'bg-secondary', color: '#006c93', text: 'text-light'},
];

const borderColors = [
	{ name: 'Light', slug: 'border-light', color: '#F6F6F6', text: ''},
	{ name: 'Primary', slug: 'border-primary', color: '#58595b', text: ''},
	{ name: 'Secondary', slug: 'border-secondary', color: '#006c93', text: ''},
];

const textColors = [
	{ name: 'Light', slug: 'text-light', color: '#F6F6F6'},
	{ name: 'Primary', slug: 'text-primary', color: '#58595b'},
	{ name: 'Secondary', slug: 'text-secondary', color: '#006c93'},
];*/

/*registerBlockVariation( 'core/image', {
	name: 'captop',
	title: 'Image Cap Top',
	icon: ( <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 18h6v6h-6v-6zm-9 6h6v-6h-6v6zm-9 0h6v-6h-6v6zm0-8h24v-16h-24v16z"/></svg> ),
	attributes: {
		className: 'card-img-top',
		testBlockName: 'capTop',
		testAttribute: 'Does it work'
	},
	isActive: ( blockAttributes, variationAttributes ) => blockAttributes.parentBlockName === variationAttributes.testBlockName
} );*/

registerBlockType( 'utksds/card', {
	title: 'Card',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/></svg>,
	category: 'design',
	description: 'A flexible and extensible content container for highlighting pieces of content.',
	attributes: {
		blockName: {
			type: 'string',
			default: 'utksds/card',
		},
		cardColor: {
			type: 'object',
			default: { name: 'Light', slug: 'bg-light', color: '#F6F6F6', text: 'text-primary'},
		},
		cardOutline: {
			type: 'boolean',
			default: false,
		},
		textColor: {
			type: 'string',
			default: 'text-primary',
		},
	},
	providesContext: {
    	'card/blockName': 'blockName',
		'card/cardColor': 'cardColor',
		'card/cardOutline': 'cardOutline',
	},
	variations: [
	{
		name: 'image-title-body-button',
		title: 'Top image, text, and button',
		description: 'Top image with title, body, and button',
		icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-heading" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 8.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0 2a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5zm0-5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5v-1z"/></svg>),
		innerBlocks: [
			[ 'card/main', {}, [
				[ 'card/topcap' ],
				[ 'card/body', {}, [ [ 'card/heading' ], [ 'card/paragraph' ], [ 'utksds/button' ] ] ],
			] ],
		],
		scope: [ 'block' ],
	},
	{
		name: 'title-body',
		title: 'Title and text',
		description: 'Card with title and text',
		icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-card-text" viewBox="0 0 16 16"><path d="M14.5 3a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h13zm-13-1A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13z"/><path d="M3 5.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 8zm0 2.5a.5.5 0 0 1 .5-.5h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5z"/></svg>),
		innerBlocks: [
			[ 'card/main', {}, [
				[ 'card/body', {}, [ [ 'card/heading' ], [ 'card/paragraph' ] ] ],
			] ],
		],
		scope: [ 'block' ],
	},
	],

	edit: ( props ) => {
		//const { backgroundColor } = attributes;
		const {
    		attributes,
			clientId,
			name,
    		setAttributes
  		} = props;
	
		const cardVariations = getBlockVariations( 'utksds/card' );
		const { replaceInnerBlocks } = useDispatch( blockEditorStore );
	
		var cardPlaceholder = (
			<__experimentalBlockVariationPicker
				label = 'Card Template'
				instructions = 'A card is a flexible and extensible content container for highlighting pieces of content with multiple variants and options. Choose a template to get started.'
				variations={ cardVariations }
				onSelect={ ( nextVariation ) =>{
					//console.log( nextVariation );
					setAttributes( nextVariation.attributes );
					
					replaceInnerBlocks(
						clientId,
						createBlocksFromInnerBlocksTemplate(
							nextVariation.innerBlocks
						),
						true
					);
				} }
			/>
		);

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}
		
		select( 'core/block-editor' ).getBlock( props.clientId ).innerBlocks.map( childrenBlock => {
  			dispatch( 'core/block-editor' ).updateBlockAttributes( childrenBlock.clientId, {
 
				parentBlockName: props.name, 

  			} );
		} );

		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title='Colors' initialOpen={ true }>
					{ ! attributes.cardOutline && (
					<PanelRow>
						<p><strong>Select a background color:</strong></p>
					</PanelRow>
					) }
					{ ! attributes.cardOutline && (
					<PanelRow>
						<ColorPalette 
							colors = { siteColors }
							value={ attributes.cardColor.color }
							onChange={ ( value ) =>{
								var thisColor = getColorObjectByColorValue( siteColors, value );
								thisColor.slug = thisColor.slug.replace("border-", "bg-");
								setAttributes( { cardColor:thisColor, textColor:thisColor.text } );
								console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
					) }
					{ attributes.cardOutline && (
					<PanelRow>
						<p><strong>Select a border color:</strong></p>
					</PanelRow>
					) }
					{ attributes.cardOutline && (
					<PanelRow>
						<ColorPalette 
							colors = { siteColors }
							value={ attributes.cardColor.color }
							onChange={ ( value ) =>{
								var thisColor = getColorObjectByColorValue( siteColors, value );
								thisColor.slug = thisColor.slug.replace("bg-", "border-");
								setAttributes( { cardColor:thisColor, textColor:"" } );
								console.log(thisColor);
							} }
							disableCustomColors={ true }
							clearable={ false }
						/>
					</PanelRow>
					) }
					<PanelRow>
						<ToggleControl
							label='Card Fill'
							help={ attributes.cardOutline ? 'Card is outlined in color.' : 'Card is solid color.' }
							checked={ attributes.cardOutline }
							onChange={ () => {
								setAttributes( { cardOutline: !attributes.cardOutline } );
								//console.log(attributes.buttonOutline);
								
								if( !attributes.cardOutline === true ){
									var thisColor = getColorObjectByColorValue( siteColors, attributes.cardColor.color );
									thisColor.slug = thisColor.slug.replace("bg-", "border-");
									setAttributes( { cardColor:thisColor, textColor:"" } );
									console.log(thisColor);
								}else{
									var thisColor = getColorObjectByColorValue( siteColors, attributes.cardColor.color );
									thisColor.slug = thisColor.slug.replace("border-", "bg-");
									setAttributes( { cardColor:thisColor, textColor:thisColor.text } );
									console.log(thisColor);
								}
			
								//console.log(attributes.buttonColor);
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className={'card card-edit ' + attributes.textColor + ' ' + attributes.cardColor.slug }>
				<InnerBlocks allowedBlocks={ [ 'card/body', 'card/image', 'utksds/columns', 'card/topcap', ] } placeholder={ cardPlaceholder } templateLock={ 'all' } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className={'card ' + attributes.textColor + ' ' + attributes.cardColor.slug }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'card/main', {
	title: 'Card Main',
	parent: [ 'utksds/card' ],
	description: 'Inner blocks container for Card.',
	usesContext: [ 'columns/blockName', ],
	
	edit: ( { context } ) => {
		
		if( context['columns/blockName'] == 'utksds/columns' ){
			var columns_blocks = [ 'card/body', 'card/image', 'card/overlay', 'card/topcap', ];
		}else{
			var columns_blocks = [ 'card/body', 'card/image', 'utksds/columns', 'card/overlay', 'card/topcap', ];
		}
		
		return(
			<InnerBlocks allowedBlocks={ columns_blocks } placeholder={ 'Choose an image, body, or other card component to place here.' } templateLock={ false } renderAppender={ () => ( <div className="d-none"></div> ) } />
		);
	},
	
	save: ( { attributes } ) => {

		return (
			<InnerBlocks.Content />
		);
	},
} );

registerBlockType( 'card/body', {
	title: 'Card Body',
	parent: [ 'card/main'],
	icon: 'media-text',
	category: 'design',
	description: 'Contains all the text elements within a Card.',
	usesContext: [ 'card/cardColor', 'card/cardOutline', ],
	attributes: {
		textColor: {
			type: 'string',
		},
	},
				  
	edit: ( { attributes, context, setAttributes } ) => {
	
		if( context['card/cardOutline'] === true ){
			const thisColor = context['card/cardColor'].slug.replace('border-', 'text-');
			setAttributes( { textColor:thisColor } );
		}
		
		if( context['card/cardOutline'] === false ){
			attributes.textColor = '';
		}
	
		return (
			<div className={ 'card-body ' + attributes.textColor }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } placeholder={ 'Click the + button to add a title, text, button, or other body component.' } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
		)
	},
	
	save: ( { attributes } ) => {
		return (
			<div className={ 'card-body ' + attributes.textColor }>
				<InnerBlocks.Content />
			</div>
		);
	},
			
} );

registerBlockType( 'card/paragraph', {
	title: 'Paragraph',
	parent: [ 'card/body' ],
	icon: 'editor-paragraph',
	category: 'design',
				  
	edit: () => {
		return (
			<InnerBlocks template={ PARAGRAPH_TEMPLATE } allowedBlocks={ 'core/paragraph' } templateLock={ 'all' } />
		)
	},
	
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
			
} );
		
registerBlockType( 'card/heading', {
	title: 'Heading',
	parent: [ 'card/body' ],
	icon: 'heading',
	category: 'design',
				  
	edit: () => {
		return (
			<InnerBlocks template={ HEADING_TEMPLATE } allowedBlocks={ 'core/heading' } templateLock={ 'all' } />
		)
	},
	
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
			
} );
		
registerBlockType( 'card/image', {
	title: 'Image',
	parent: [ 'utksds/card' ],
	icon: (<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" role="img" aria-hidden="true" focusable="false"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM5 4.5h14c.3 0 .5.2.5.5v8.4l-3-2.9c-.3-.3-.8-.3-1 0L11.9 14 9 12c-.3-.2-.6-.2-.8 0l-3.6 2.6V5c-.1-.3.1-.5.4-.5zm14 15H5c-.3 0-.5-.2-.5-.5v-2.4l4.1-3 3 1.9c.3.2.7.2.9-.1L16 12l3.5 3.4V19c0 .3-.2.5-.5.5z"></path></svg>),
	category: 'design',
				  
	edit: () => {
		return (
			<InnerBlocks template={ IMAGE_TEMPLATE } allowedBlocks={ 'core/image' } templateLock={ 'all' } />
		)
	},
	
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
			
} );
		
registerBlockType( 'card/topcap', {
	title: 'Image Cap Top',
	parent: [ 'utksds/card' ],
	icon: (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 18h6v6h-6v-6zm-9 6h6v-6h-6v6zm-9 0h6v-6h-6v6zm0-8h24v-16h-24v16z"/></svg>),
	category: 'design',
				  
	edit: () => {
		return (
			<InnerBlocks template={ TOP_CAP_TEMPLATE } allowedBlocks={ 'core/image' } templateLock={ 'all' } />
		)
	},
	
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
			
} );

registerBlockType( 'card/header', {
	title: 'Card Header',
	parent: [ 'utksds/card' ],
	icon: 'table-row-before',
	category: 'design',
	supports: {
    	className: false,
	},
	attributes: {
		content: {
			type: 'string',
		},
		tagName: {
			type: 'string',
			default: 'div'
		}
	},
	
	edit: ( { attributes, setAttributes } ) => {
		
		return( [
			<InspectorControls>
				<PanelBody title='Card Header' initialOpen={ true }>
					<PanelRow>
						<SelectControl
							label='Type'
							options={ [
								{ label: 'Div', value: 'div'},
								{ label: 'H5', value: 'h5'},
								{ label: 'H4', value: 'h4'},
								{ label: 'H3', value: 'h3'},
								{ label: 'H2', value: 'h2'},
								{ label: 'H1', value: 'h1'},
							] }
							value={ attributes.tagName }
							onChange={ ( value ) =>{ 
								setAttributes( { tagName:value } );
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<RichText 
				tagName={ attributes.tagName }
				className={ 'card-header' }
				placeholder='Type header here'
				value={ attributes.content }
				onChange={ ( value ) =>{ 
					setAttributes( { content:value } );
				} }
				withoutInteractiveFormatting
			/>
		] );
	},
				  
	save: ( { attributes } ) => {
		return( 
			<RichText.Content 
				tagName={ attributes.tagName } 
				className={ 'card-header' }
				value={ attributes.content }
			/>
		);
	},
} );
	
registerBlockType( 'card/footer', {
	title: 'Card Footer',
	parent: [ 'utksds/card' ],
	icon: 'table-row-after',
	category: 'design',
	supports: {
    	className: false,
	},
	attributes: {
		content: {
			type: 'string',
		},
		muted: {
			type: 'boolean',
			default: false,
		},
		mutedClass: {
			type: 'string',
			default: '',
		}
	},
	
	edit: ( { attributes, setAttributes } ) => {
		return( [
			<InspectorControls>
				<PanelBody title='Card Footer' initialOpen={ true }>
					<PanelRow>
						<ToggleControl
							label='Muted Text'
							help={ attributes.muted ? 'Text is muted.' : 'Button is not muted.' }
							checked={ attributes.muted }
							onChange={ () => {
								setAttributes( { muted: !attributes.muted } );
								
								if( !attributes.muted === true ){
									setAttributes( { mutedClass:'text-muted' } );
								}else{
									setAttributes( { mutedClass:'' } );
								}
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			<RichText 
				tagName='div'
				className={ 'card-footer ' + attributes.mutedClass }
				placeholder='Type footer here'
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				withoutInteractiveFormatting
			/>
		] );
	},
				  
	save: ( { attributes } ) => {
		return <RichText.Content tagName="div" className={ 'card-footer ' + attributes.mutedClass } value={ attributes.content } />;
	},
} );