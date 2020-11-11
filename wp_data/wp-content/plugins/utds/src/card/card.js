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

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

registerBlockType( 'card/main', {
	title: 'Card',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 0v2h-18v18h-2v-20h20zm-7.281 20.497l-.719 3.503 3.564-.658-2.845-2.845zm8.435-8.436l2.846 2.845-7.612 7.612-2.845-2.845 7.611-7.612zm-17.154-8.061v20h6v-2h-4v-16h16v4.077l2 2v-8.077h-20z"/></svg>,
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
		
/*registerBlockType( 'card/image', {
	title: 'Image',
	parent: [ 'card/main' ],
	icon: 'format-image',
				  
	edit: () => {
		return ( [
			<InspectorControls>
				<PanelBody title='Image Cap' children={ CardImgPosition } >

				</PanelBody>
			</InspectorControls>,
			<InnerBlocks template={ IMAGE_TEMPLATE } allowedBlocks={ 'core/image' } templateLock={ 'all' } />,
		] );
	},
	
	save: () => {
		return (
			<InnerBlocks.Content />
		);
	},
			
} );*/
		
registerBlockType( 'card/image', {
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
			
} );

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