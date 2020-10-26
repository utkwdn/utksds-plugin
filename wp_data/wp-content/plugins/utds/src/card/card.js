const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette } = wp.editor;
const { PanelBody, RangeControl } = wp.components;
const ALLOWED_BLOCKS = [ 'core/button', 'core/separator', 'card/paragraph', 'card/heading' ];

const PARAGRAPH_TEMPLATE = [
    [ 'core/paragraph', { className: 'card-text' } ],
];

const CARD_TEMPLATE = [
	[ 'core/image', { className: 'card-img-top' } ],
	[ 'card/body', {} ],
];

const HEADING_TEMPLATE = [
	[ 'core/heading', { className: 'card-title' } ],
];

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
				<InnerBlocks template={ CARD_TEMPLATE } allowedBlocks={ ALLOWED_BLOCKS } templateLock={ 'all' } />
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
	icon: 'text-page',
				  
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