import './editor.scss';
/**
 * External Dependencies
 */
//import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
//const { __ } = wp.i18n;
const { addFilter } = wp.hooks;
//const { Fragment }	= wp.element;
//const { InspectorControls }	= wp.blockEditor;
//const { createHigherOrderComponent } = wp.compose;
//const { RadioControl, ToggleControl, PanelBody, PanelRow } = wp.components;
const { registerBlockStyle, unregisterBlockStyle } = wp.blocks;

//restrict to specific block names
const allowedBlocks = [ 'core/table' ];

wp.domReady( function () {
	unregisterBlockStyle( 'core/table', 'regular' );
	unregisterBlockStyle( 'core/table', 'stripes' );
} );

registerBlockStyle('core/table', {
	name: 'table-striped',
	label: 'Striped'
} );

registerBlockStyle('core/table', {
	name: 'table-dark',
	label: 'Dark'
} );

/*registerBlockStyle('core/table', {
	name: 'table-dark is-style-table-striped',
	label: 'Dark Striped'
} );*/

function setBlockCustomClassName( className, blockName ) {
    return blockName === 'core/table' ? className + ' table' : className;
}
 
// Adding the filter
addFilter(
    'blocks.getBlockDefaultClassName',
    'utksds/set-table-class-name',
    setBlockCustomClassName
);

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
	/*if( typeof settings.attributes !== 'undefined' && allowedBlocks.includes( settings.name ) ){
	
		settings.attributes = Object.assign( settings.attributes, {
			tblDark:{
				type: 'boolean',
				default: false,
			},
			tblHeader:{ 
				type: 'string',
				default: 'thead-normal',
			},
			tblStripedbs:{ 
				type: 'boolean',
				default: 'false',
			},
			tblBorder:{ 
				type: 'string',
				default: 'table-nborder',
			},
			tblHover:{ 
				type: 'boolean',
				default: 'false',
			},
			tblSmall:{ 
				type: 'boolean',
				default: 'false',
			},
			tblResponsive:{ 
				type: 'boolean',
				default: 'true',
			},
		});
    
	}*/
	
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

/**
 * Add selectors for color, fill, and size.
 *
 * @param {function} BlockEdit Block edit component.
 *
 * @return {function} BlockEdit Modified block edit component.
 */
/*const withAdvancedControls = createHigherOrderComponent( ( BlockEdit ) => {
	return ( props ) => {
		
		if( ! allowedBlocks.includes(props.name)){
			return (
				<BlockEdit { ...props } />
			);
		}
		
		console.log(props);
		
		const {
			name,
			attributes,
			setAttributes,
			isSelected,
		} = props;

		const {
			tblDark,
			tblHeader,
			tblStripedbs,
			tblBorder,
			tblHover,
			tblSmall,
			tblResponsive,
			className,
		} = attributes;
		
		const blockProps = {
			...props,
			attributes: {
				...attributes,
				className: classnames( className, {
					'table-dark': tblDark,
					'table-striped': tblStripedbs,
					'table-hover': tblHover,
					'table-sm': tblSmall,
					'table-responsive': tblResponsive,
				}, tblHeader, tblBorder ),
			},
		};
		
		return (
			<Fragment>
				<BlockEdit {...blockProps} />
				{ isSelected && allowedBlocks.includes( name ) &&
					<InspectorControls>
						<PanelBody title='Table Properties' initialOpen={ true }>
						<ToggleControl
							label='Dark Colors'
							checked={ tblDark }
							onChange={ (newValue) =>{ 
								setAttributes( { tblDark: newValue } );
							} }
							help={ tblDark ? 'Dark Colors.' : 'Normal Colors.' }
						/>
						<RadioControl
							label='Table head color:'
							selected={ tblHeader }
							options={
								[
									{label: 'Light', value: 'thead-light' },
									{label: 'Normal', value: 'thead-normal' },
									{label: 'Dark', value: 'thead-dark' },
								]
							}
							onChange={ (newValue) => setAttributes( { tblHeader: newValue } ) }
						/>
						<ToggleControl
							label='Striped rows'
							checked={ tblStripedbs }
							onChange={ (newValue) => setAttributes( { tblStripedbs: newValue } ) }
							help={ tblStripedbs ? 'Striped Rows.' : 'Normal Rows.' }
						/>
						<RadioControl
							label='Table border:'
							selected={ tblBorder }
							options={
								[
									{label: 'No Border', value: 'table-borderless' },
									{label: 'Normal Border', value: 'table-nborder' },
									{label: 'Extra Border', value: 'table-bordered' },
								]
							}
							onChange={ (newValue) => setAttributes( { tblBorder: newValue } ) }
						/>
						<ToggleControl
							label='Hoverable rows'
							checked={ tblHover }
							onChange={ (newValue) => setAttributes( { tblHover: newValue } ) }
							help={ tblHover ? 'Hoverable Rows.' : 'Normal Rows.' }
						/>
						<ToggleControl
							label='Small table'
							checked={ tblSmall }
							onChange={ (newValue) => setAttributes( { tblSmall: newValue } ) }
							help={ tblSmall ? 'Small Size.' : 'Normal Size.' }
						/>
						<ToggleControl
							label='Responsive table'
							checked={ tblResponsive }
							onChange={ (newValue) => setAttributes( { tblResponsive: newValue } ) }
							help={ tblResponsive ? 'Responsive.' : 'Non-Responsive.' }
						/>
						</PanelBody>
					</InspectorControls>
				}

			</Fragment>
		);
	};
}, 'withAdvancedControls');*/

/**
 * Add custom element class in save element.
 *
 * @param {Object} extraProps     Block element.
 * @param {Object} blockType      Blocks object.
 * @param {Object} attributes     Blocks attributes.
 *
 * @return {Object} extraProps Modified block element.
 */
/*function applyExtraClass( extraProps, blockType, attributes ) {

	const { tblDark, tblHeader, tblStripedbs, tblBorder, tblHover, tblSmall, tblResponsive } = attributes;
	
	//check if attribute exists for old Gutenberg version compatibility
	//add class only when visibleOnMobile = false
	//add allowedBlocks restriction
	if ( typeof tblDark !== 'undefined' && tblDark == true && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, 'table-dark' );
	}
	if ( typeof tblHeader !== 'undefined' && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, tblHeader );
	}
	if ( typeof tblStripedbs !== 'undefined' && tblStripedbs == true && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, 'table-striped' );
	}
	if ( typeof tblBorder !== 'undefined' && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, tblBorder );
	}
	if ( typeof tblHover !== 'undefined' && tblHover == true && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, 'table-hover' );
	}
	if ( typeof tblSmall !== 'undefined' && tblSmall == true && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, 'table-sm' );
	}
	if ( typeof tblResponsive !== 'undefined' && tblResponsive == true && allowedBlocks.includes( blockType.name ) ) {
		extraProps.className = classnames( extraProps.className, 'table-responsive' );
	}

	return extraProps;
}*/

//add filters

addFilter(
	'blocks.registerBlockType',
	'editorskit/custom-attributes',
	addAttributes
);

/*addFilter(
	'editor.BlockEdit',
	'editorskit/custom-advanced-control',
	withAdvancedControls
);

addFilter(
	'blocks.getSaveContent.extraProps',
	'editorskit/applyExtraClass',
	applyExtraClass
);*/