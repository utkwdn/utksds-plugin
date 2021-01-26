import { dispatch } from '@wordpress/data';
import { select } from '@wordpress/data';
import { Path, SVG } from '@wordpress/components';

const { registerBlockType, registerBlockVariation } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText, getColorObjectByColorValue } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, RadioControl, ToggleControl } = wp.components;
const { withState } = wp.compose;
const { ALLOWED_BLOCKS } = [ 'core/button', 'core/separator', 'card/paragraph', 'card/heading' ];

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

const bgColors = [
	{ name: 'Primary', slug: 'bg-primary', color: '#58595b'},
	{ name: 'Secondary', slug: 'bg-secondary', color: '#006c93'},
	{ name: 'Light', slug: 'bg-light', color: '#F6F6F6'},
	{ name: 'Dark', slug: 'bg-dark', color: '#4b4b4b'},
];

const borderColors = [
	{ name: 'Primary', slug: 'border-primary', color: '#58595b'},
	{ name: 'Secondary', slug: 'border-secondary', color: '#006c93'},
	{ name: 'Light', slug: 'border-light', color: '#F6F6F6'},
	{ name: 'Dark', slug: 'border-dark', color: '#4b4b4b'},
];

const textColors = [
	{ name: 'Primary', slug: 'text-primary', color: '#58595b'},
	{ name: 'Secondary', slug: 'text-secondary', color: '#006c93'},
	{ name: 'Light', slug: 'text-light', color: '#F6F6F6'},
	{ name: 'Dark', slug: 'text-dark', color: '#4b4b4b'},
];

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
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 0v2h-18v18h-2v-20h20zm-7.281 20.497l-.719 3.503 3.564-.658-2.845-2.845zm8.435-8.436l2.846 2.845-7.612 7.612-2.845-2.845 7.611-7.612zm-17.154-8.061v20h6v-2h-4v-16h16v4.077l2 2v-8.077h-20z"/></svg>,
	category: 'utdesign_system',
	description: '',
	attributes: {
		blockName: {
			type: 'string',
			default: 'utksds/card',
		},
		cardColor: {
			type: 'object',
			default: { name: 'Primary', slug: 'bg-primary', color: '#58595b'},
		},
		cardOutline: {
			type: 'boolean',
			default: false,
		},
	},
	providesContext: {
    	'card/blockName': 'blockName',
		'card/cardColor': 'cardColor',
		'card/cardOutline': 'cardOutline',
	},

	edit: ( props ) => {
		//const { backgroundColor } = attributes;
		const {
    		attributes,
			clientId,
			name,
    		setAttributes
  		} = props;

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}
		
		select( 'core/editor' ).getBlock( props.clientId ).innerBlocks.map( childrenBlock => {
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
							colors = { bgColors }
							value={ attributes.cardColor.color }
							onChange={ ( value ) =>{
								const thisColor = getColorObjectByColorValue( bgColors, value );
								setAttributes( { cardColor:thisColor } );
								//console.log(thisColor);
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
							colors = { borderColors }
							value={ attributes.cardColor.color }
							onChange={ ( value ) =>{
								const thisColor = getColorObjectByColorValue( borderColors, value );
								setAttributes( { cardColor:thisColor } );
								//console.log(thisColor);
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
									const thisColor = getColorObjectByColorValue( borderColors, attributes.cardColor.color );
									setAttributes( { cardColor:thisColor } );
								}else{
									const thisColor = getColorObjectByColorValue( bgColors, attributes.cardColor.color );
									setAttributes( { cardColor:thisColor } );
								}
			
								//console.log(attributes.buttonColor);
							} }
						/>
					</PanelRow>
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className={'card card-edit ' + attributes.cardColor.slug }>
				<InnerBlocks allowedBlocks={ [ 'card/body', 'card/image', 'utksds/columns', 'card/overlay', 'card/topcap', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className={'card ' + attributes.cardColor.slug }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'card/body', {
	title: 'Card Body',
	parent: [ 'card/main' ],
	icon: 'media-text',
	description: 'Contains all the text elements within a Card.',
	usesContext: [ 'card/cardColor', 'card/cardOutline', ],
	attributes: {
		textColor: {
			type: 'string',
		},
	},
				  
	edit: ( { attributes, context, setAttributes } ) => {
	
		if( context['card/cardOutline'] === true ){
			const thisColor = getColorObjectByColorValue( textColors, context['card/cardColor'].color );
			setAttributes( { textColor:thisColor.slug } );
		}
		
		if( context['card/cardOutline'] === false ){
			attributes.textColor = '';
		}
	
		return (
			<div className={ 'card-body ' + attributes.textColor }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
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

registerBlockType( 'card/overlay', {
	title: 'Card Overlay',
	parent: [ 'card/main' ],
	icon: 'media-text',
	description: 'Contains all the text elements that overlay an image in a Card.',
				  
	edit: () => {
		return (
			<div className="card-img-overlay">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
		)
	},
	
	save: () => {
		return (
			<div className="card-img-overlay">
				<InnerBlocks.Content />
			</div>
		);
	},
			
} );

registerBlockType( 'card/paragraph', {
	title: 'Paragraph',
	parent: [ 'card/body' ],
	icon: 'editor-paragraph',
				  
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

/*registerBlockType( 'card/header', {
	title: 'Card Header',
	parent: [ 'card/main' ],
	icon: 'table-row-before',
	attributes: {
		content: {
			source: 'html',
			selector: 'div',
		},
	},
	
	edit: ( { className, attributes, setAttributes } ) => {
		return(
			<RichText 
				tagName='div'
				className={ className, 'card-header' }
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				formattingControls={ [] }
			/>
		);
	},
				  
	save: ( { className, attributes } ) => {
		return <RichText.Content tagName="div" className="card-header card-header" value={ attributes.content } />;
	},
} );
	
registerBlockType( 'card/footer', {
	title: 'Card Footer',
	parent: [ 'card/main' ],
	icon: 'table-row-after',
	attributes: {
		content: {
			source: 'html',
			selector: 'div',
		},
	},
	
	edit: ( { className, attributes, setAttributes } ) => {
		return(
			<RichText 
				tagName='div'
				className={ className, 'card-footer' }
				value={ attributes.content }
				onChange={ ( content ) => setAttributes( { content } ) }
				formattingControls={ [] }
			/>
		);
	},
				  
	save: ( { className, attributes } ) => {
		return <RichText.Content tagName="div" className="card-footer card-footer" value={ attributes.content } />;
	},
} );*/