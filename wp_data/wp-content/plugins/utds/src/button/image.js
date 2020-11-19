const { createHigherOrderComponent } = wp.compose;
const { Fragment, createContext, useContext } = wp.element;
const { addFilter } = wp.hooks;
const { InspectorControls, withBlockEditContext }	= wp.editor;
const { PanelBody, PanelRow, RadioControl } = wp.components;

//restrict to specific block names
const allowedBlocks = [ 'core/image' ];

function addImageContext( settings ) {
	
	if( allowedBlocks.includes( settings.name ) ){
	
		settings.usesContext = Object.assign( settings.usesContext, ['card/blockName'] );
		
		settings.attributes = Object.assign( settings.attributes, {
			imagePostion:{
				type: 'string',
				default: '',
			},
		});
		
		/*settings.edit = Object.assign( settings.edit, 
			( { attributes, setAttributes, context } ) => {
				console.log('Image context: ', context);
			}
		);*/
		
		//console.log('Current settings: ', settings.edit);
    
	}
	
	console.log('Current settings: ', settings);

	return settings;
}

const addImageControls =  createHigherOrderComponent( ( BlockEdit ) => {
    return ( props ) => {
		
		const {
			name,
			attributes,
			setAttributes,
			context,
			isSelected,
		} = props;
		
		const {
			imagePostion,
		} = attributes;
		
		if(allowedBlocks.includes( props.name )){
			console.log('Current context: ', props);
		}
		
        return (
            <Fragment>
                <BlockEdit { ...props } />
				{ isSelected && allowedBlocks.includes( name ) &&
                <InspectorControls>
                    <PanelBody title='Image Cap'>
                        //My custom control
                    </PanelBody>
                </InspectorControls>
				}
            </Fragment>
        );
    };
}, "addImageControls" );

/*function addImageControls ( settings, attributes, context ) {
	if( allowedBlocks.includes( settings.name ) ){
		if( context['card/blockName'] == 'card' ){
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
			] );
			
		}
		
		return( 
			<div className={'imageContext ' + context['card/blockName'] }></div>
		);
	}
}*/

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