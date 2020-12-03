const { createHigherOrderComponent } = wp.compose;
const { Fragment, createContext, useContext } = wp.element;
const { addFilter } = wp.hooks;
const { InspectorControls, withBlockEditContext }	= wp.editor;
const { PanelBody, PanelRow, RadioControl } = wp.components;

//restrict to specific block names
const allowedBlocks = [ 'core/image' ];

function addImageContext( settings ) {
	
	if( allowedBlocks.includes( settings.name ) ){
		
		settings.attributes = Object.assign( settings.attributes, {
			imagePostion:{
				type: 'string',
				default: '',
			},
			parentBlockName:{
				type: 'string',
				default: '',
			},
		});
    
	}

	return settings;
}

const addImageControls =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
		
		const {
			name,
			attributes,
			setAttributes,
			isSelected,
		} = props;
		
		const {
			imagePostion,
			parentBlockName,
		} = attributes;
		
		function onImagePositionChange( newValue ) {
			setAttributes( { imagePostion: newValue } );
		}
		
        return (
            <Fragment>
                <BlockEdit { ...props } />
				{ isSelected && allowedBlocks.includes( name ) && typeof parentBlockName !== 'undefined' && parentBlockName == 'card/main' &&
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
                </InspectorControls>
				}
            </Fragment>
        );
    };
}, "addImageControls" );

function applyExtraClass( extraProps, blockType, attributes ) {
	
	const { imagePostion } = attributes;
	
	if ( typeof imagePostion !== 'undefined' && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, imagePostion );
	}
				 
	return extraProps;
}

addFilter(
	'blocks.registerBlockType',
	'gutenstrap/image-context',
	addImageContext
);
		
addFilter(
	'editor.BlockEdit',
	'gutenstrap/image-context',
	addImageControls
);
				 
addFilter(
	'blocks.getSaveContent.extraProps',
	'gutenstrap/imageExtraClass',
	applyExtraClass
);