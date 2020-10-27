import './editor.scss';

/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
const { Fragment }	= wp.element;
const { InspectorControls }	= wp.editor;
const { createHigherOrderComponent } = wp.compose;
const { RadioControl } = wp.components;

//restrict to specific block names
const allowedBlocks = [ 'core/button' ];

/**
 * Add custom attributes to allow settings for Bootstrap button attributes, including color, fill, and size.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
function addAttributes( settings ) {
	
	/*check if object exists for old Gutenberg version compatibility
	add allowedBlocks restriction*/
	if( typeof settings.attributes !== 'undefined' && allowedBlocks.includes( settings.name ) ){
	
		settings.attributes = Object.assign( settings.attributes, {
			btnColor:{
				type: 'string',
				default: 'btn-primary',
			},
			btnFill:{ 
				type: 'string',
				default: 'btn-fill',
			},
			btnSize:{ 
				type: 'string',
				default: 'btn-normal',
			},
		});
    
	}

	return settings;
}

/**
 * Add selectors for color, fill, and size.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {

		const {
			name,
			attributes,
			setAttributes,
			isSelected,
		} = props;

		const {
			btnColor,
			btnFill,
			btnSize,
		} = attributes;
		
		
		return (
			<Fragment>
				<BlockEdit {...props} />
				{ isSelected && allowedBlocks.includes( name ) &&
					<InspectorControls>
						<RadioControl
							label='Button color:'
							selected={ btnColor }
							options={
								[
									{label: 'Primary', value: 'btn-primary' },
									{label: 'Secondary', value: 'btn-secondary' },
									{label: 'Success', value: 'btn-success' },
									{label: 'Danger', value: 'btn-danger' },
									{label: 'Warning', value: 'btn-warning' },
									{label: 'Info', value: 'btn-info' },
									{label: 'Light', value: 'btn-light' },
									{label: 'Dark', value: 'btn-dark' },
								]
							}
							onChange={ (newValue) => setAttributes( { btnColor: newValue } ) }
						/>
						<RadioControl
							label='Button fill type:'
							selected={ btnFill }
							options={
								[
									{label: 'Solid', value: 'btn-fill' },
									{label: 'Outline', value: 'btn-outline' },
									{label: 'Text', value: 'btn-link' },
								]
							}
							onChange={ (newValue) => setAttributes( { btnFill: newValue } ) }
						/>
						<RadioControl
							label='Button size:'
							selected={ btnSize }
							options={
								[
									{label: 'Small', value: 'btn-sm' },
									{label: 'Normal', value: 'btn-normal' },
									{label: 'Large', value: 'btn-lg' },
									{label: 'Block', value: 'btn-block' },
								]
							}
							onChange={ (newValue) => setAttributes( { btnSize: newValue } ) }
						/>
					</InspectorControls>
				}

			</Fragment>
		);
	};
}, 'withAdvancedControls');

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
function applyExtraClass( extraProps, blockType, attributes ) {

	const { btnFill, btnColor, btnSize } = attributes;
	
	//check if attribute exists for old Gutenberg version compatibility
	//add class only when visibleOnMobile = false
	//add allowedBlocks restriction
	if ( typeof btnFill !== 'undefined' && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, btnFill );
	}
	if ( typeof btnColor !== 'undefined' && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, btnColor );
	}
	if ( typeof btnSize !== 'undefined' && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, btnSize );
	}

	return extraProps;
}

//add filters

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-attributes',
	addAttributes
);

addFilter(
	'editor.BlockEdit',
	'editorskit/custom-advanced-control',
	withAdvancedControls
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'editorskit/applyExtraClass',
	applyExtraClass
);