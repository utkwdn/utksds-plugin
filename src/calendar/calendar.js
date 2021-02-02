const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText } = wp.editor;
const { PanelBody, PanelRow, RangeControl, RadioControl, TextControl, SelectControl } = wp.components;
const { withState } = wp.compose;
const ALLOWED_BLOCKS = [  'core/button', 'core/separator', 'core/paragraph', 'core/heading', 'utksds/columns' ];

//import apiFetch from '@wordpress/api-fetch';

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

import all_places from './places.js';
import all_groups from './groups.js';
import all_departments from './departments.js';

//console.log(all_places);
		
registerBlockType( 'utksds/calendar', {
	title: 'Calendar',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>,
  category: 'media',
	attributes: {
		deptShortname: {
			type: 'string',
			default: '',
		},
		calTemplate: {
			type: 'string',
			default: 'modern',
		},
		department: {
			type: 'string',
			default: '',
		},
		place: {
			type: 'string',
			default: '',
		},
		group: {
			type: 'string',
			default: '',
		},
	},	 
	edit: ( { attributes, setAttributes } ) => {
		const { deptShortname } = attributes;
		const { calTemplate } = attributes;

		function ondeptShortnameChange( newValue ) {
			setAttributes( { deptShortname: newValue } );
		}
		function onCalTemplateChange( newValue ) {
			setAttributes( { calTemplate: newValue } );
		}		
		return ( [
			<InspectorControls>
				<PanelBody title='Department'>
        <TextControl
            label="Department Shortname"
            value={ deptShortname }
        		help="This can be found in the department's calendar URL."
            onChange={ ondeptShortnameChange }
        />
				</PanelBody>

        <PanelBody title='Style'>
				<RadioControl
      		label="Template"
      		selected={ calTemplate }
      		options={ [
      			{ label: 'Default', value: 'modern' },
      			{ label: 'Cards', value: 'hill-cards' },
      			{ label: 'List', value: 'hill-list' },
      			{ label: 'Alternate List', value: 'hill-list-alt' },
      			{ label: 'Modern', value: 'hill-modern' },
      			{ label: 'Modern No Description', value: 'hill-modern-no-description' },
      			{ label: 'Simple List', value: 'hill-simple-list' },
      		] }
      		onChange={ onCalTemplateChange }
      	/>
				</PanelBody>
				<PanelBody title='Content'>
					<SelectControl
						label='Group'
						value={ attributes.group }
						options={ all_groups }
						onChange={ ( value ) =>{ setAttributes( {group:value} ); } }
					/>
					<SelectControl
						label='Department'
						value={ attributes.department }
						options={ all_departments }
						onChange={ ( value ) =>{ setAttributes( {department:value} ); } }
					/>
					<SelectControl
						label='Place'
						value={ attributes.place }
						options={ all_places }
						onChange={ ( value ) =>{ setAttributes( {place:value} ); } }
					/>
				</PanelBody>


			</InspectorControls>,
		  <div className="container bg-light p-4">
		    <code>
		      {"https://calendar.utk.edu/widget/view?schools=utk&venues=" + attributes.place + "&departments=" +  deptShortname  + "&days=31&num=5&container=localist-widget-37654425&template=" + calTemplate }
		    </code>
			  <div id={"localist-widget" + deptShortname} className="localist-widget"></div><script defer type="text/javascript" src={"https://calendar.utk.edu/widget/view?schools=utk" + String.fromCharCode(38) + "departments=" +  deptShortname  + String.fromCharCode(38) +"days=31" + String.fromCharCode(38) + "num=5" + String.fromCharCode(38) + "container=localist-widget" + deptShortname + String.fromCharCode(38) +"template=" + calTemplate}></script>
		  </div>,
		] );



		return ( [
			<InspectorControls>
				
			</InspectorControls>,
		  <div className={ calTemplate }>
				<InnerBlocks allowedBlocks={ ALLOWED_BLOCKS } />
			</div>,
		] );		
	},
	
	save: ( { attributes } ) => {
		const { deptShortname } = attributes;
		const { calTemplate } = attributes;

		return (
			<div className={ deptShortname }>
			  <div className="container p-4">
				  <div id={"localist-widget" + deptShortname} className="localist-widget"></div><script defer type="text/javascript" src={"https://calendar.utk.edu/widget/view?schools=utk" + String.fromCharCode(38) + "departments=" +  deptShortname  + String.fromCharCode(38) +"days=31" + String.fromCharCode(38) + "num=5" + String.fromCharCode(38) + "container=localist-widget" + deptShortname + String.fromCharCode(38) +"template=" + calTemplate}></script>
				</div>
			</div>
		);
	},
			
} );
