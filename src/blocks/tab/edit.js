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

	  var parentID = '';
		const parentBlocks = wp.data.select( 'core/block-editor' ).getBlockParents(clientId);
	
		for(var thisParent of parentBlocks){
			var thisBlock = select( 'core/editor' ).getBlock( thisParent );
			if( thisBlock.name === 'utkwds/tabs'){
				parentID = thisBlock.clientId;
			}
		}

		return ( [
			<div { ...blockProps }>
			<div className={ "tab-pane fade " + attributes.tabShow + " " + attributes.tabActive } id={ attributes.tabSlug } role="tabpanel" aria-labelledby={ attributes.tabSlug + "-tab" }>
				<div className="tab-header">
					<RichText
						tagName='h3'
						className={ "tab-name" }
						value={ attributes.tabName }
						placeholder={ attributes.tabPlaceholder }
						onChange={ ( value ) =>{ 
							setAttributes( {tabName:value, tabSlug: 'tab-' + cleanForSlug(value)} );
							
							setTabNames(parentID);
						} }
						allowedFormats ={ [] }
						withoutInteractiveFormatting
					/>
				</div>
				<InnerBlocks allowedBlocks={ [ 'utkwds/button', 'core/paragraph', 'core/list', 'core/quote', 'lead/main', 'horizontal-rule/main' ] } templateLock={ false } renderAppender={ () => ( <InnerBlocks.DefaultBlockAppender /> ) } />
			</div>
			</div>
		] );
}
