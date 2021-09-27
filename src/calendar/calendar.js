const { registerBlockType } = wp.blocks;
const { InnerBlocks, InspectorControls, ColorPalette, RichText } = wp.blockEditor;
const { PanelBody, PanelRow, RangeControl, TextControl, SelectControl, CheckboxControl, SandBox } = wp.components;
const { createElement, } = wp.element;

// import './style.scss';
// Commenting out the front style, as it will be handled by the bootstrap css pulled in.
import './editor.scss';

import all_places from './places.js';
import all_groups from './groups.js';
import all_departments from './departments.js';

var hasLoadedExternalCal = false;
		
registerBlockType( 'utksds/calendar', {
	title: 'Calendar',
	icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M14 13h-4v-4h4v4zm6-4h-4v4h4v-4zm-12 6h-4v4h4v-4zm6 0h-4v4h4v-4zm-6-6h-4v4h4v-4zm16-8v13.386c0 2.391-6.648 9.614-9.811 9.614h-14.189v-23h24zm-2 6h-20v15h11.362c4.156 0 2.638-6 2.638-6s6 1.65 6-2.457v-6.543z"/></svg>,
  category: 'embed',
	supports: {
		html: false,
	},
	attributes: {
		calTemplate: {
			type: 'string',
			default: '',
		},
		numResults:{
			type: 'number',
			default: 5
		},
		daysAhead:{
			type: 'number',
			default: 31
		},
		department: {
			type: 'array',
			default: '',
		},
		place: {
			type: 'array',
			default: '',
		},
		group: {
			type: 'array',
			default: '',
		},
		type: {
			type: 'array',
			default: '',
		},
		topic: {
			type: 'array',
			default: '',
		},
		audience: {
			type: 'array',
			default: '',
		},
		all_types: {
			type: 'array',
			default: '',
		},
		keywords: {
			type: 'string',
			default: '',
		},
		featured: {
			type: 'boolean',
			default: false,
		},
		featuredS: {
			type: 'string',
			default: '',
		},
		sponsored: {
			type: 'boolean',
			default: false,
		},
		sponsoredS: {
			type: 'string',
			default: '',
		},
		matching: {
			type: 'boolean',
			default: false,
		},
		matchingS: {
			type: 'string',
			default: '',
		},
		past: {
			type: 'boolean',
			default: false,
		},
		pastS: {
			type: 'string',
			default: '',
		},
		mustMatch: {
			type: 'string',
			default: '',
		},
		exType: {
			type: 'array',
			default: '',
		},
		exTopic: {
			type: 'array',
			default: '',
		},
		exAudience: {
			type: 'array',
			default: '',
		},
		exAll_types: {
			type: 'array',
			default: '',
		},
		widgetType: {
			type: 'string',
			default: 'view',
		},
		style: {
			type: 'string',
			default: 'modern',
		},
		template: {
			type: 'string',
			default: 'modern',
		},
		hideDesc: {
			type: 'boolean',
			default: false,
		},
		hideDescS: {
			type: 'string',
			default: '',
		},
		truncate: {
			type: 'boolean',
			default: false,
		},
		truncateS: {
			type: 'string',
			default: '',
		},
		htmlDesc: {
			type: 'boolean',
			default: false,
		},
		htmlDescS: {
			type: 'string',
			default: '',
		},
		evImage: {
			type: 'boolean',
			default: false,
		},
		evImageS: {
			type: 'string',
			default: '',
		},
		evTime: {
			type: 'boolean',
			default: false,
		},
		evTimeS: {
			type: 'string',
			default: '',
		},
		viewAll: {
			type: 'boolean',
			default: false,
		},
		viewAllS: {
			type: 'string',
			default: '',
		},
		newWin: {
			type: 'boolean',
			default: false,
		},
		newWinS: {
			type: 'string',
			default: '',
		},
		hideDrop: {
			type: 'boolean',
			default: false,
		},
		hideDropS: {
			type: 'string',
			default: '',
		},
		incStyle: {
			type: 'boolean',
			default: true,
		},
		incStyleS: {
			type: 'string',
			default: '',
		},
	},	 
	edit: ( { attributes, setAttributes } ) => {
	
		attributes.all_types = attributes.type.concat(attributes.topic, attributes.audience);
		attributes.exAll_types = attributes.exType.concat(attributes.exTopic, attributes.exAudience);
	
		//var urlParams = Object.entries(CalScript).map(([key, val]) => `${key}=${encodeURIComponent(val)}`).join('&');

		const calScript = document.createElement( 'script' );
		calScript.src = "https://calendar.utk.edu/widget/" + attributes.widgetType + "?schools=utk&venues=" + attributes.place + "&departments=" +  attributes.department  + "&groups=" + attributes.group + "&types=" + attributes.all_types + "&days=" + attributes.daysAhead + "&num=" + attributes.numResults + "&tags=" + attributes.keywords + attributes.featuredS + attributes.sponsoredS + attributes.matchingS + attributes.pastS + attributes.hideDescS + attributes.truncateS + attributes.htmlDescS + attributes.evImageS + attributes.evTimeS + attributes.viewAllS + attributes.newWinS + attributes.hideDropS + "&match=" + attributes.mustMatch + "&exclude_types=" + attributes.exAll_types + "&container=localist-widget-12345" + attributes.incStyleS + "&template=" + attributes.template;
	
		console.log(calScript);
		
		return ( [
			<InspectorControls>

        		<PanelBody title='Style'>
					<SelectControl
      					label="Template"
      					value={ attributes.calTemplate }
      					options={ [
      						{ label: 'Cards', value: 'hill-cards' },
      						{ label: 'List', value: 'hill-simple-list' },
      						{ label: 'List Alt', value: 'hill-list-alt' },
      						{ label: 'Modern', value: 'hill-modern' },
      						{ label: 'Modern No Description', value: 'hill-modern-no-description' },
      						{ label: 'Simple Columns', value: 'hill-simple-columns' },
      					] }
      					onChange={ (value) =>{
							setAttributes( {calTemplate:value} );
								 
							if( value !== '' ){
								setAttributes( {template:value, widgetType:'view', hideDesc:false, hideDescS:'', truncate:false, truncateS:'', htmlDesc:false, htmlDescS:'', evImage:false, evImageS:'', evTime:false, evTimeS:'', viewAll:false, viewAllS:'', newWin:false, newWinS:'', hideDrop:false, hideDropS:'', incStyle:true, incStyleS:''} );
							}else{
								setAttributes( {template:'modern'} );
							}
							
						} }
      				/>
					<RangeControl
        				label="Number of Results"
						value={ attributes.numResults }
        				onChange={ ( value ) =>{ setAttributes( {numResults:value} ); } }
						min={ 1 }
						max={ 50 }
    				/>
					<RangeControl
        				label="Days Ahead"
						value={ attributes.daysAhead }
        				onChange={ ( value ) =>{ setAttributes( {daysAhead:value} ); } }
						min={ 1 }
						max={ 365 }
    				/>
				</PanelBody>
				<PanelBody title='Content'>
					<SelectControl
						label='Group'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.group }
						options={ all_groups }
						onChange={ ( value ) =>{ setAttributes( {group:value} ); } }
					/>
					<SelectControl
						label='Department'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.department }
						options={ all_departments }
						onChange={ ( value ) =>{ setAttributes( {department:value} ); } }
					/>
					<SelectControl
						label='Place'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.place }
						options={ all_places }
						onChange={ ( value ) =>{ setAttributes( {place:value} ); } }
					/>
					<SelectControl
						label='Event Type'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.type }
						options={ [
							{ label: 'Academic & Financial Dates', value: '113455' },
							{ label: 'Ceremonies & Special Events', value: '114205' },
							{ label: 'Concerts & Performances', value: '113101' },
							{ label: 'Exhibits & Films', value: '113729' },
							{ label: 'Holidays & Closings', value: '114585' },
							{ label: 'Lectures & Presentations', value: '113103' },
							{ label: 'Meetings & Conferences', value: '113104' },
							{ label: 'Sales & Fundraisers', value: '113713' },
							{ label: 'Service & Outreach', value: '114602' },
							{ label: 'Social Events', value: '116009' },
							{ label: 'Sports & Recreation', value: '113105' },
							{ label: 'Training & Workshops', value: '114206' },
						] }
						onChange={ ( value ) =>{ setAttributes( {type:value} ); } }
					/>
					<SelectControl
						label='Topic'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.topic }
						options={ [
							{ label: 'Academic Administration', value: '117945' },
							{ label: 'Admissions', value: '113721' },
							{ label: 'Agriculture', value: '114606' },
							{ label: 'Architecture & Design', value: '114607' },
							{ label: 'Athletics', value: '113110' },
							{ label: 'Business & Entrepreneurship', value: '113709' },
							{ label: 'Career & Employment', value: '114603' },
							{ label: 'Communication & Information', value: '114608' },
							{ label: 'Diversity & Inclusion', value: '114162' },
							{ label: 'Engineering', value: '114609' },
							{ label: 'Health & Wellness', value: '113111' },
							{ label: 'Humanities & Social Sciences', value: '113109' },
							{ label: 'Law & Policy', value: '114604' },
							{ label: 'Science', value: '113707' },
							{ label: 'Student Life & Traditions', value: '114163' },
							{ label: 'Student Success', value: '117507' },
							{ label: 'Sustainability', value: '146298' },
							{ label: 'Teaching & Learning', value: '114605' },
							{ label: 'Visual & Performing Arts', value: '114610' },
							{ label: 'Volunteering', value: '116008' },
						] }
						onChange={ ( value ) =>{ setAttributes( {topic:value} ); } }
					/>
					<SelectControl
						label='Audience'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.audience }
						options={ [
							{ label: 'Alumni', value: '113116' },
							{ label: 'Current Students', value: '113114' },
							{ label: 'Faculty & Staff', value: '113115' },
							{ label: 'Families', value: '113714' },
							{ label: 'General Public', value: '113117' },
							{ label: 'Prospective Students', value: '113118' },
						] }
						onChange={ ( value ) =>{ setAttributes( {audience:value} ); } }
					/>
				    <TextControl
						label='Keywords and Tags'
						help='Seperate keywords with commas.'
						value={ attributes.keywords }
						onChange={ ( value ) =>{ setAttributes( {keywords:value} ); } }
					/>
					<CheckboxControl
            			label="Only Show Featured"
            			checked={ attributes.featured }
            			onChange={ () =>{
							setAttributes( {featured:!attributes.featured} );
								 
							if( !attributes.featured === true ){
								setAttributes( {featuredS:'&picks=1'} );
							}else{
								setAttributes( {featuredS:''} );
							}
							
						} }
        			/>
					<CheckboxControl
            			label="Only Show Sponsored"
            			checked={ attributes.sponsored }
            			onChange={ () =>{
							setAttributes( {sponsored:!attributes.sponsored} );
								 
							if( !attributes.sponsored === true ){
								setAttributes( {sponsoredS:'&sponsored=1'} );
							}else{
								setAttributes( {sponsoredS:''} );
							}

						} }
        			/>
					<CheckboxControl
            			label="Include All Matching Instances"
            			checked={ attributes.matching }
            			onChange={ () =>{
							setAttributes( {matching:!attributes.matching} );
								 
							if( !attributes.matching === true ){
								setAttributes( {matchingS:'&all_instances=1'} );
							}else{
								setAttributes( {matchingS:''} );
							}

						} }
        			/>
					<CheckboxControl
            			label="Hide Past Events"
            			checked={ attributes.past }
            			onChange={ () =>{
							setAttributes( {past:!attributes.past} );
								 
							if( !attributes.past === true ){
								setAttributes( {pastS:'&hide_past=1'} );
							}else{
								setAttributes( {pastS:''} );
							}

						} }
        			/>
					<SelectControl
						label='Content Must Match'
						value={ attributes.mustMatch }
						options={ [
							{ label: 'At least one place, group, keyword or tag, and one filter item', value: '' },
							{ label: 'Any place, group, keyword, tag, or filter item', value: 'any' },
							{ label: 'At least one place and group, and all keywords, tags, and filter items', value: 'all' },
							{ label: 'Any place or group, and at least one keyword or tag, and one filter item', value: 'or' },
						] }
						onChange={ ( value ) =>{ setAttributes( {mustMatch:value} ); } }
					/>
				</PanelBody>
				<PanelBody title='Excluded Content' initialOpen={ false }>
					<SelectControl
						label='Exclude Event Type'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.exType }
						options={ [
							{ label: 'Academic & Financial Dates', value: '113455' },
							{ label: 'Ceremonies & Special Events', value: '114205' },
							{ label: 'Concerts & Performances', value: '113101' },
							{ label: 'Exhibits & Films', value: '113729' },
							{ label: 'Holidays & Closings', value: '114585' },
							{ label: 'Lectures & Presentations', value: '113103' },
							{ label: 'Meetings & Conferences', value: '113104' },
							{ label: 'Sales & Fundraisers', value: '113713' },
							{ label: 'Service & Outreach', value: '114602' },
							{ label: 'Social Events', value: '116009' },
							{ label: 'Sports & Recreation', value: '113105' },
							{ label: 'Training & Workshops', value: '114206' },
						] }
						onChange={ ( value ) =>{ setAttributes( {exType:value} ); } }
					/>
					<SelectControl
						label='Exclude Topic'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.exTopic }
						options={ [
							{ label: 'Academic Administration', value: '117945' },
							{ label: 'Admissions', value: '113721' },
							{ label: 'Agriculture', value: '114606' },
							{ label: 'Architecture & Design', value: '114607' },
							{ label: 'Athletics', value: '113110' },
							{ label: 'Business & Entrepreneurship', value: '113709' },
							{ label: 'Career & Employment', value: '114603' },
							{ label: 'Communication & Information', value: '114608' },
							{ label: 'Diversity & Inclusion', value: '114162' },
							{ label: 'Engineering', value: '114609' },
							{ label: 'Health & Wellness', value: '113111' },
							{ label: 'Humanities & Social Sciences', value: '113109' },
							{ label: 'Law & Policy', value: '114604' },
							{ label: 'Science', value: '113707' },
							{ label: 'Student Life & Traditions', value: '114163' },
							{ label: 'Student Success', value: '117507' },
							{ label: 'Sustainability', value: '146298' },
							{ label: 'Teaching & Learning', value: '114605' },
							{ label: 'Visual & Performing Arts', value: '114610' },
							{ label: 'Volunteering', value: '116008' },
						] }
						onChange={ ( value ) =>{ setAttributes( {exTopic:value} ); } }
					/>
					<SelectControl
						label='Exclude Audience'
						multiple
						help="Hold CTRL (CMD on Mac) to make multiple selections."
						style={{height: '150px'}}
						value={ attributes.exAudience }
						options={ [
							{ label: 'Alumni', value: '113116' },
							{ label: 'Current Students', value: '113114' },
							{ label: 'Faculty & Staff', value: '113115' },
							{ label: 'Families', value: '113714' },
							{ label: 'General Public', value: '113117' },
							{ label: 'Prospective Students', value: '113118' },
						] }
						onChange={ ( value ) =>{ setAttributes( {exAudience:value} ); } }
					/>
				</PanelBody>
				<PanelBody title='Display Options' initialOpen={ false }>
					{ attributes.calTemplate === '' && (
					<SelectControl
						label='Widget Type'
						value={ attributes.widgetType }
						options={ [
							{ label: 'List', value: 'view' },
							{ label: 'Mini Calendar + List', value: 'combo' },
						] }
						onChange={ ( value ) =>{ setAttributes( {widgetType:value} ); } }
					/>
					) }
					{ attributes.calTemplate === '' && (
					<SelectControl
						label='Style'
						value={ attributes.style }
						options={ [
							{ label: 'Modern', value: 'modern' },
							{ label: 'Card', value: 'card' },
							{ label: 'Classic', value: '' },
							{ label: 'None', value: 'none' },
						] }
						onChange={ ( value ) =>{ setAttributes( {style:value} ); } }
					/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Hide Descriptions"
            			checked={ attributes.hideDesc }
            			onChange={ () =>{
							setAttributes( {hideDesc:!attributes.hideDesc} );
								 
							if( !attributes.hideDesc === true ){
								setAttributes( {hideDescS:'&hidedesc=1'} );
							}else{
								setAttributes( {hideDescS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Truncate Descriptions"
            			checked={ attributes.truncate }
            			onChange={ () =>{
							setAttributes( {truncate:!attributes.truncate} );
								 
							if( !attributes.truncate === true ){
								setAttributes( {truncateS:'&expand_descriptions=1'} );
							}else{
								setAttributes( {truncateS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Render HTML in Descriptions"
            			checked={ attributes.htmlDesc }
            			onChange={ () =>{
							setAttributes( {htmlDesc:!attributes.htmlDesc} );
								 
							if( !attributes.htmlDesc === true ){
								setAttributes( {htmlDescS:'&html_descriptions=1'} );
							}else{
								setAttributes( {htmlDescS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Hide Event Images"
            			checked={ attributes.evImage }
            			onChange={ () =>{
							setAttributes( {evImage:!attributes.evImage} );
								 
							if( !attributes.evImage === true ){
								setAttributes( {evImageS:'&hideimage=1'} );
							}else{
								setAttributes( {evImageS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Hide Event Times"
            			checked={ attributes.evTime }
            			onChange={ () =>{
							setAttributes( {evTime:!attributes.evTime} );
								 
							if( !attributes.evTime === true ){
								setAttributes( {evTimeS:'&show_times=0'} );
							}else{
								setAttributes( {evTimeS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Hide 'View All Events' Link"
            			checked={ attributes.viewAll }
            			onChange={ () =>{
							setAttributes( {viewAll:!attributes.viewAll} );
								 
							if( !attributes.viewAll === true ){
								setAttributes( {viewAllS:'&show_view_all_cta=0'} );
							}else{
								setAttributes( {viewAllS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && attributes.widgetType === 'combo' && (
					<CheckboxControl
            			label="Hide Filter Dropdown"
            			checked={ attributes.hideDrop }
            			onChange={ () =>{
							setAttributes( {hideDrop:!attributes.hideDrop} );
								 
							if( !attributes.hideDrop === true ){
								setAttributes( {hideDropS:'&show_types=0'} );
							}else{
								setAttributes( {hideDropS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate === '' && (
					<CheckboxControl
            			label="Open Links in New Window"
            			checked={ attributes.newWin }
            			onChange={ () =>{
							setAttributes( {newWin:!attributes.newWin} );
								 
							if( !attributes.newWin === true ){
								setAttributes( {newWinS:'&target_blank=1'} );
							}else{
								setAttributes( {newWinS:''} );
							}
							
						} }
        			/>
					) }
					{ attributes.calTemplate !== '' && (
					<CheckboxControl
            			label="Include Styles"
            			checked={ attributes.incStyle }
            			onChange={ () =>{
							setAttributes( {incStyle:!attributes.incStyle} );
								 
							if( !attributes.incStyle === true ){
								setAttributes( {incStyleS:''} );
							}else{
								setAttributes( {incStyleS:'&style=none'} );
							}
							
						} }
        			/>
					) }
				</PanelBody>
			</InspectorControls>,
			<SandBox
				html={ "<div id='localist-widget-12345' class='localist-widget'></div><script defer type='text/javascript' src='https://calendar.utk.edu/widget/" + attributes.widgetType + "?schools=utk&venues=" + attributes.place + "&departments=" +  attributes.department  + "&groups=" + attributes.group + "&types=" + attributes.all_types + "&days=" + attributes.daysAhead + "&num=" + attributes.numResults + "&tags=" + attributes.keywords + attributes.featuredS + attributes.sponsoredS + attributes.matchingS + attributes.pastS + attributes.hideDescS + attributes.truncateS + attributes.htmlDescS + attributes.evImageS + attributes.evTimeS + attributes.viewAllS + attributes.newWinS + attributes.hideDropS + "&match=" + attributes.mustMatch + "&exclude_types=" + attributes.exAll_types + "&container=localist-widget-12345" + attributes.incStyleS + "&template=" + attributes.template + "'></script>" }
				type="embed"
			/>,
		] );		
	},
	
	save: ( { attributes } ) => {

		return (
			<div>
			<div id="localist-widget-12345" className="localist-widget"></div>
			<script defer type="text/javascript"
src={"https://calendar.utk.edu/widget/" + attributes.widgetType + "?schools=utk&venues=" + attributes.place + "&departments=" +  attributes.department  + "&groups=" + attributes.group + "&types=" + attributes.all_types + "&days=" + attributes.daysAhead + "&num=" + attributes.numResults + "&tags=" + attributes.keywords + attributes.featuredS + attributes.sponsoredS + attributes.matchingS + attributes.pastS + attributes.hideDescS + attributes.truncateS + attributes.htmlDescS + attributes.evImageS + attributes.evTimeS + attributes.viewAllS + attributes.newWinS + attributes.hideDropS + "&match=" + attributes.mustMatch + "&exclude_types=" + attributes.exAll_types + "&container=localist-widget-12345" + attributes.incStyleS + "&template=" + attributes.template}></script>
			</div>
		);
	},
			
} );
