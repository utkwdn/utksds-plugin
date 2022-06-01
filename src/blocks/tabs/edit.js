import { PanelBody, TextControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';
import { select } from '@wordpress/data';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps, InnerBlocks, InspectorControls, RichText } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

const TAB_TEMPLATE = [
    [ 'utkwds/tab' ],
];

function setTabNames( parentID ){
	
	var thisBlock = select( 'core/editor' ).getBlock( parentID );
	var tabs_title = [];
	
	thisBlock.innerBlocks.map( ( childrenBlock, index ) =>{
		if(index === 0){
			childrenBlock.attributes.tabActive = 'active';
			childrenBlock.attributes.tabShow = 'show';
		}
			
		tabs_title.push( { tabName: childrenBlock.attributes.tabName, tabSlug: childrenBlock.attributes.tabSlug, tabActive: childrenBlock.attributes.tabActive } );
	} );
	
	thisBlock.attributes.tabNames = tabs_title;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( props ) {
	const {
		attributes,
    	setAttributes,
		clientId
	  } = props;

	  const blockProps = useBlockProps();

	  var listItems = [];
	  if(Array.isArray(attributes.tabNames) && attributes.tabNames.length){
		  for(var thisTab of attributes.tabNames){
			  listItems.push(<li class="nav-item" role="presentation">
				  <a className={ "nav-link " + thisTab.tabActive } id={ thisTab.tabSlug + "-tab" } data-toggle="tab" href={ "#" + thisTab.tabSlug } role="tab" aria-controls={ thisTab.tabSlug } aria-selected="true">{ thisTab.tabName }</a>
				</li>);
		  }
	  }

		return ( [
			<InspectorControls>
				<PanelBody title='Tabs Properties' initialOpen={ true }>
					<TextControl
						label='Tabs ID'
						help='The identifier for the tabs group.'
						value={ attributes.tabID }
						onChange={ ( value ) =>{ setAttributes( {tabID:value} ); } }
					/>
				</PanelBody>
			</InspectorControls>,
			<div { ...blockProps }>
			<div class="tab-content" id="myTabContent">
				<InnerBlocks template={ TAB_TEMPLATE } allowedBlocks={ [ 'utkwds/tab', ] } renderAppender={ () => ( <InnerBlocks.ButtonBlockAppender /> ) } />
			</div>
			</div>,
		] );
}
