const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText } = wp.editor;
const { PanelBody, PanelRow, RangeControl, RadioControl } = wp.components;
const { withState } = wp.compose;
const ALLOWED_BLOCKS = [ 'core/button', 'core/separator', 'card/paragraph', 'card/heading' ];

const PARAGRAPH_TEMPLATE = [
    [ 'core/paragraph', { className: 'card-text' } ],
];

const IMAGE_TEMPLATE = [
	[ 'core/image', { className: 'card-img-top' } ],
]

const HEADING_TEMPLATE = [
	[ 'core/heading', { className: 'card-title' } ],
];

/*
const CardImgPosition = withState( {
	option: 'card-img-top',
} )( ( { option, setState } ) => (
	<RadioControl
		label="Image Position"
		help="The placement of the image on the card."
		selected={ option }
		options={ [
			{ label: 'Top', value: 'card-img-top' },
			{ label: 'Bottom', value: 'card-img-bottom' },
		] }
		onChange={ ( option ) => { setState( { option } ) } }
	/>
) );
*/

import './style.scss';
import './editor.scss';

registerBlockType( 'card/main', {
	title: 'Card',
	icon: 'heart',
	category: 'utdesign_system',
	description: '',
	attributes: {
		backgroundColor: {
			type: 'string',
			default: 'gray',
		},
	},

	edit: ( { attributes, setAttributes } ) => {
		const { backgroundColor } = attributes;

		function onBackgroundColorChange( newColor ) {
			setAttributes( { backgroundColor: newColor } );
		}

		return ( [
			// eslint-disable-next-line react/jsx-key
			<InspectorControls style={ { marginBottom: '40px' } }>
				<PanelBody title={ 'Background Color Settings' }>
					<p><strong>Select a Background color:</strong></p>
					<ColorPalette value={ backgroundColor }
						onChange={ onBackgroundColorChange } />
				</PanelBody>
			</InspectorControls>,
			// eslint-disable-next-line react/jsx-key
			<div className="card card-edit" style={ { background: backgroundColor } }>
				<InnerBlocks allowedBlocks={ [ 'card/body', 'card/header', 'card/footer', 'card/image' ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>,
		] );
	},

	save: ( { attributes } ) => {
		const { backgroundColor } = attributes;

		return (
			<div className="card" style={ { background: backgroundColor } }>
				<InnerBlocks.Content />
			</div>
		);
	},
} );

registerBlockType( 'card/body', {
	title: 'Card Body',
	parent: [ 'card/main' ],
	icon: 'media-text',
				  
	edit: () => {
		return (
			<div className="card-body">
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } templateLock={ false } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
		)
	},
	
	save: () => {
		return (
			<div className="card-body">
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
	parent: [ 'card/main' ],
	icon: 'format-image',
	attributes: {
		imagePostion: {
			type: 'string',
			default: 'card-img-top',
		},
	},
				  
	edit: ( { attributes, setAttributes } ) => {
		const { imagePostion } = attributes;

		function onImagePositionChange( newValue ) {
			setAttributes( { imagePostion: newValue } );
		}
		
		return ( [
			<InspectorControls>
				<PanelBody title='Image Cap'>
				<RadioControl
		label="Image Position"
		help="The placement of the image on the card."
		selected={ imagePostion }
		options={ [
			{ label: 'Top', value: 'card-img-top' },
			{ label: 'Bottom', value: 'card-img-bottom' },
		] }
		onChange={ onImagePositionChange }
	/>
				</PanelBody>
			</InspectorControls>,
			<div className={ imagePostion }><InnerBlocks template={ IMAGE_TEMPLATE } allowedBlocks={ 'core/image' } templateLock={ 'all' } /></div>,
		] );
	},
	
	save: ( { attributes } ) => {
		const { imagePostion } = attributes;
		
		return (
			<InnerBlocks.Content />
		);
	},
			
} );
		
/*registerBlockType( 'card/image', {
	title: 'Image',
	parent: [ 'card/main' ],
	icon: 'format-image',
				  
	edit: () => {
		return ( <InnerBlocks template={ IMAGE_TEMPLATE } allowedBlocks={ 'core/image' } templateLock={ 'all' } /> );
	},
	
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
			
} );*/

registerBlockType( 'card/header', {
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
} );