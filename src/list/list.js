// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;
const { addFilter } = wp.hooks;
const { createHigherOrderComponent } = wp.compose;
const { Fragment } = wp.element;
const { InspectorControls } = wp.blockEditor;
const { RadioControl, PanelBody, PanelRow } = wp.components;

const allowedBlocks = [ 'core/list' ];

/*registerBlockStyle('core/list', {
	name: 'list-roman',
	label: 'Roman Numerals'
} );

registerBlockStyle('core/list', {
	name: 'list-letters',
	label: 'Letters'
} );*/

function addSupports( settings ) {
	/*check if object exists for old Gutenberg version compatibility
	add allowedBlocks restriction*/
	if( typeof settings.supports !== 'undefined' && allowedBlocks.includes( settings.name ) ){
		settings.supports = Object.assign( settings.supports, {
			defaultStylePicker:false,
			fontSize:false,
			color:{
				background:false,
				text:false,
			},
		});
	}
	
	return settings;
}

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-supports',
	addSupports
);

const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		
		if( ! allowedBlocks.includes(props.name)){
			return (
				<BlockEdit { ...props } />
			);
		}
		
		const {
			attributes,
			setAttributes,
			isSelected,
		} = props;
		
		return (
			<Fragment>
				<BlockEdit { ...props } />
				{ isSelected && allowedBlocks.includes( props.name ) && attributes.ordered === true && (
				<InspectorControls>
					<PanelBody initialOpen={ true }>
						<RadioControl
							label='Order Format:'
							selected={ attributes.className }
							options={
								[
									{label: 'Default', value: '' },
									{label: 'Roman Numerals', value: 'is-style-list-roman' },
									{label: 'Letters', value: 'is-style-list-letters' },
								]
							}
							onChange={ (newValue) => setAttributes( { className: newValue } ) }
						/>
					</PanelBody>
				</InspectorControls>
				) }
				{ isSelected && allowedBlocks.includes( props.name ) && attributes.ordered === false && (
				attributes.className = ''
				) }
			</Fragment>
		);

	};
}, 'withAdvancedControls');

addFilter(
	'editor.BlockEdit',
	'editorskit/custom-advanced-control',
	withAdvancedControls
);