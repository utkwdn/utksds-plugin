const { registerBlockType } = wp.blocks;
const { InspectorControls, ColorPalette, RichText } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, RadioControl } = wp.components;
const { withState } = wp.compose;

/*
const alertImgPosition = withState( {
	option: 'alert-img-top',
} )( ( { option, setState } ) => (
	<RadioControl
		label="Image Position"
		help="The placement of the image on the alert."
		selected={ option }
		options={ [
			{ label: 'Top', value: 'alert-img-top' },
			{ label: 'Bottom', value: 'alert-img-bottom' },
		] }
		onChange={ ( option ) => { setState( { option } ) } }
	/>
) );
*/

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';



		
		
registerBlockType( 'horizontal-rule/main', {
	title: 'Separator',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-hr" viewBox="0 0 16 16"><path d="M12 3H4a1 1 0 0 0-1 1v2.5H2V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2.5h-1V4a1 1 0 0 0-1-1zM2 9.5h1V12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V9.5h1V12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5zm-1.5-2a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1H.5z"/></svg>,
  category: 'design',
	supports: {
		html: false,
	},
	attributes: {
		imagePostion: {
			type: 'string',
			default: 'hr',
		},
	},
				  
	edit: ( { attributes, setAttributes } ) => {
		const { imagePostion } = attributes;

		function onImagePositionChange( newValue ) {
			setAttributes( { imagePostion: newValue } );
		}
		
		return ( [
			<InspectorControls>
				<PanelBody title='Style'>
				<RadioControl
      		label="Color"
//      		help="The separator (horizontal rule) style."
      		selected={ imagePostion }
      		options={ [
      			{ label: 'Standard', value: 'hr' },
      			{ label: 'Orange Hash', value: 'orange-separator' },
      			{ label: 'Big Orange', value: 'orange-hash' },
      		] }
      		onChange={ onImagePositionChange }
      	/>
				</PanelBody>
			</InspectorControls>,
		  <hr className={ imagePostion } />
			,
		] );
	},
	
	save: ( { attributes } ) => {
		const { imagePostion } = attributes;
		
		return (
		  <hr className={ imagePostion } />
		);
	},
			
} );
