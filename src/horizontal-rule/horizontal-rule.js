const { registerBlockType } = wp.blocks;
const { InspectorControls, ColorPalette, RichText } = wp.editor;
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
	title: 'Horizontal Rule',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 16v-8h-24v8h24zm-22-6h2v2h1v-2h2v3h1v-3h2v2h1v-2h2v2h1v-2h2v3h1v-3h2v2h1v-2h2v4h-20v-4z"/></svg>,
  category: 'utdesign_system',
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
      		help="The separator (horizontal rule) style."
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
