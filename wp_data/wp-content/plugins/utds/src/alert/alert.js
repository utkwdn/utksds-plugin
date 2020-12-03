const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText } = wp.editor;
const { PanelBody, PanelRow, RangeControl, RadioControl } = wp.components;
const { withState } = wp.compose;
const ALLOWED_BLOCKS = [ 'core/paragraph' ];

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



		
		
registerBlockType( 'alert/main', {
	title: 'Alert',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 5.177l8.631 15.823h-17.262l8.631-15.823zm0-4.177l-12 22h24l-12-22zm-1 9h2v6h-2v-6zm1 9.75c-.689 0-1.25-.56-1.25-1.25s.561-1.25 1.25-1.25 1.25.56 1.25 1.25-.561 1.25-1.25 1.25z"/></svg>,
  category: 'utdesign_system',
	attributes: {
		imagePostion: {
			type: 'string',
			default: 'alert alert-primary',
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
      		help="The color of the alert."
      		selected={ imagePostion }
      		options={ [
      			{ label: 'Primary', value: 'alert alert-primary' },
      			{ label: 'Orange', value: 'alert alert-orange' },
      			{ label: 'Smokey', value: 'alert alert-smokey' },
      			{ label: 'Secondary', value: 'alert alert-secondary' },
      			{ label: 'Success', value: 'alert alert-success' },
      			{ label: 'Danger', value: 'alert alert-danger' },
      			{ label: 'Warning', value: 'alert alert-warning' },
      			{ label: 'Info', value: 'alert alert-info' },
      			{ label: 'Light', value: 'alert alert-light' },
      			{ label: 'Dark', value: 'alert alert-dark' },
      		] }
      		onChange={ onImagePositionChange }
      	/>
				</PanelBody>
			</InspectorControls>,
		  <div className={ imagePostion }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );
	},
	
	save: ( { attributes } ) => {
		const { imagePostion } = attributes;
		
		return (
			<InnerBlocks.Content />
		);
	},
			
} );
